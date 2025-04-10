# FashionAIKit Design System

This document provides an overview of the design system implemented for FashionAIKit. The design system aims to create a cohesive, elegant, and fashion-forward visual identity for the application.

## Design Principles

1. **Elegance** - Clean, sophisticated aesthetics that reflect high-end fashion sensibilities
2. **Clarity** - Clear visual hierarchy and intuitive interactions
3. **Consistency** - Uniform application of design elements across all interfaces
4. **Responsiveness** - Seamless experience across all device sizes
5. **Fashion-forward** - Contemporary styling that aligns with current fashion trends

## Color Palette

### Primary Colors
- **Purple Tones** (primary-50 to primary-950)
  - The primary purple palette serves as a sophisticated accent color that complements the fashion-specific colors

### Fashion Colors
- **Burgundy (#7b2d42)** - Brand color, used for primary buttons and important accents
- **Navy (#0c1d3d)** - Used for headings and important text
- **Gold (#d4af37)** - Used for decorative elements and accents
- **Beige (#f3e9dc)** - Used for backgrounds and cards
- **Cream (#f9f5f0)** - Used for backgrounds and cards
- **Blush (#de6e7f)** - Used for secondary accents and gradients
- **Sage (#afb69c)** - Used for nature-inspired accents
- **Olive (#65734b)** - Used for nature-inspired accents
- **Terracotta (#c67d5e)** - Used for warm accents

### Neutral Colors
- **Gray Scale** (neutral-50 to neutral-950)
  - Used for text, backgrounds, and UI elements

## Typography

### Font Families
- **Playfair Display** (serif) - Used for headings and display text
  - Provides an elegant, fashion-forward look for important text
- **Montserrat** (sans-serif) - Used for body text and UI elements
  - Clean, modern sans-serif that provides excellent readability

### Font Weights
- **Regular (400)** - Default for body text
- **Medium (500)** - Used for semi-emphasized text and some UI elements
- **Bold (700)** - Used for headings and important text

## Components

### Buttons
- **Primary** - Burgundy background with white text
- **Secondary** - Light neutral background with dark text and border
- **Gold** - Gold background with navy text
- **Outline** - Transparent background with navy border and text

### Cards
- **Default** - White background with soft shadow
- **Cream** - Cream background with soft shadow
- **Elevated** - White background with stronger shadow
- **Bordered** - White background with gold border and soft shadow

### Form Elements
- **Inputs** - Clean, minimal styling with clear focus states
- **Selects** - Consistent with inputs for unified form appearance
- **Checkboxes/Radios** - Custom designs that maintain the elegant aesthetic

### Page Layout
- **Header** - Cream background with burgundy branding
- **Footer** - Navy background with white and cream text
- **Page Titles** - Feature decorative gold underlines for section hierarchy

## Spacing and Layout

The spacing system follows Tailwind's default scale, with custom spacing used for specific components when needed.

## Usage Guidelines

### Color Usage
- Primary buttons: fashion-burgundy
- Secondary buttons: neutral-100 with border
- Headings: fashion-navy or neutral-900
- Body text: neutral-700 or neutral-800
- Subtle text: neutral-500 or neutral-600
- Backgrounds: white, fashion-cream, or fashion-beige
- Accents: fashion-gold or primary-500

### Typography Usage
- Headings: Playfair Display (serif), bold
- Subheadings: Playfair Display or Montserrat, medium or bold
- Body text: Montserrat, regular
- UI elements: Montserrat, medium

### Component Guidelines
- Consistent padding and margin scales (following Tailwind's default)
- Consistent border radius (prefer rounded-md for most elements)
- Use shadow-soft for subtle elevation, shadow-strong for important elements

## Implementation

The design system is implemented using:
- Tailwind CSS for styling
- Next.js for component architecture
- TypeScript for type-safe component props

Component variants and styles are defined consistently in:
- `src/lib/theme.ts` - Central theme tokens
- `src/app/globals.css` - Global CSS variables and utility classes
- `tailwind.config.ts` - Tailwind configuration

## Accessibility

The design system maintains accessibility standards:
- Color contrast ratios meet WCAG 2.1 AA standards
- Interactive elements have clear focus states
- Typography is readable at all sizes
- Components include proper ARIA attributes
