import { LLMProvider, LLMProviderConfig, LLMError, LLMErrorType } from './types';

/**
 * Available LLM provider types
 */
export type ProviderType = 'gemini' | 'mock';

/**
 * Registry for available LLM providers
 */
const providerRegistry: Record<ProviderType, (config: LLMProviderConfig) => LLMProvider> = {} as any;

/**
 * Factory function to create an instance of an LLM provider
 * @param type The type of provider to create
 * @param config Configuration options for the provider
 * @returns A configured LLM provider instance
 * @throws Error if the provider type is not registered
 */
export function createLLMProvider(type: ProviderType, config: LLMProviderConfig): LLMProvider {
  const providerFactory = providerRegistry[type];
  
  if (!providerFactory) {
    throw new LLMError(
      `Provider type '${type}' is not registered`,
      LLMErrorType.INVALID_REQUEST
    );
  }
  
  return providerFactory(config);
}

/**
 * Register a provider factory function
 * @param type The provider type identifier
 * @param factory Factory function to create a provider instance
 */
export function registerProvider(
  type: ProviderType, 
  factory: (config: LLMProviderConfig) => LLMProvider
): void {
  providerRegistry[type] = factory;
}

/**
 * Get a list of all registered provider types
 * @returns Array of provider type identifiers
 */
export function getAvailableProviders(): ProviderType[] {
  return Object.keys(providerRegistry) as ProviderType[];
}
