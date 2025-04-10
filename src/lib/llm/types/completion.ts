import { Message } from './message';

/**
 * Options for text completions
 */
export interface CompletionOptions {
  /** The model to use for completion */
  model: string;
  
  /** The prompt to complete */
  prompt: string;
  
  /** Maximum number of tokens to generate */
  maxTokens?: number;
  
  /** Sampling temperature (0-1), higher is more random */
  temperature?: number;
  
  /** Alternative to temperature for nucleus sampling (0-1) */
  topP?: number;
  
  /** Number of completions to generate */
  n?: number;
  
  /** Whether to stream the response */
  stream?: boolean;
  
  /** Optional stop sequences to end completion */
  stop?: string[];
  
  /** Optional presence penalty (0-1) */
  presencePenalty?: number;
  
  /** Optional frequency penalty (0-1) */
  frequencyPenalty?: number;
}

/**
 * Options for chat completions
 */
export interface ChatCompletionOptions {
  /** The model to use for completion */
  model: string;
  
  /** The messages to use for completion */
  messages: Message[];
  
  /** Maximum number of tokens to generate */
  maxTokens?: number;
  
  /** Sampling temperature (0-1), higher is more random */
  temperature?: number;
  
  /** Alternative to temperature for nucleus sampling (0-1) */
  topP?: number;
  
  /** Number of completions to generate */
  n?: number;
  
  /** Whether to stream the response */
  stream?: boolean;
  
  /** Optional stop sequences to end completion */
  stop?: string[];
  
  /** Optional presence penalty (0-1) */
  presencePenalty?: number;
  
  /** Optional frequency penalty (0-1) */
  frequencyPenalty?: number;
  
  /** Safety settings for content moderation */
  safetySettings?: SafetySetting[];
}

/**
 * Structure of a completion response
 */
export interface CompletionResponse {
  /** The generated text */
  text: string;
  
  /** Optional completion ID */
  id?: string;
  
  /** The prompt tokens used */
  promptTokens?: number;
  
  /** The completion tokens used */
  completionTokens?: number;
  
  /** The total tokens used (prompt + completion) */
  totalTokens?: number;
  
  /** Finish reason (e.g., 'stop', 'length') */
  finishReason?: string;
}

/**
 * Structure of a chat completion response
 */
export interface ChatCompletionResponse {
  /** The response message */
  message: Message;
  
  /** Optional completion ID */
  id?: string;
  
  /** The prompt tokens used */
  promptTokens?: number;
  
  /** The completion tokens used */
  completionTokens?: number;
  
  /** The total tokens used (prompt + completion) */
  totalTokens?: number;
  
  /** Finish reason (e.g., 'stop', 'length') */
  finishReason?: string;
}

/**
 * Threshold levels for safety filtering
 */
export type HarmThreshold = 'BLOCK_NONE' | 'BLOCK_LOW_AND_ABOVE' | 'BLOCK_MEDIUM_AND_ABOVE' | 'BLOCK_ONLY_HIGH';

/**
 * Categories of harmful content to filter
 */
export type HarmCategory = 
  | 'HARM_CATEGORY_HARASSMENT' 
  | 'HARM_CATEGORY_HATE_SPEECH' 
  | 'HARM_CATEGORY_SEXUALLY_EXPLICIT' 
  | 'HARM_CATEGORY_DANGEROUS_CONTENT';

/**
 * Safety setting for content filtering
 */
export interface SafetySetting {
  /** The category of harm to consider */
  category: HarmCategory;
  
  /** The threshold level for filtering */
  threshold: HarmThreshold;
}

/**
 * Function signature for streaming completion callbacks
 */
export type StreamingCompletionCallback = (chunk: string, done: boolean) => void;

/**
 * Function signature for streaming chat completion callbacks
 */
export type StreamingChatCompletionCallback = (message: Partial<Message>, done: boolean) => void;
