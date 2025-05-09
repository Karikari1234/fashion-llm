# FashionAIKit

An AI-powered fashion recommendation system that helps users discover their personal style through conversational intelligence, computer vision analysis, and virtual try-on capabilities.

## Project Overview

FashionAIKit is a Next.js 14 application with the following key features:

- **AI Styling Assistant**: Conversational interface powered by Gemini AI to provide fashion advice and recommendations
- **Style Profile**: Personalized user profiles with style preferences and body measurements
- **Virtual Try-On**: AI-generated visualization of how garments would look on the user
- **Computer Vision Analysis**: Image processing to detect body types, clothing items, and style attributes

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Authentication**: Next-Auth (Auth.js) with MongoDB adapter
- **Database**: MongoDB for user profiles and fashion data
- **AI & ML**: Gemini API for conversational AI, Computer Vision for image analysis
- **Deployment**: Vercel for hosting and serverless functions

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB database (local or Atlas)
- Gemini API key

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Copy `.env.example` to `.env.local` and fill in your environment variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
/app                     # Core App Router directories
  /(auth)                # Authentication routes group
  /(main)                # Protected main application routes
  /api                   # API route handlers
/components              # Reusable UI components
/lib                     # Shared utilities and configurations
/models                  # Database schemas and models
/types                   # TypeScript type definitions
/public                  # Static assets
```

## Development Roadmap

Refer to `implementation_tasks.md` for a detailed breakdown of all implementation tasks and the project timeline.

## Contributing

1. Follow the project structure and coding conventions
2. Write clean, maintainable code with proper TypeScript types
3. Document your work in the `progress` folder
4. Test your changes thoroughly before submitting

## License

This project is proprietary and confidential.
#   f a s h i o n - l l m  
 