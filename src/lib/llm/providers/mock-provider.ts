import {
  CompletionOptions,
  CompletionResponse,
  ChatCompletionOptions,
  ChatCompletionResponse,
  Message,
  StreamingCompletionCallback,
  StreamingChatCompletionCallback
} from '../types';
import { BaseLLMProvider } from './base-provider';
import { registerProvider } from '../factory';

/**
 * A mock provider for testing purposes
 */
export class MockLLMProvider extends BaseLLMProvider {
  get providerName(): string {
    return 'mock';
  }
  
  async generateCompletion(options: CompletionOptions): Promise<CompletionResponse> {
    // Simulate network delay
    await this.simulateDelay();
    
    return {
      text: `This is a mock completion response to: "${options.prompt.substring(0, 30)}..."`,
      id: 'mock-completion-' + Date.now().toString(),
      promptTokens: options.prompt.length / 4, // Rough estimate
      completionTokens: 15,
      totalTokens: options.prompt.length / 4 + 15,
      finishReason: 'stop'
    };
  }
  
  async generateChatCompletion(options: ChatCompletionOptions): Promise<ChatCompletionResponse> {
    // Simulate network delay
    await this.simulateDelay();
    
    // Extract the last user message or use a default
    const lastUserMessage = options.messages
      .filter(m => m.role === 'user')
      .pop()?.content || 'No user message';
    
    const responseMessage: Message = {
      role: 'assistant',
      content: `This is a mock chat response to: "${lastUserMessage.substring(0, 30)}..."`,
      timestamp: new Date()
    };
    
    return {
      message: responseMessage,
      id: 'mock-chat-' + Date.now().toString(),
      promptTokens: options.messages.reduce((acc, m) => acc + m.content.length / 4, 0), // Rough estimate
      completionTokens: 20,
      totalTokens: options.messages.reduce((acc, m) => acc + m.content.length / 4, 0) + 20,
      finishReason: 'stop'
    };
  }
  
  async streamCompletion(
    options: CompletionOptions, 
    callback: StreamingCompletionCallback
  ): Promise<void> {
    // Generate a mock response
    const response = `This is a mock streaming completion response to: "${options.prompt.substring(0, 30)}..."`;
    
    // Stream the response word by word
    const words = response.split(' ');
    
    for (let i = 0; i < words.length; i++) {
      // Simulate network delay between chunks
      await this.simulateDelay(100);
      
      const isLast = i === words.length - 1;
      callback(words[i] + (isLast ? '' : ' '), isLast);
    }
  }
  
  async streamChatCompletion(
    options: ChatCompletionOptions,
    callback: StreamingChatCompletionCallback
  ): Promise<void> {
    // Extract the last user message or use a default
    const lastUserMessage = options.messages
      .filter(m => m.role === 'user')
      .pop()?.content || 'No user message';
    
    // Generate a mock response
    const response = `This is a mock streaming chat response to: "${lastUserMessage.substring(0, 30)}..."`;
    
    // Stream the response word by word
    const words = response.split(' ');
    let currentContent = '';
    
    for (let i = 0; i < words.length; i++) {
      // Simulate network delay between chunks
      await this.simulateDelay(100);
      
      currentContent += words[i] + (i === words.length - 1 ? '' : ' ');
      const isLast = i === words.length - 1;
      
      callback({
        role: 'assistant',
        content: currentContent
      }, isLast);
    }
  }
  
  async countTokens(text: string): Promise<number> {
    // Simple approximation: ~4 characters per token
    return Math.ceil(text.length / 4);
  }
  
  async getAvailableModels(): Promise<string[]> {
    return ['mock-model', 'mock-model-large'];
  }
  
  /**
   * Helper to simulate network delay
   * @param ms Milliseconds to delay (random between 200-800ms if not specified)
   */
  private async simulateDelay(ms?: number): Promise<void> {
    const delay = ms || 200 + Math.random() * 600;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

// Register the mock provider with the factory
registerProvider('mock', config => new MockLLMProvider(config));
