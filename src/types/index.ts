/**
 * User type definition
 */
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  stylePreferences?: StylePreferences;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Style Preferences type definition
 */
export interface StylePreferences {
  favoriteColors: string[];
  favoritePatterns: string[];
  avoidedColors?: string[];
  avoidedPatterns?: string[];
  preferredFit: 'loose' | 'regular' | 'slim' | 'custom';
  seasonalPreferences?: {
    spring?: string[];
    summer?: string[];
    fall?: string[];
    winter?: string[];
  };
  occasions?: string[];
}

/**
 * Fashion Item type definition
 */
export interface FashionItem {
  id: string;
  name: string;
  category: string;
  type: string;
  color: string[];
  pattern?: string;
  material?: string[];
  brand?: string;
  imageUrl?: string;
  occasions?: string[];
  seasons?: ('spring' | 'summer' | 'fall' | 'winter')[];
}

/**
 * Message type for chat
 */
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

/**
 * Conversation type
 */
export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
