/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  LLMProvider,
  LLMProviderConfig,
  LLMError,
  LLMErrorType,
  CompletionOptions,
  CompletionResponse,
  ChatCompletionOptions,
  ChatCompletionResponse,
  StreamingCompletionCallback,
  StreamingChatCompletionCallback
} from '../types';

/**
 * Base class implementing common functionality for LLM providers
 */
export abstract class BaseLLMProvider implements LLMProvider {
  protected config: LLMProviderConfig;
  
  constructor(config: LLMProviderConfig) {
    this.config = this.validateConfig(config);
  }
  
  /**
   * The name of the provider
   */
  abstract get providerName(): string;
  
  /**
   * Validate provider configuration
   * @param config The configuration to validate
   * @returns The validated configuration
   * @throws LLMError if configuration is invalid
   */
  protected validateConfig(config: LLMProviderConfig): LLMProviderConfig {
    if (!config.apiKey) {
      throw new LLMError(
        'API key is required',
        LLMErrorType.AUTHENTICATION
      );
    }
    
    if (!config.defaultModel) {
      throw new LLMError(
        'Default model is required',
        LLMErrorType.INVALID_REQUEST
      );
    }
    
    return {
      ...config,
      timeoutMs: config.timeoutMs || 30000,
      maxRetries: config.maxRetries || 3
    };
  }
  
  /**
   * Check if the provider is properly configured
   */
  isConfigured(): boolean {
    try {
      this.validateConfig(this.config);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Generate a text completion
   * @param options The completion options
   * @returns A promise resolving to the completion response
   * @throws LLMError if the request fails
   */
  abstract generateCompletion(options: CompletionOptions): Promise<CompletionResponse>;
  
  /**
   * Generate a chat completion
   * @param options The chat completion options
   * @returns A promise resolving to the chat completion response
   * @throws LLMError if the request fails
   */
  abstract generateChatCompletion(options: ChatCompletionOptions): Promise<ChatCompletionResponse>;
  
  /**
   * Generate a streaming text completion
   * @param options The completion options
   * @param callback Function to call with each chunk of the response
   * @returns A promise that resolves when streaming is complete
   * @throws LLMError if the request fails
   */
  abstract streamCompletion(
    options: CompletionOptions, 
    callback: StreamingCompletionCallback
  ): Promise<void>;
  
  /**
   * Generate a streaming chat completion
   * @param options The chat completion options
   * @param callback Function to call with each chunk of the response
   * @returns A promise that resolves when streaming is complete
   * @throws LLMError if the request fails
   */
  abstract streamChatCompletion(
    options: ChatCompletionOptions,
    callback: StreamingChatCompletionCallback
  ): Promise<void>;
  
  /**
   * Count the number of tokens in a given text
   * @param text The text to count tokens for
   * @returns The estimated token count
   */
  abstract countTokens(text: string): Promise<number>;
  
  /**
   * Get available models from this provider
   * @returns A list of available model identifiers
   */
  abstract getAvailableModels(): Promise<string[]>;
  
  /**
   * Helper to implement exponential backoff for retries
   * @param fn The async function to retry
   * @param maxRetries Maximum number of retry attempts
   * @param initialDelay Initial delay in milliseconds
   * @returns Result of the function if successful
   * @throws The last error encountered if all retries fail
   */
  protected async withRetry<T>(
    fn: () => Promise<T>,
    maxRetries: number = this.config.maxRetries || 3,
    initialDelay: number = 1000
  ): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // Check if this error is retryable
        if (error instanceof LLMError && !error.retryable) {
          throw error;
        }
        
        // If this was the last attempt, throw the error
        if (attempt === maxRetries) {
          throw lastError;
        }
        
        // Calculate delay with exponential backoff and jitter
        const delay = initialDelay * Math.pow(1.5, attempt) * (0.9 + Math.random() * 0.2);
        
        // Wait for the backoff period
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // This should never be reached due to the throw in the loop
    throw lastError || new Error('Unexpected error in retry logic');
  }
}
