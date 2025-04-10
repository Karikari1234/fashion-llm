/* eslint-disable @typescript-eslint/no-unused-vars */
import { LLMProviderConfig, LLMError, LLMErrorType } from './types';
import { ProviderType } from './factory';

/**
 * Configuration options for the LLM service
 */
export interface LLMServiceConfig {
  /** The provider to use */
  provider: ProviderType;
  
  /** Provider-specific configuration */
  providerConfig: LLMProviderConfig;
}

/**
 * Get the Gemini API key from environment variables
 * @returns The API key or throws an error if not found
 */
function getGeminiApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new LLMError(
      'Gemini API key not found in environment variables (GEMINI_API_KEY or NEXT_PUBLIC_GEMINI_API_KEY)',
      LLMErrorType.AUTHENTICATION
    );
  }
  
  return apiKey;
}

/**
 * Get the configuration for the specified provider
 * @param provider The provider type
 * @returns Provider configuration object
 * @throws Error if required environment variables are missing
 */
export function getProviderConfig(provider: ProviderType): LLMProviderConfig {
  switch (provider) {
    case 'gemini':
      return {
        apiKey: getGeminiApiKey(),
        defaultModel: process.env.GEMINI_MODEL || 'gemini-pro',
        timeoutMs: Number(process.env.GEMINI_TIMEOUT_MS) || 30000,
        maxRetries: Number(process.env.GEMINI_MAX_RETRIES) || 3,
      };
      
    case 'mock':
      return {
        apiKey: 'mock-api-key',
        defaultModel: 'mock-model',
        timeoutMs: 1000,
        maxRetries: 0,
      };
      
    default:
      throw new LLMError(
        `Unknown provider type: ${provider}`,
        LLMErrorType.INVALID_REQUEST
      );
  }
}

/**
 * Get the LLM service configuration from environment variables
 * @returns Configuration object for the LLM service
 */
export function getLLMServiceConfig(): LLMServiceConfig {
  // Default to gemini provider if not specified
  const providerType = (process.env.LLM_PROVIDER || 'gemini') as ProviderType;
  
  return {
    provider: providerType,
    providerConfig: getProviderConfig(providerType),
  };
}

/**
 * Check if the provider is configured in the environment
 * @param provider The provider to check
 * @returns True if the provider is properly configured
 */
export function isProviderConfigured(provider: ProviderType): boolean {
  try {
    getProviderConfig(provider);
    return true;
  } catch (error) {
    return false;
  }
}
