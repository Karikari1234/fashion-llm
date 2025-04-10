import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import {
  CompletionOptions,
  CompletionResponse,
  ChatCompletionOptions,
  ChatCompletionResponse,
  Message,
  StreamingCompletionCallback,
  StreamingChatCompletionCallback,
  LLMError,
  LLMErrorType,
  HarmCategory as CustomHarmCategory,
  HarmThreshold as CustomHarmThreshold,
  SafetySetting as CustomSafetySetting,
  LLMProviderConfig
} from '../types';
import { BaseLLMProvider } from './base-provider';
import { registerProvider } from '../factory';

/**
 * Implementation of LLMProvider for Google's Gemini API
 */
export class GeminiProvider extends BaseLLMProvider {
  private genAI: GoogleGenerativeAI;
  
  /**
   * Creates a new Gemini provider instance
   * @param config Provider configuration with API key and settings
   */
  constructor(config: LLMProviderConfig) {
    super(config);
    this.genAI = new GoogleGenerativeAI(this.config.apiKey);
  }
  
  /**
   * Provider name identifier
   */
  get providerName(): string {
    return 'gemini';
  }
  
  /**
   * Generate a text completion
   * @param options The completion options
   * @returns A promise resolving to the completion response
   * @throws LLMError if the request fails
   */
  async generateCompletion(options: CompletionOptions): Promise<CompletionResponse> {
    return this.withRetry(async () => {
      try {
        const model = this.genAI.getGenerativeModel({
          model: options.model || this.config.defaultModel,
          generationConfig: {
            maxOutputTokens: options.maxTokens,
            temperature: options.temperature,
            topP: options.topP,
            stopSequences: options.stop
          },
          safetySettings: this.getSafetySettings()
        });
        
        const result = await model.generateContent(options.prompt);
        const responseText = result.response.text();
        
        return {
          text: responseText,
          id: `gemini-${Date.now()}`,
          finishReason: this.getFinishReason(result),
          promptTokens: this.estimateTokenCount(options.prompt),
          completionTokens: this.estimateTokenCount(responseText),
          totalTokens: this.estimateTokenCount(options.prompt) + this.estimateTokenCount(responseText)
        };
      } catch (error) {
        throw this.handleGeminiError(error);
      }
    });
  }
  
  /**
   * Generate a chat completion
   * @param options The chat completion options
   * @returns A promise resolving to the chat completion response
   * @throws LLMError if the request fails
   */
  async generateChatCompletion(options: ChatCompletionOptions): Promise<ChatCompletionResponse> {
    return this.withRetry(async () => {
      try {
        const model = this.genAI.getGenerativeModel({
          model: options.model || this.config.defaultModel,
          generationConfig: {
            maxOutputTokens: options.maxTokens,
            temperature: options.temperature,
            topP: options.topP,
            stopSequences: options.stop
          },
          safetySettings: this.getSafetySettings(options.safetySettings)
        });
        
        const chat = model.startChat({
          history: this.convertMessagesToGeminiFormat(options.messages.slice(0, -1)),
        });
        
        const lastMessage = options.messages[options.messages.length - 1];
        const result = await chat.sendMessage(lastMessage.content);
        const responseText = result.response.text();
        
        return {
          message: {
            role: 'assistant',
            content: responseText,
            timestamp: new Date()
          },
          id: `gemini-${Date.now()}`,
          finishReason: 'stop', // Gemini doesn't provide finish reason for chat completions
          promptTokens: this.estimateTokensForMessages(options.messages),
          completionTokens: this.estimateTokenCount(responseText),
          totalTokens: this.estimateTokensForMessages(options.messages) + this.estimateTokenCount(responseText)
        };
      } catch (error) {
        throw this.handleGeminiError(error);
      }
    });
  }
  
  /**
   * Generate a streaming text completion
   * @param options The completion options
   * @param callback Function to call with each chunk of the response
   * @returns A promise that resolves when streaming is complete
   * @throws LLMError if the request fails
   */
  async streamCompletion(
    options: CompletionOptions, 
    callback: StreamingCompletionCallback
  ): Promise<void> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: options.model || this.config.defaultModel,
        generationConfig: {
          maxOutputTokens: options.maxTokens,
          temperature: options.temperature,
          topP: options.topP,
          stopSequences: options.stop
        },
        safetySettings: this.getSafetySettings()
      });
      
      const result = await model.generateContentStream(options.prompt);
      
      // We don't use this variable, but we'll keep track of it here in case needed later
      let _aggregatedResponse = '';
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _aggregatedResponse += chunkText;
        callback(chunkText, false);
      }
      
      // Signal completion
      callback('', true);
    } catch (error) {
      throw this.handleGeminiError(error);
    }
  }
  
  /**
   * Generate a streaming chat completion
   * @param options The chat completion options
   * @param callback Function to call with each chunk of the response
   * @returns A promise that resolves when streaming is complete
   * @throws LLMError if the request fails
   */
  async streamChatCompletion(
    options: ChatCompletionOptions,
    callback: StreamingChatCompletionCallback
  ): Promise<void> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: options.model || this.config.defaultModel,
        generationConfig: {
          maxOutputTokens: options.maxTokens,
          temperature: options.temperature,
          topP: options.topP,
          stopSequences: options.stop
        },
        safetySettings: this.getSafetySettings(options.safetySettings)
      });
      
      const chat = model.startChat({
        history: this.convertMessagesToGeminiFormat(options.messages.slice(0, -1)),
      });
      
      const lastMessage = options.messages[options.messages.length - 1];
      const result = await chat.sendMessageStream(lastMessage.content);
      
      let fullContent = '';
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullContent += chunkText;
        
        callback({
          role: 'assistant',
          content: fullContent
        }, false);
      }
      
      // Signal completion
      callback({
        role: 'assistant',
        content: fullContent
      }, true);
    } catch (error) {
      throw this.handleGeminiError(error);
    }
  }
  
  /**
   * Count the number of tokens in a given text
   * @param text The text to count tokens for
   * @returns The estimated token count
   */
  async countTokens(text: string): Promise<number> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: this.config.defaultModel
      });
      
      const result = await model.countTokens(text);
      return result.totalTokens;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      // Fall back to estimation if token counting fails
      return this.estimateTokenCount(text);
    }
  }
  
  /**
   * Get available models from this provider
   * @returns A list of available model identifiers
   */
  async getAvailableModels(): Promise<string[]> {
    // Currently Gemini API doesn't provide a method to list available models
    // Return the known Gemini models
    return [
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-1.5-flash-latest',
      'gemini-pro',
    ];
  }
  
  /**
   * Convert messages to Gemini format
   * @param messages Array of messages to convert
   * @returns Converted messages in Gemini format
   */
  private convertMessagesToGeminiFormat(messages: Message[]): Array<{role: string, parts: Array<{text: string}>}> {
    return messages.map(message => ({
      role: this.mapRoleToGemini(message.role),
      parts: [{ text: message.content }]
    }));
  }
  
  /**
   * Map standard role to Gemini role
   * @param role Standard message role
   * @returns Gemini-compatible role
   */
  private mapRoleToGemini(role: string): string {
    // Gemini uses slightly different role names
    switch (role) {
      case 'user':
        return 'user';
      case 'assistant':
        return 'model';
      case 'system':
        return 'user'; // Gemini doesn't have a system role, we'll prepend it to user message
      default:
        return role;
    }
  }
  
  /**
   * Get default safety settings
   * @param customSettings Optional custom safety settings
   * @returns Safety settings array for Gemini API
   */
  private getSafetySettings(customSettings?: CustomSafetySetting[]): Array<{
    category: HarmCategory;
    threshold: HarmBlockThreshold;
  }> {
    if (customSettings && customSettings.length > 0) {
      return customSettings.map(setting => ({
        category: this.mapHarmCategory(setting.category),
        threshold: this.mapHarmThreshold(setting.threshold)
      }));
    }
    
    // Default safety settings
    return [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  }
  
  /**
   * Map harm category to Gemini format
   * @param category Harm category
   * @returns Gemini-compatible category
   */
  private mapHarmCategory(category: CustomHarmCategory): HarmCategory {
    const categoryMap: Record<CustomHarmCategory, HarmCategory> = {
      HARM_CATEGORY_HARASSMENT: HarmCategory.HARM_CATEGORY_HARASSMENT,
      HARM_CATEGORY_HATE_SPEECH: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      HARM_CATEGORY_DANGEROUS_CONTENT: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    };
    
    return categoryMap[category] || HarmCategory.HARM_CATEGORY_HARASSMENT;
  }
  
  /**
   * Map harm threshold to Gemini format
   * @param threshold Harm threshold
   * @returns Gemini-compatible threshold
   */
  private mapHarmThreshold(threshold: CustomHarmThreshold): HarmBlockThreshold {
    const thresholdMap: Record<CustomHarmThreshold, HarmBlockThreshold> = {
      BLOCK_NONE: HarmBlockThreshold.BLOCK_NONE,
      BLOCK_LOW_AND_ABOVE: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      BLOCK_MEDIUM_AND_ABOVE: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      BLOCK_ONLY_HIGH: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    };
    
    return thresholdMap[threshold] || HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE;
  }
  
  /**
   * Get finish reason from Gemini response
   * @param result Gemini API response
   * @returns Standardized finish reason
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getFinishReason(result: any): string {
    if (result.response.promptFeedback) {
      if (result.response.promptFeedback.blockReason) {
        return 'safety';
      }
    }
    
    return 'stop';
  }
  
  /**
   * Estimate token count for a text
   * @param text Text to estimate tokens for
   * @returns Estimated token count
   */
  private estimateTokenCount(text: string): number {
    // Simple approximation: ~4 characters per token
    return Math.ceil(text.length / 4);
  }
  
  /**
   * Estimate token count for an array of messages
   * @param messages Messages to estimate tokens for
   * @returns Estimated token count
   */
  private estimateTokensForMessages(messages: Message[]): number {
    return messages.reduce((acc, message) => {
      return acc + this.estimateTokenCount(message.content);
    }, 0);
  }
  
  /**
   * Handle Gemini API errors
   * @param error Error from Gemini API
   * @returns Standardized LLMError
   */
  private handleGeminiError(error: unknown): LLMError {
    console.error('Gemini API error:', error);
    
    // Type guard for errors with message property
    const isErrorWithMessage = (err: unknown): err is { message: string; status?: number } => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return typeof err === 'object' && err !== null && 'message' in err && typeof (err as any).message === 'string';
    };
    
    const errorMsg = isErrorWithMessage(error) ? error.message : 'Unknown error';
    const errorStatus = isErrorWithMessage(error) && error.status ? error.status : undefined;
    
    // Rate limit errors
    if (errorStatus === 429 || 
        errorMsg.includes('rate limit') || 
        errorMsg.includes('quota exceeded')) {
      return new LLMError(
        'Rate limit exceeded, please try again later',
        LLMErrorType.RATE_LIMIT,
        429,
        true // retryable
      );
    }
    
    // Authentication errors
    if (errorStatus === 401 || 
        errorMsg.includes('API key') || 
        errorMsg.includes('authentication')) {
      return new LLMError(
        'Authentication failed, check your API key',
        LLMErrorType.AUTHENTICATION,
        401,
        false // not retryable
      );
    }
    
    // Context length errors
    if (errorMsg.includes('too many tokens') || 
        errorMsg.includes('maximum context length')) {
      return new LLMError(
        'Input is too long, please reduce the length of your messages',
        LLMErrorType.CONTEXT_LENGTH,
        400,
        false // not retryable
      );
    }
    
    // Safety errors
    if (errorMsg.includes('safety') || 
        errorStatus === 400 && errorMsg.includes('blocked')) {
      return new LLMError(
        'Response was blocked due to safety concerns',
        LLMErrorType.SAFETY,
        400,
        false // not retryable
      );
    }
    
    // Network/connectivity errors
    if (errorMsg.includes('network') || 
        errorMsg.includes('ECONNREFUSED') || 
        errorMsg.includes('ETIMEDOUT')) {
      return new LLMError(
        'Network error, please check your internet connection',
        LLMErrorType.CONNECTIVITY,
        503,
        true // retryable
      );
    }
    
    // Timeout errors
    if (errorMsg.includes('timeout')) {
      return new LLMError(
        'Request timed out, please try again',
        LLMErrorType.TIMEOUT,
        408,
        true // retryable
      );
    }
    
    // Default error
    return new LLMError(
      `Gemini API error: ${errorMsg || 'Unknown error'}`,
      LLMErrorType.API_ERROR,
      errorStatus || 500,
      (errorStatus !== undefined && errorStatus >= 500) || errorStatus === undefined // server errors are retryable
    );
  }
}

// Register the provider with the factory
registerProvider('gemini', config => new GeminiProvider(config));
