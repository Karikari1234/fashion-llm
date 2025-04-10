/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */
'use client';

import { useState, FormEvent } from 'react';

// Import the provider registration to ensure Gemini provider is available
import { ensureProvidersRegistered } from '@/lib/llm/register-providers';

// Call the function to ensure TypeScript doesn't optimize out the import
ensureProvidersRegistered();

/**
 * Test page for Gemini provider implementation
 */
export default function TestGeminiPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingMode, setStreamingMode] = useState(false);
  
  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    
    setError('');
    setLoading(true);
    setResponse('');
    
    try {
      if (streamingMode) {
        // Streaming mode
        const response = await fetch('/api/test-gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, stream: true }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        
        if (!reader) {
          throw new Error('Failed to get response reader');
        }
        
        let partialResponse = '';
        
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            break;
          }
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.substring(6);
              
              if (data === '[DONE]') {
                continue;
              }
              
              try {
                const parsed = JSON.parse(data);
                
                if (parsed.error) {
                  setError(parsed.error);
                } else if (parsed.text) {
                  partialResponse = parsed.text;
                  setResponse(partialResponse);
                }
              } catch (e) {
                console.error('Error parsing streaming data:', e);
              }
            }
          }
        }
      } else {
        // Non-streaming mode
        const response = await fetch('/api/test-gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setResponse(data.text);
      }
    } catch (e: any) {
      console.error('Error:', e);
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-serif mb-6 text-fashion-burgundy">
          Gemini Provider Test
        </h1>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block mb-2 text-fashion-navy">
              Enter your prompt:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full border border-neutral-300 rounded-md p-3 h-32"
              placeholder="Ask me anything about fashion..."
            />
          </div>
          
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="streamingMode"
              checked={streamingMode}
              onChange={(e) => setStreamingMode(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="streamingMode">
              Enable streaming mode
            </label>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-fashion-burgundy text-white px-4 py-2 rounded-md hover:bg-opacity-90 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Response'}
          </button>
        </form>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
            {error}
          </div>
        )}
        
        {response && (
          <div className="bg-neutral-100 p-4 rounded-md">
            <h2 className="text-lg font-medium mb-2">Response:</h2>
            <div className="whitespace-pre-wrap">{response}</div>
          </div>
        )}
      </div>
    </div>
  );
}
