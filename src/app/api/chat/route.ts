import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';
import { createLLMProvider } from '@/lib/llm/factory';
import { getLLMServiceConfig } from '@/lib/llm/config';
import { Message } from '@/lib/llm/types';
import { ensureProvidersRegistered } from '@/lib/llm/register-providers';
import { fashionContextMiddleware } from '@/lib/middleware/fashion-context';

// Ensure all providers are registered
ensureProvidersRegistered();

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { messages } = await req.json();
    
    // Get the LLM service configuration
    const config = getLLMServiceConfig();
    
    // Make sure we're using the Gemini provider
    config.provider = 'gemini';
    
    // Create an instance of GoogleGenerativeAI with our API key
    const genAI = new GoogleGenerativeAI(config.providerConfig.apiKey);
    
    // Get the Gemini model with default configurations
    const model = genAI.getGenerativeModel({
      model: config.providerConfig.defaultModel,
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });
    
    // Format messages for the Gemini API
    const formattedMessages = messages.map((message: any) => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: [{ text: message.content }],
    }));
    
    // Create a chat session
    const chat = model.startChat({
      history: formattedMessages.slice(0, -1),
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });
    
    // Apply fashion context middleware to enhance the last message
    const lastMessage = messages[messages.length - 1];
    const enhancedMessage = await fashionContextMiddleware(lastMessage);
    
    // Generate the streaming response
    const response = await chat.sendMessageStream(enhancedMessage.content);
    
    // Convert the response to a ReadableStream with the GoogleGenerativeAIStream helper
    const stream = GoogleGenerativeAIStream(response);
    
    // Return the stream as a StreamingTextResponse
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error in chat API route:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}