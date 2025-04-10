/* eslint-disable import/no-anonymous-default-export */
/**
 * FashionAIKit Design System
 * 
 * This file documents the core design tokens and guidelines for the FashionAIKit application.
 * When creating new components or modifying existing ones, refer to this guide to maintain
 * visual consistency across the application.
 */

/**
 * COLOR PALETTE
 * 
 * Primary Colors - Used for primary actions, buttons, and accents
 * - Purple tones (primary-50 to primary-950)
 * 
 * Fashion Colors - Special palette for fashion-specific elements
 * - Burgundy - Brand color, used for primary buttons and important accents
 * - Navy - Used for headings and important text
 * - Gold - Used for decorative elements and accents
 * - Beige & Cream - Used for backgrounds and cards
 * - Blush - Used for secondary accents and gradients
 * - Sage & Olive - Used for nature-inspired accents
 * - Terracotta - Used for warm accents
 * 
 * Neutral Colors - Used for text, backgrounds, and UI elements
 * - Gray scale (neutral-50 to neutral-950)
 */
export const colors = {
  primary: {
    50: '#f7f2f7',
    100: '#efe4ef',
    200: '#e0cce0',
    300: '#d1b4d1',
    400: '#b78cb7',
    500: '#a56ea5',
    600: '#8f4c8f',
    700: '#793e79',
    800: '#633363',
    900: '#522b52',
    950: '#2d182d',
  },
  fashion: {
    black: '#000000',
    charcoal: '#36454F',
    navy: '#0c1d3d',
    burgundy: '#7b2d42',
    beige: '#f3e9dc',
    cream: '#f9f5f0',
    blush: '#de6e7f',
    gold: '#d4af37',
    silver: '#c0c0c0',
    sage: '#afb69c',
    olive: '#65734b',
    terracotta: '#c67d5e',
  },
};

/**
 * TYPOGRAPHY
 * 
 * Font Families
 * - Playfair Display (serif) - Used for headings and display text
 * - Montserrat (sans-serif) - Used for body text and UI elements
 * 
 * Type Scale
 * - Follows Tailwind's default scale with custom modifications
 * 
 * Font Weights
 * - Regular (400) - Default for body text
 * - Medium (500) - Used for semi-emphasized text and some UI elements
 * - Bold (700) - Used for headings and important text
 */
export const typography = {
  fonts: {
    serif: 'var(--font-playfair), Georgia, serif',
    sans: 'var(--font-montserrat), system-ui, sans-serif',
  },
  weights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
};

/**
 * SPACING
 * 
 * Uses Tailwind's default spacing scale
 * Custom spacing values are added for specific elements when needed
 */

/**
 * BORDERS & SHADOWS
 * 
 * Borders
 * - Default: 1px
 * - Medium: 2px
 * - Heavy: 4px
 * 
 * Border Radius
 * - Small: 0.25rem (rounded-sm)
 * - Default: 0.375rem (rounded)
 * - Medium: 0.5rem (rounded-md)
 * - Large: 1rem (rounded-lg)
 * - Extra Large: 2rem (rounded-4xl)
 * 
 * Shadows
 * - Soft: A subtle shadow for cards and containers
 * - Medium: A moderate shadow for elevated elements
 * - Strong: A prominent shadow for important elements
 */
export const effects = {
  shadows: {
    soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
    medium: '0 6px 25px rgba(0, 0, 0, 0.08)',
    strong: '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
};

/**
 * TRANSITIONS & ANIMATIONS
 * 
 * Transitions
 * - Default: 150ms ease-in-out
 * - Slow: 300ms ease-in-out
 * 
 * Animation Curves
 * - Default: ease-in-out
 * - Bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275)
 */
export const motion = {
  transitions: {
    default: '150ms ease-in-out',
    slow: '300ms ease-in-out',
  },
};

/**
 * Z-INDEX SCALE
 * 
 * Used to maintain consistent stacking context throughout the application
 * - Background: -1
 * - Default: 0
 * - Dropdown: 10
 * - Sticky: 20
 * - Fixed: 30
 * - Modal: 40
 * - Popover: 50
 * - Toast: 60
 * - Tooltip: 70
 */
export const zIndex = {
  background: -1,
  default: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  toast: 60,
  tooltip: 70,
};

/**
 * BREAKPOINTS
 * 
 * Follows Tailwind's default breakpoints
 * - sm: 640px
 * - md: 768px
 * - lg: 1024px
 * - xl: 1280px
 * - 2xl: 1536px
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

/**
 * USAGE GUIDELINES
 * 
 * Color Usage
 * - Primary buttons: fashion-burgundy
 * - Secondary buttons: neutral-100 with border
 * - Headings: fashion-navy or neutral-900
 * - Body text: neutral-700 or neutral-800
 * - Subtle text: neutral-500 or neutral-600
 * - Backgrounds: white, fashion-cream, or fashion-beige
 * - Accents: fashion-gold or primary-500
 * 
 * Typography Usage
 * - Headings: Playfair Display (serif), bold
 * - Subheadings: Playfair Display or Montserrat, medium or bold
 * - Body text: Montserrat, regular
 * - UI elements: Montserrat, medium
 * 
 * Component Guidelines
 * - Consistent padding and margin scales (following Tailwind's default)
 * - Consistent border radius (prefer rounded-md for most elements)
 * - Use shadow-soft for subtle elevation, shadow-strong for important elements
 */

export default {
  colors,
  typography,
  effects,
  motion,
  zIndex,
  breakpoints,
};
