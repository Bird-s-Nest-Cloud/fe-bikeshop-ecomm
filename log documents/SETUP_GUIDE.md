# Setup and Development Guide

## Project Setup

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher (or yarn/pnpm)
- Git

### Installation

```bash
# Clone the repository
cd d:\Projects\bike-shop-frontend

# Install dependencies
npm install

# Install Tailwind CSS (if not already configured)
npm install -D tailwindcss postcss autoprefixer

# Generate Tailwind config (optional - already configured)
npx tailwindcss init -p
```

### Running the Development Server

```bash
# Start development server
npm run dev

# Server will be available at http://localhost:3000
```

### Building for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

---

## Project Structure

```
bike-shop-frontend/
├── src/
│   ├── app/
│   │   ├── globals.css           # Global Tailwind styles
│   │   ├── layout.js             # Root layout with metadata
│   │   └── page.js               # Landing page (home)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx        # Main header with nav
│   │   │   ├── TopBar.jsx        # Top navigation bar
│   │   │   └── Footer.jsx        # Footer section
│   │   │
│   │   └── sections/
│   │       ├── HeroCarousel.jsx  # Hero banner carousel
│   │       ├── Categories.jsx    # Category grid
│   │       ├── FeaturedProducts.jsx  # Product showcase
│   │       ├── NewProducts.jsx   # New arrivals carousel
│   │       └── BrandsCarousel.jsx # Brand logos
│   │
│   ├── config/
│   │   └── design-config.js      # Design tokens & variables
│   │
│   └── data/
│       └── landing-page-data.js  # Landing page content
│
├── public/
│   ├── images/
│   │   ├── banner*.jpg           # Hero carousel images
│   │   ├── categories/           # Category images
│   │   ├── products/             # Product images
│   │   └── brands/               # Brand logos
│   ├── gearx-logo.png           # Site logo
│   └── favicon.ico              # Browser favicon
│
├── log documents/               # Documentation folder
│   ├── IMPLEMENTATION_GUIDE.md  # This guide
│   ├── DESIGN_SYSTEM.md         # Design tokens reference
│   ├── COMPONENT_API.md         # Component documentation
│   └── SETUP_GUIDE.md           # Setup instructions
│
├── next.config.mjs             # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── jsconfig.json               # JavaScript config
└── package.json                # Dependencies

```

---

## Key Files to Understand

### 1. `design-config.js`
Contains all design tokens:
- Color palette
- Typography scales
- Spacing system
- Border radius
- Shadows
- Transitions
- Component-specific values

**When to edit**: Changing colors, spacing, or any design tokens across the app

### 2. `landing-page-data.js`
Contains all page content:
- Meta information
- Header navigation structure
- Hero carousel slides
- Category items
- Product listings
- Brand information
- Footer content

**When to edit**: Updating content, prices, images, or structure

### 3. `page.js`
Main landing page component:
- Imports all sections
- Orchestrates component order
- Passes data from landing-page-data.js

**When to edit**: Changing section order or adding new sections

---

## Development Workflow

### Adding New Content

#### To Add a Product
1. Open `src/data/landing-page-data.js`
2. Find the relevant section (featuredProducts, newProducts, etc.)
3. Add new product object to the `products` array:

```javascript
{
  id: "unique-id",
  title: "Product Name",
  price: 12500.0,
  currency: "BDT",
  image: "/images/products/product.jpg",
  rating: 4.8  // Only for featured products
}
```

#### To Change Colors
1. Open `src/config/design-config.js`
2. Modify the `colors` object
3. All components automatically use the new colors

Example - Change accent orange:
```javascript
accent: {
  orange: '#ff6b35',      // Change this value
  // ...
}
```

#### To Add a New Section
1. Create a new component file in `src/components/sections/`
2. Follow the existing component pattern
3. Use `designConfig` for styling
4. Add data to `landing-page-data.js`
5. Import and add to `src/app/page.js`

### Running Tests (if applicable)
```bash
npm run test
```

### Linting
```bash
npm run lint
```

---

## Image Setup

All images should be placed in `/public/images/`:

```
public/images/
├── banner1.jpg              # Hero carousel image 1
├── banner2.jpg              # Hero carousel image 2
├── gearx-logo.png          # Main logo
├── categories/
│   ├── helmets.jpg
│   ├── riding-gears.jpg
│   ├── rain-gear.jpg
│   └── accessories.jpg
├── products/
│   ├── helmet1.jpg
│   ├── glove1.jpg
│   ├── lock1.jpg
│   ├── jacket1.jpg
│   ├── helmet2.jpg
│   ├── boot1.jpg
│   ├── visor1.jpg
│   └── light1.jpg
└── brands/
    ├── ls2.png
    ├── agv.png
    ├── mt.png
    ├── shoei.png
    └── hjc.png
```

### Image Optimization Tips
1. Compress images before uploading
2. Use appropriate formats (JPG for photos, PNG for logos)
3. Provide alt text for all images
4. Use Next.js Image component for optimization

---

## Environment Variables

Create `.env.local` file if needed:

```
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=https://gearxbangladesh.com
```

---

## Common Tasks

### Update Hero Banner Text
File: `src/data/landing-page-data.js`
```javascript
heroCarousel: {
  slides: [
    {
      headline: "Your new text here",  // Change this
      subtext: "Your subtext here",
      // ...
    }
  ]
}
```

### Change Header Menu Items
File: `src/data/landing-page-data.js`
```javascript
header: {
  navbar: {
    menu: [
      { label: "HOME", href: "/" },
      // Add or modify menu items here
    ]
  }
}
```

### Add Product to Featured Section
File: `src/data/landing-page-data.js`
```javascript
featuredProducts: {
  products: [
    // Add new object here
    {
      id: "helmet-001",
      title: "New Product",
      price: 25000,
      currency: "BDT",
      image: "/images/products/product.jpg",
      rating: 4.5
    }
  ]
}
```

### Customize Colors
File: `src/config/design-config.js`
```javascript
colors: {
  accent: {
    orange: '#ff6b35',    // Main brand color
    // Modify any color here
  }
}
```

---

## Performance Optimization

### Image Optimization
Use Next.js Image component for automatic optimization:
```javascript
import Image from 'next/image';

<Image
  src="/images/product.jpg"
  alt="Product"
  width={500}
  height={500}
  priority={false}
/>
```

### Code Splitting
Components are automatically code-split. Use dynamic imports for heavy components:
```javascript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <p>Loading...</p>,
});
```

### Lazy Loading
Images below the fold load on-demand:
```javascript
<img src="/images/product.jpg" loading="lazy" alt="Product" />
```

---

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found Errors
```bash
# Clear .next folder and reinstall
rm -r .next node_modules
npm install
npm run dev
```

### Image Not Loading
1. Check image path in `/public/images/`
2. Ensure file extension matches (jpg, png, etc.)
3. Check spelling in image paths
4. Use relative paths from `/public`

### Styles Not Applying
1. Clear browser cache
2. Check Tailwind class names are correct
3. Verify `designConfig` import
4. Run `npm run build` to check for errors

---

## Deployment

### Vercel (Recommended for Next.js)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Other Hosting Services

**Netlify**:
```bash
npm run build
# Upload the `.next` folder
```

**Traditional Hosting**:
```bash
npm run build
npm start
```

### Environment Setup for Production
1. Update API endpoints in `.env.production`
2. Set up CDN for images
3. Configure caching headers
4. Enable compression

---

## Debugging

### Enable Debug Logs
```javascript
// In components
console.log('Debug:', designConfig);
console.log('Data:', landingPageData);
```

### React DevTools
Install the React DevTools browser extension for debugging React components.

### Next.js Debug Mode
```bash
DEBUG=* npm run dev
```

---

## Git Workflow

### Committing Changes
```bash
# Stage changes
git add .

# Commit with meaningful message
git commit -m "feat: add new product section"

# Push to repository
git push origin main
```

### Branch Strategy
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "description"

# Push and create pull request
git push origin feature/new-feature
```

---

## Version Control

### Track Important Files
```
✓ src/
✓ public/images/
✓ package.json
✓ next.config.mjs
✓ tailwind.config.js

✗ .next/ (build folder)
✗ node_modules/ (dependencies)
✗ .env.local (sensitive data)
```

---

## Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Tools
- [VS Code](https://code.visualstudio.com/) - Recommended editor
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## Support & Contact

For issues or questions:
1. Check the documentation in `/log documents/`
2. Review component API reference
3. Check design system reference
4. Review example implementations

---

*Last Updated: October 21, 2025*
