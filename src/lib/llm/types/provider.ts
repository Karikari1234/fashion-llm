import { 
  CompletionOptions, 
  CompletionResponse, 
  ChatCompletionOptions, 
  ChatCompletionResponse,
  StreamingCompletionCallback,
  StreamingChatCompletionCallback
} from './completion';

/**
 * Standard error types for LLM service interactions
 */
export enum LLMErrorType {
  AUTHENTICATION = 'authentication_error',
  RATE_LIMIT = 'rate_limit_error',
  CONTEXT_LENGTH = 'context_length_error',
  INVALID_REQUEST = 'invalid_request_error',
  API_ERROR = 'api_error',
  TIMEOUT = 'timeout_error',
  CONNECTIVITY = 'connectivity_error',
  SAFETY = 'safety_error',
  UNKNOWN = 'unknown_error'
}

/**
 * Standard error structure for LLM service interactions
 */
export class LLMError extends Error {
  type: LLMErrorType;
  statusCode?: number;
  retryable: boolean;
  
  constructor(
    message: string, 
    type: LLMErrorType = LLMErrorType.UNKNOWN, 
    statusCode?: number,
    retryable: boolean = false
  ) {
    super(message);
    this.name = 'LLMError';
    this.type = type;
    this.statusCode = statusCode;
    this.retryable = retryable;
  }
}

/**
 * Interface defining all capabilities required for an LLM provider
 */
export interface LLMProvider {
  /**
   * Provider name identifier
   */
  readonly providerName: string;
  
  /**
   * Check if the provider is properly configured
   */
  isConfigured(): boolean;
  
  /**
   * Generate a text completion
   * @param options The completion options
   * @returns A promise resolving to the completion response
   * @throws LLMError if the request fails
   */
  generateCompletion(options: CompletionOptions): Promise<CompletionResponse>;
  
  /**
   * Generate a chat completion
   * @param options The chat completion options
   * @returns A promise resolving to the chat completion response
   * @throws LLMError if the request fails
   */
  generateChatCompletion(options: ChatCompletionOptions): Promise<ChatCompletionResponse>;
  
  /**
   * Generate a streaming text completion
   * @param options The completion options
   * @param callback Function to call with each chunk of the response
   * @returns A promise that resolves when streaming is complete
   * @throws LLMError if the request fails
   */
  streamCompletion(
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
  streamChatCompletion(
    options: ChatCompletionOptions,
    callback: StreamingChatCompletionCallback
  ): Promise<void>;
  
  /**
   * Count the number of tokens in a given text
   * @param text The text to count tokens for
   * @returns The estimated token count
   */
  countTokens(text: string): Promise<number>;
  
  /**
   * Get available models from this provider
   * @returns A list of available model identifiers
   */
  getAvailableModels(): Promise<string[]>;
}

/**
 * Base configuration options for all LLM providers
 */
export interface LLMProviderConfig {
  /** API key or credentials for the provider */
  apiKey: string;
  
  /** Base URL for API requests (optional) */
  apiUrl?: string;
  
  /** Default model to use */
  defaultModel: string;
  
  /** Request timeout in milliseconds */
  timeoutMs?: number;
  
  /** Maximum retries for failed requests */
  maxRetries?: number;
}
