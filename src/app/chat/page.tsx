import { ChatInterface } from '@/components/chat';

export const metadata = {
  title: 'Fashion AI Chat',
  description: 'Chat with our Fashion AI Assistant powered by Gemini',
};

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif mb-6 text-fashion-burgundy text-center">
            Fashion AI Assistant
          </h1>
          
          <p className="text-center text-gray-600 mb-8">
            Get personalized fashion advice, outfit recommendations, and style tips from our AI assistant.
          </p>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <ChatInterface className="h-[600px]" />
          </div>
          
          <div className="mt-6 text-sm text-gray-500 text-center">
            <p>
              Powered by Gemini AI and Vercel AI SDK
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}