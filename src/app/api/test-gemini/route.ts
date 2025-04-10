/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { createLLMProvider } from '@/lib/llm/factory';
import { getLLMServiceConfig } from '@/lib/llm/config';
import { ChatCompletionOptions } from '@/lib/llm/types';

// Ensure all providers are registered
import { ensureProvidersRegistered } from '@/lib/llm/register-providers';

// Call the function to ensure TypeScript doesn't optimize out the import
ensureProvidersRegistered();

/**
 * API route to test the Gemini provider
 * @param req The Next.js request object
 * @returns JSON response with the generated text
 */
export async function POST(req: NextRequest) {
  try {
    // Get the request payload
    const payload = await req.json();
    const { prompt, stream = false } = payload;
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }
    
    // Get the LLM service configuration
    const config = getLLMServiceConfig();
    
    // Make sure we're using the Gemini provider
    config.provider = 'gemini';
    
    // Create the provider
    const provider = createLLMProvider(config.provider, config.providerConfig);
    
    // Set up chat options
    const chatOptions: ChatCompletionOptions = {
      model: 'gemini-1.5-flash',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      maxTokens: 800
    };
    
    if (stream) {
      // For streaming responses, we need a different approach
      const encoder = new TextEncoder();
      const customReadable = new ReadableStream({
        async start(controller) {
          try {
            // Process the chat completion with streaming
            await provider.streamChatCompletion(
              chatOptions,
              (chunk, done) => {
                if (chunk.content) {
                  // Send the chunk
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk.content })}\n\n`));
                }
                
                if (done) {
                  controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                  controller.close();
                }
              }
            );
          } catch (error: any) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ error: error.message })}\n\n`)
            );
            controller.close();
          }
        }
      });
      
      return new NextResponse(customReadable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    } else {
      // For non-streaming, just return the complete response
      const response = await provider.generateChatCompletion(chatOptions);
      
      return NextResponse.json({
        text: response.message.content
      });
    }
  } catch (error: any) {
    console.error('Error in test-gemini API route:', error);
    
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}
