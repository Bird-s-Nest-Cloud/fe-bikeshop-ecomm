# GearX Bangladesh Landing Page - Implementation Documentation

**Project:** Bike Shop Frontend - GearX Bangladesh  
**Date:** October 21, 2025  
**Framework:** Next.js 13+ (App Router) with React and Tailwind CSS  

---

## Project Overview

This document outlines the complete implementation of the GearX Bangladesh landing page based on the provided JSON structure. The landing page is a modern e-commerce frontend showcasing bike helmets and accessories with a professional design using variable-based styling.

### Key Design Principles

1. **Design Tokens**: All colors, spacing, and typography are centralized in `design-config.js`
2. **Responsive Design**: Mobile-first approach with Tailwind CSS
3. **Performance**: Optimized components with lazy loading where applicable
4. **Accessibility**: Semantic HTML and proper ARIA attributes
5. **Maintainability**: Well-documented, reusable components

---

## File Structure

```
src/
├── app/
│   ├── globals.css          (Global Tailwind styles)
│   ├── layout.js            (Root layout)
│   └── page.js              (Landing page - UPDATED)
│
├── components/
│   ├── layout/
│   │   ├── Header.jsx       (NEW - Main header)
│   │   ├── TopBar.jsx       (NEW - Top navigation bar)
│   │   └── Footer.jsx       (UPDATED - Full footer)
│   │
│   └── sections/
│       ├── HeroCarousel.jsx       (NEW - Hero banner with carousel)
│       ├── Categories.jsx         (NEW - Category grid)
│       ├── FeaturedProducts.jsx   (NEW - Product showcase)
│       ├── NewProducts.jsx        (NEW - New arrivals carousel)
│       └── BrandsCarousel.jsx     (NEW - Brand logos)
│
├── config/
│   └── design-config.js     (UPDATED - Design tokens & variables)
│
└── data/
    └── landing-page-data.js (UPDATED - Page content)
```

---

## Component Documentation

### 1. **Header Component** (`Header.jsx`)

**Purpose**: Main site header with navigation and search functionality

**Features**:
- Integrated TopBar with support contact info
- Responsive navigation menu with dropdowns
- Logo and brand identity
- Search bar (desktop only)
- Action icons (wishlist, cart)
- Mobile hamburger menu

**Props**:
```javascript
headerData: {
  topbar: { welcomeText, links, support },
  navbar: { logo, menu, actions }
}
```

**Responsive Breakpoints**:
- Mobile: Hamburger menu, hidden search
- Tablet (md): Visible menu, search hidden
- Desktop (lg): Full navigation with search and icons

---

### 2. **TopBar Component** (`TopBar.jsx`)

**Purpose**: Upper navigation bar with quick links and support info

**Features**:
- Welcome message
- Quick navigation links
- Phone and email contact display
- Hidden on mobile devices

**Props**:
```javascript
topbarData: {
  welcomeText: "Welcome to GearX Bangladesh",
  links: [{ label, href }],
  support: { icon, phone, email }
}
```

---

### 3. **HeroCarousel Component** (`HeroCarousel.jsx`)

**Purpose**: Full-width hero banner with auto-playing carousel

**Features**:
- Auto-play functionality (5000ms default)
- Manual navigation (prev/next buttons)
- Slide indicators (dots)
- Responsive image backgrounds
- Overlay effect for text readability
- CTA buttons for each slide

**Props**:
```javascript
heroData: {
  autoplay: boolean,
  intervalMs: number,
  slides: [{
    image: string,
    headline: string,
    subtext: string,
    cta: { label, href }
  }]
}
```

**Key Features**:
- Smooth transitions between slides
- Pause on hover
- Keyboard navigation ready

---

### 4. **Categories Component** (`Categories.jsx`)

**Purpose**: Product category showcase in grid layout

**Features**:
- Responsive grid (4 columns desktop, 2 mobile)
- Image backgrounds with overlays
- Hover animations with scale effect
- Category links for navigation

**Props**:
```javascript
categoriesData: {
  title: string,
  items: [{
    label: string,
    image: string,
    href: string
  }]
}
```

**Grid Settings**:
- Desktop: 4 columns
- Tablet: 2-4 columns (responsive)
- Mobile: 2 columns

---

### 5. **FeaturedProducts Component** (`FeaturedProducts.jsx`)

**Purpose**: Display featured product cards with ratings

**Features**:
- Product card layout with image, title, price
- 5-star rating system
- Quick view buttons
- Add to cart functionality
- Hover effects with scale and shadow

**Sub-component - StarRating**:
- Visual star rating display
- Shows decimal ratings (.1 precision)

**Props**:
```javascript
productsData: {
  title: string,
  products: [{
    id: string,
    title: string,
    price: number,
    currency: string,
    image: string,
    rating: number (0-5)
  }]
}
```

**Grid Responsive**:
- Desktop (lg): 4 columns
- Tablet (md): 2 columns
- Mobile: 1 column

---

### 6. **NewProducts Component** (`NewProducts.jsx`)

**Purpose**: New arrivals showcase with scrollable carousel

**Features**:
- Auto-scrolling carousel (manual override)
- Responsive item visibility (1-4 items per screen)
- Prev/next navigation buttons
- Mobile dots indicator
- Add to cart circular buttons

**Props**:
```javascript
newProductsData: {
  title: string,
  subtitle: string,
  products: [{
    id: string,
    title: string,
    price: number,
    currency: string,
    image: string
  }]
}
```

**Responsive Visibility**:
- Mobile (sm): 1 item
- Tablet (md): 2 items
- Desktop (lg): 4 items

---

### 7. **BrandsCarousel Component** (`BrandsCarousel.jsx`)

**Purpose**: Display partner brand logos in carousel

**Features**:
- Auto-playing carousel (3000ms interval)
- Brand logo or name fallback
- Visible indicators/dots
- Prev/next navigation (desktop)
- Hover effects on brand cards

**Props**:
```javascript
brandsData: {
  title: string,
  items: [{
    name: string,
    logo: string (image path)
  }]
}
```

**Grid Settings**:
- Desktop (lg): 5 brands visible
- Tablet (md): 3 brands visible
- Mobile: 2 brands visible

---

### 8. **Footer Component** (`Footer.jsx`)

**Purpose**: Complete site footer with links and company info

**Features**:
- Company support information
- Multi-column link sections
- Social media icons
- Copyright information
- Responsive multi-column layout

**Props**:
```javascript
footerData: {
  support: {
    headline: string,
    phone: string,
    address: string,
    socials: [{ icon: string, href: string }]
  },
  columns: [{
    title: string,
    links: [{ label, href }]
  }],
  copyright: string
}
```

**Responsive Layout**:
- Mobile: Single column
- Tablet (md): 2 columns
- Desktop (lg): 4 columns

---

## Design Configuration (`design-config.js`)

### Color Palette

**Primary Colors**:
- `primary.dark`: #1a1a1a (Deep black)
- `primary.main`: #111827 (Very dark gray)
- `accent.orange`: #ff6b35 (Primary brand orange)

**Neutral Colors**:
- White (#ffffff)
- Gray scale (100-900 shades)

**Semantic Colors**:
- Success: #10b981
- Warning: #f59e0b
- Error: #ef4444

### Typography

**Font Family**: UI Sans-serif system fonts

**Font Sizes**:
- Base: 1rem (16px)
- Heading: Up to 3rem (48px)
- Body text: 0.875rem - 1.125rem

**Font Weights**:
- Light: 300
- Normal: 400
- Semibold: 600
- Bold: 700

### Spacing System

Uses 8px base unit:
- `xs`: 0.25rem (4px)
- `sm`: 0.5rem (8px)
- `md`: 1rem (16px)
- `lg`: 1.5rem (24px)
- `xl`: 2rem (32px)
- `2xl`: 2.5rem (40px)

### Breakpoints

- xs: 320px
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### Transitions

- `fast`: 150ms
- `normal`: 250ms
- `slow`: 350ms
- `slower`: 500ms

---

## Landing Page Data (`landing-page-data.js`)

Complete configuration file containing:
- Meta information (title, description, language)
- Header data (topbar, navbar structure)
- Hero carousel slides
- Category items
- Featured products (4 items)
- New products (4 items)
- Brand logos (5 brands)
- Footer information

All prices are in BDT (Bangladeshi Taka).

---

## Responsive Design Strategy

### Mobile-First Approach

1. **Base styles** defined for mobile
2. **Tailwind breakpoints** used for larger screens
3. **CSS Grid/Flex** for responsive layouts

### Breakpoint Usage

```
Mobile (< 640px): Single column, hidden elements
Tablet (640px - 1023px): 2-column layouts
Desktop (1024px+): Full multi-column layouts
```

---

## Interactive Features

### Auto-Playing Carousels

1. **HeroCarousel**: 5-second interval, pauses on hover
2. **BrandsCarousel**: 3-second interval, pauses on hover
3. **NewProducts**: Manual scroll with indicators

### Hover Effects

- Product cards: Scale (1.05) + shadow increase
- Category cards: Image zoom + overlay darkening
- Navigation items: Color change to orange

### Navigation

- Desktop: Dropdown menus on hover
- Mobile: Collapsed hamburger menu with toggle

---

## Color Usage Throughout

| Element | Color | Hex |
|---------|-------|-----|
| Headers | Primary Dark | #1a1a1a |
| Brand Elements | Accent Orange | #ff6b35 |
| Backgrounds | Neutral White/Gray | #ffffff / #f3f4f6 |
| Links (Hover) | Orange/Lighter | #ff8c5a |
| Borders | Gray 300 | #e5e7eb |
| Text (Primary) | Gray 900 | #111827 |
| Text (Secondary) | Gray 600 | #6b7280 |

---

## Performance Considerations

1. **Image Optimization**: Using Next.js Image component (recommended for production)
2. **Code Splitting**: Components are lazy-loadable
3. **CSS**: Tailwind CSS with PurgeCSS for production builds
4. **JavaScript**: Minimal client-side code, 'use client' only where necessary

---

## Future Enhancements

1. Add product filtering and sorting
2. Implement shopping cart functionality
3. Add user authentication
4. Integrate with backend API
5. Add analytics tracking
6. Implement image CDN integration
7. Add loading skeletons
8. Implement form validation for contact

---

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation Steps
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Accessibility Features

- Semantic HTML elements
- Alt text on images
- Keyboard navigation support
- Color contrast compliance
- ARIA labels where applicable

---

## Notes for Developers

1. **Color changes**: Edit `designConfig.colors` in `design-config.js`
2. **Content updates**: Edit `landing-page-data.js`
3. **Component styling**: Use `style={}` objects with config values
4. **Responsive adjustments**: Modify Tailwind classes (md:, lg:, etc.)
5. **New sections**: Follow the component pattern established

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-10-21 | Initial implementation of landing page with all components |

---

*Last Updated: October 21, 2025*  
*Created for: GearX Bangladesh E-commerce Platform*
