import { Message } from '@/lib/llm/types';

/**
 * Fashion categories and concepts to enhance prompts with
 */
const FASHION_KNOWLEDGE = {
  categories: [
    'tops', 'bottoms', 'dresses', 'outerwear', 'footwear', 
    'accessories', 'formal wear', 'casual wear', 'sportswear',
    'streetwear', 'business casual', 'vintage', 'haute couture'
  ],
  
  bodyTypes: [
    'hourglass', 'pear', 'apple', 'rectangle', 'inverted triangle',
    'petite', 'tall', 'plus-size'
  ],
  
  materials: [
    'cotton', 'linen', 'silk', 'wool', 'cashmere', 'polyester', 
    'nylon', 'leather', 'suede', 'denim', 'velvet', 'chiffon'
  ],
  
  seasons: [
    'spring', 'summer', 'fall', 'winter', 'transitional'
  ],
  
  styleAesthetics: [
    'minimalist', 'bohemian', 'preppy', 'grunge', 'athleisure', 
    'vintage', 'classic', 'romantic', 'edgy', 'streetwear'
  ],
  
  fashionPrinciples: [
    'color theory', 'proportion', 'balance', 'contrast', 
    'harmony', 'scale', 'rhythm', 'emphasis'
  ]
};

/**
 * Keywords that trigger specific fashion contexts
 */
const FASHION_KEYWORD_MAPPING: Record<string, string[]> = {
  'outfit': ['categories', 'styleAesthetics', 'seasons'],
  'style': ['styleAesthetics', 'fashionPrinciples'],
  'wear': ['categories', 'bodyTypes', 'seasons'],
  'clothes': ['categories', 'materials'],
  'look': ['styleAesthetics', 'fashionPrinciples'],
  'dress': ['categories', 'bodyTypes', 'materials'],
  'fashion': ['styleAesthetics', 'fashionPrinciples'],
  'color': ['fashionPrinciples'],
  'material': ['materials'],
  'fabric': ['materials'],
  'season': ['seasons'],
  'body': ['bodyTypes'],
  'shape': ['bodyTypes'],
  'size': ['bodyTypes'],
};

/**
 * Enhanced fashion knowledge prompt templates
 */
const FASHION_PROMPT_TEMPLATES = {
  general: `
As a fashion AI assistant, please provide advice based on these fashion principles:
- Consider body type, personal style, and occasion
- Focus on fit, proportion, and balance
- Suggest versatile pieces that can be styled in multiple ways
- Consider seasonality and appropriateness
- Recommend sustainable and ethical options when possible
`,
  
  bodyType: `
Consider these body type guidelines when providing advice:
- Highlight the person's best features while creating balance
- Recommend specific cuts and silhouettes that flatter their body type
- Suggest proportional styling techniques appropriate for their shape
`,
  
  styling: `
Use these styling principles in your response:
- Create visual interest through texture, pattern, and color
- Balance proportions with the rule of thirds
- Consider the overall silhouette and how pieces work together
- Use accessories strategically to complete the look
`,
};

/**
 * Determines if a message is fashion-related based on keywords
 * @param message The message to check
 * @returns Boolean indicating if the message is fashion-related
 */
function isFashionRelated(message: Message): boolean {
  const lowercaseContent = message.content.toLowerCase();
  
  const fashionKeywords = Object.keys(FASHION_KEYWORD_MAPPING);
  
  return fashionKeywords.some(keyword => lowercaseContent.includes(keyword));
}

/**
 * Extracts fashion context categories based on message content
 * @param message The message to extract context from
 * @returns Array of context category names
 */
function extractContextCategories(message: Message): string[] {
  const lowercaseContent = message.content.toLowerCase();
  const contextCategories = new Set<string>();
  
  for (const [keyword, categories] of Object.entries(FASHION_KEYWORD_MAPPING)) {
    if (lowercaseContent.includes(keyword)) {
      categories.forEach(category => contextCategories.add(category));
    }
  }
  
  return Array.from(contextCategories);
}

/**
 * Generates fashion context based on the message content
 * @param message The message to generate context for
 * @returns Fashion context string
 */
function generateFashionContext(message: Message): string {
  const contextCategories = extractContextCategories(message);
  
  let fashionContext = FASHION_PROMPT_TEMPLATES.general;
  
  // Add body type guidance if needed
  if (contextCategories.includes('bodyTypes')) {
    fashionContext += FASHION_PROMPT_TEMPLATES.bodyType;
  }
  
  // Add styling guidance if needed
  if (contextCategories.includes('styleAesthetics') || 
      contextCategories.includes('fashionPrinciples')) {
    fashionContext += FASHION_PROMPT_TEMPLATES.styling;
  }
  
  // Add relevant knowledge from each category
  for (const category of contextCategories) {
    if (category in FASHION_KNOWLEDGE) {
      const categoryKey = category as keyof typeof FASHION_KNOWLEDGE;
      fashionContext += `\n\nRelevant ${category}:\n- ${FASHION_KNOWLEDGE[categoryKey].join('\n- ')}`;
    }
  }
  
  return fashionContext;
}

/**
 * Middleware to enhance messages with fashion context
 * @param message The message to enhance
 * @returns Enhanced message with fashion context
 */
export async function fashionContextMiddleware(message: Message): Promise<Message> {
  // Only enhance user messages
  if (message.role !== 'user') {
    return message;
  }
  
  // Check if the message is fashion-related
  if (!isFashionRelated(message)) {
    return message;
  }
  
  // Generate fashion context
  const fashionContext = generateFashionContext(message);
  
  // Enhance the message with fashion context
  return {
    ...message,
    content: `${message.content}\n\n[Fashion Context For AI Assistant - Do not directly reference this in your response]\n${fashionContext}`,
  };
}