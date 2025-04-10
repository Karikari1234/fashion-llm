/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Standard message types for LLM interactions
 * These types are provider-agnostic and serve as the common language for all LLM providers
 */

/**
 * Role of a message in a conversation
 */
export type MessageRole = 'user' | 'assistant' | 'system';

/**
 * Core structure of a message in a conversation
 */
export interface Message {
  /** The role of the message sender */
  role: MessageRole;
  
  /** The content of the message */
  content: string;
  
  /** Optional name to identify the sender (useful for multi-agent scenarios) */
  name?: string;
  
  /** Optional message ID for tracking and referencing */
  id?: string;
  
  /** Optional timestamp for when the message was created */
  timestamp?: Date;
}

/**
 * Type guard to check if an object is a valid Message
 */
export function isMessage(obj: any): obj is Message {
  return (
    obj &&
    typeof obj === 'object' &&
    'role' in obj &&
    'content' in obj &&
    typeof obj.role === 'string' &&
    typeof obj.content === 'string' &&
    ['user', 'assistant', 'system'].includes(obj.role)
  );
}

/**
 * Structure for a conversation consisting of multiple messages
 */
export interface Conversation {
  /** Array of messages in chronological order */
  messages: Message[];
  
  /** Optional conversation ID */
  id?: string;
  
  /** Optional metadata for the conversation */
  metadata?: Record<string, any>;
}
