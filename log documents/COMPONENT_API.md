# Component API Reference

## Header Component

### Import
```javascript
import Header from '@/components/layout/Header';
```

### Props
```typescript
interface HeaderProps {
  headerData: {
    topbar: {
      welcomeText: string;
      links: Array<{ label: string; href: string }>;
      support: {
        icon: string;
        phone: string;
        email: string;
      };
    };
    navbar: {
      logo: { src: string; alt: string };
      menu: Array<{
        label: string;
        href?: string;
        dropdown?: Array<{ label: string; href: string }>;
      }>;
      actions: {
        productDropdown: string;
        searchPlaceholder: string;
        categoryFilter: string;
        icons: string[];
      };
    };
  };
}
```

### Usage
```javascript
<Header headerData={data.header} />
```

---

## TopBar Component

### Import
```javascript
import TopBar from '@/components/layout/TopBar';
```

### Props
```typescript
interface TopBarProps {
  topbarData: {
    welcomeText: string;
    links: Array<{ label: string; href: string }>;
    support: {
      icon: string;
      phone: string;
      email: string;
    };
  };
}
```

### Usage
```javascript
<TopBar topbarData={data.header.topbar} />
```

---

## HeroCarousel Component

### Import
```javascript
import HeroCarousel from '@/components/sections/HeroCarousel';
```

### Props
```typescript
interface HeroCarouselProps {
  heroData: {
    id: string;
    type: string;
    autoplay: boolean;
    intervalMs: number;
    slides: Array<{
      image: string;
      alt: string;
      headline: string;
      subtext: string;
      cta: { label: string; href: string };
    }>;
  };
}
```

### Usage
```javascript
<HeroCarousel heroData={data.heroCarousel} />
```

### Key Features
- Auto-play with 5000ms default interval
- Manual navigation with prev/next buttons
- Pause on hover
- Slide indicators (dots)

---

## Categories Component

### Import
```javascript
import Categories from '@/components/sections/Categories';
```

### Props
```typescript
interface CategoriesProps {
  categoriesData: {
    id: string;
    title: string;
    layout: string;
    gridSettings: { columns: { desktop: number; mobile: number } };
    items: Array<{
      label: string;
      image: string;
      href: string;
    }>;
  };
}
```

### Usage
```javascript
<Categories categoriesData={data.categories} />
```

### Responsive Grid
- Desktop (lg): 4 columns
- Mobile: 2 columns

---

## FeaturedProducts Component

### Import
```javascript
import FeaturedProducts from '@/components/sections/FeaturedProducts';
```

### Props
```typescript
interface FeaturedProductsProps {
  productsData: {
    id: string;
    title: string;
    gridSettings: {
      columns: { desktop: number; tablet: number; mobile: number };
    };
    products: Array<{
      id: string;
      title: string;
      price: number;
      currency: string;
      image: string;
      rating: number; // 0-5
    }>;
  };
}
```

### Usage
```javascript
<FeaturedProducts productsData={data.featuredProducts} />
```

### Sub-component: StarRating
```javascript
<StarRating rating={4.8} size="small" />
```

**Size options**: "small" | "medium" | "large"

---

## NewProducts Component

### Import
```javascript
import NewProducts from '@/components/sections/NewProducts';
```

### Props
```typescript
interface NewProductsProps {
  newProductsData: {
    id: string;
    title: string;
    subtitle: string;
    products: Array<{
      id: string;
      title: string;
      price: number;
      currency?: string; // defaults to BDT
      image: string;
    }>;
  };
}
```

### Usage
```javascript
<NewProducts newProductsData={data.newProducts} />
```

### Responsive Visibility
- Mobile (sm): 1 item
- Tablet (md): 2 items
- Desktop (lg): 4 items

---

## BrandsCarousel Component

### Import
```javascript
import BrandsCarousel from '@/components/sections/BrandsCarousel';
```

### Props
```typescript
interface BrandsCarouselProps {
  brandsData: {
    id: string;
    title: string;
    layout: string;
    autoplay: boolean;
    items: Array<{
      name: string;
      logo: string; // image path
    }>;
  };
}
```

### Usage
```javascript
<BrandsCarousel brandsData={data.brands} />
```

### Key Features
- Auto-play with 3000ms interval
- Manual navigation with prev/next buttons
- Pause on hover
- Indicators

---

## Footer Component

### Import
```javascript
import Footer from '@/components/layout/Footer';
```

### Props
```typescript
interface FooterProps {
  footerData: {
    id: string;
    logo: string;
    support: {
      headline: string;
      phone: string;
      address: string;
      socials: Array<{ icon: string; href: string }>;
    };
    columns: Array<{
      title: string;
      links: Array<{ label: string; href: string }>;
    }>;
    copyright: string;
  };
}
```

### Usage
```javascript
<Footer footerData={data.footer} />
```

### Responsive Layout
- Mobile: 1 column
- Tablet (md): 2 columns
- Desktop (lg): 4 columns

### Supported Social Icons
- facebook
- instagram
- youtube

---

## Design Config

### Import
```javascript
import { designConfig } from '@/config/design-config';
```

### Available Properties
```javascript
const {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  components
} = designConfig;
```

### Usage Example
```javascript
<div style={{
  background: colors.accent.orange,
  padding: spacing.lg,
  borderRadius: designConfig.borderRadius.md,
  boxShadow: designConfig.shadows.lg,
  transition: designConfig.transitions.normal,
}}>
  Content
</div>
```

---

## Landing Page Data

### Import
```javascript
import { landingPageData } from '@/data/landing-page-data';
```

### Data Structure
```javascript
const data = {
  meta: { title, description, lang },
  header: { topbar, navbar },
  heroCarousel: { /* carousel data */ },
  categories: { /* categories data */ },
  featuredProducts: { /* products data */ },
  newProducts: { /* products data */ },
  brands: { /* brands data */ },
  footer: { /* footer data */ }
}
```

---

## Tailwind Classes Used

### Layout
- `w-full`: Full width
- `max-w-7xl`: Container max width
- `mx-auto`: Center container
- `grid`: Grid layout
- `flex`: Flexbox layout

### Responsive
- `sm:`, `md:`, `lg:`, `xl:`: Breakpoint prefixes
- `grid-cols-1`, `md:grid-cols-2`, `lg:grid-cols-4`: Responsive columns
- `hidden md:flex`: Hidden on mobile, visible on tablet+

### Hover/State
- `hover:scale-105`: Scale on hover
- `hover:shadow-lg`: Shadow on hover
- `hover:text-orange-600`: Color change on hover
- `hover:bg-orange-600`: Background color on hover

### Display
- `flex items-center`: Center vertically
- `justify-between`: Space between
- `gap-4`: Gap between items
- `rounded-md`: Border radius

---

## Common Patterns

### Using Design Variables
```javascript
<div style={{
  background: colors.neutral.white,
  padding: spacing.lg,
  borderRadius: designConfig.borderRadius.md,
}}>
```

### Responsive Styling with Tailwind
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Combining Inline Styles with Tailwind
```javascript
<button
  style={{ background: colors.accent.orange }}
  className="hover:bg-orange-600 transition-colors"
>
```

### Using Transitions
```javascript
<div style={{
  transition: designConfig.transitions.normal,
  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
}}>
```

---

## Event Handlers

### Navigation Buttons
```javascript
const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
```

### State Management
```javascript
const [currentSlide, setCurrentSlide] = useState(0);
const [isAutoplay, setIsAutoplay] = useState(true);
```

---

## Performance Tips

1. Use `'use client'` only in necessary components
2. Memoize components with React.memo for repeated renders
3. Use Next.js Image component for image optimization
4. Implement lazy loading for images
5. Use CSS transitions instead of animations where possible

---

## Accessibility

- All images have alt text
- Links have proper href attributes
- Buttons are keyboard accessible
- Color contrast meets WCAG standards
- Semantic HTML structure

---

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS 14+, Android 11+)
