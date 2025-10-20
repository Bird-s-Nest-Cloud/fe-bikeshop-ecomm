# Design System Reference

## Color Palette

### Primary Colors
```javascript
primary: {
  dark: '#1a1a1a',      // Deep black for headers
  main: '#111827',       // Very dark gray
  light: '#374151',      // Medium gray for secondary text
  lighter: '#6b7280',    // Light gray
  lightest: '#f3f4f6',   // Off-white background
}
```

### Accent Colors
```javascript
accent: {
  orange: '#ff6b35',     // PRIMARY BRAND COLOR
  orangeLight: '#ff8c5a',
  orangeDark: '#e55a2b',
  red: '#ef4444',
  green: '#10b981',
  yellow: '#f59e0b',
  blue: '#3b82f6',
}
```

### Neutral Colors
```javascript
neutral: {
  white: '#ffffff',
  black: '#000000',
  gray100: '#f9fafb',
  gray200: '#f3f4f6',
  gray300: '#e5e7eb',
  gray400: '#d1d5db',
  gray500: '#9ca3af',
  gray600: '#6b7280',
  gray700: '#4b5563',
  gray800: '#1f2937',
  gray900: '#111827',
}
```

## Typography

### Font Sizes
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)
- 5xl: 3rem (48px)

### Font Weights
- light: 300
- normal: 400
- medium: 500
- semibold: 600
- bold: 700
- extrabold: 800

### Line Heights
- tight: 1.2
- normal: 1.5
- relaxed: 1.75
- loose: 2

## Spacing Scale

All measurements in rem (root em):
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 2.5rem (40px)
- 3xl: 3rem (48px)
- 4xl: 4rem (64px)
- 5xl: 5rem (80px)

## Border Radius

- none: 0
- xs: 0.25rem (4px)
- sm: 0.375rem (6px)
- md: 0.5rem (8px)
- lg: 0.75rem (12px)
- xl: 1rem (16px)
- 2xl: 1.5rem (24px)
- full: 9999px (circular)

## Shadow System

- xs: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- sm: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`
- md: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- lg: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- xl: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`
- 2xl: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`

## Transitions

- fast: 150ms ease-in-out
- normal: 250ms ease-in-out
- slow: 350ms ease-in-out
- slower: 500ms ease-in-out

## Component-Specific Settings

### Header
- topbar height: 2.5rem (40px)
- navbar height: 3.75rem (60px)
- logo height: 2.5rem (40px)

### Hero Carousel
- min height: 500px
- image opacity: 0.7
- overlay background: rgba(0, 0, 0, 0.3)

### Cards
- hover scale: 1.05
- hover shadow color: rgba(255, 107, 53, 0.1)

### Buttons
- default height: 2.75rem (44px)
- default padding: 0.75rem 1.5rem (12px 24px)

## Color Usage Examples

### Hero Section
- Background: Uses hero image with overlay
- Headline: White text
- Subtext: White text
- CTA Button: Accent Orange (#ff6b35)

### Featured Products Section
- Background: Neutral Gray 100
- Card Background: White
- Title: Gray 900
- Price: Accent Orange
- Button (Add to Cart): Primary Dark

### Category Cards
- Overlay gradient: Black with opacity
- Text: White
- Hover state: Darker overlay + Image zoom

### Navigation
- Links: Gray 900
- Links (Hover): Accent Orange
- Dropdown: White background
- Active/Highlight: Accent Orange

## Responsive Design Values

### Container Widths
- sm (640px): Full width - 1rem padding
- md (768px): Full width - 1.5rem padding
- lg (1024px): 1000px width with padding
- xl (1280px): 1200px width with padding

### Grid Columns
- Mobile: Single or 2 columns
- Tablet: 2-3 columns
- Desktop: 3-4 columns depending on section

## Usage in Components

```javascript
import { designConfig } from '@/config/design-config';

const { colors, typography, spacing, components } = designConfig;

// Usage example
<div style={{
  background: colors.accent.orange,
  padding: spacing.lg,
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
  borderRadius: designConfig.borderRadius.lg,
}}>
```

## Hover States

- Links: color changes to orange-400/600
- Buttons: bg-orange-600, shadow increases
- Cards: scale 1.05, shadow increases
- Images: scale 1.1 (on hover parent)

## Dark Mode (Future)

The current design is light mode. For dark mode implementation:
- Swap primary colors with lighter variants
- Update text colors to white/light gray
- Adjust shadows for dark backgrounds
