/**
 * This file is used to explicitly register all providers
 * Import this file in any component that needs to use LLM providers
 * to ensure they're registered before use
 */

// Import all providers to ensure they register with the factory
import './providers/mock-provider';
import './providers/gemini-provider';

// Export a dummy function to force import
export function ensureProvidersRegistered() {
  // This function does nothing but forces the imports above to be included
  return true;
}
