# Quick Reference Guide

## 🎯 Quick Start

```bash
# Clone/Navigate to project
cd d:\Projects\bike-shop-frontend

# Install and run
npm install
npm run dev

# Visit http://localhost:3000
```

---

## 📁 File Locations

| What | Where |
|------|-------|
| Components | `src/components/` |
| Page Content | `src/data/landing-page-data.js` |
| Colors & Design | `src/config/design-config.js` |
| Landing Page | `src/app/page.js` |
| Images | `public/images/` |
| Documentation | `log documents/` |

---

## 🎨 Color Quick Reference

```javascript
// Primary Orange (Brand Color)
#ff6b35 → accent.orange

// Dark Colors
#1a1a1a → primary.dark
#111827 → primary.main

// Grays
#ffffff → neutral.white
#f3f4f6 → neutral.gray100
#111827 → neutral.gray900

// Accents
#ef4444 → error (red)
#10b981 → success (green)
#f59e0b → warning (yellow)
```

---

## 📐 Spacing Quick Reference

```javascript
xs = 4px    sm = 8px    md = 16px   lg = 24px
xl = 32px   2xl = 40px  3xl = 48px  4xl = 64px
```

---

## 🏗️ Component Hierarchy

```
page.js
├── Header
│   ├── TopBar
│   └── Navigation
├── HeroCarousel
├── Categories
├── FeaturedProducts
├── NewProducts
├── BrandsCarousel
└── Footer
```

---

## 🚀 Common Tasks

### Update Product Price
**File**: `src/data/landing-page-data.js`
```javascript
// Find the product object and update price
{
  price: 12500.0,  // Change this
}
```

### Change Brand Color
**File**: `src/config/design-config.js`
```javascript
accent: {
  orange: '#ff6b35',  // Change to your color
}
```

### Add New Category
**File**: `src/data/landing-page-data.js`
```javascript
categories: {
  items: [
    // Add new object here
    { label: "New Category", image: "/path", href: "/link" }
  ]
}
```

### Update Navigation Menu
**File**: `src/data/landing-page-data.js`
```javascript
header: {
  navbar: {
    menu: [
      // Add/modify menu items
    ]
  }
}
```

---

## 🎯 Component Props Overview

| Component | Key Props |
|-----------|-----------|
| Header | `headerData: { topbar, navbar }` |
| HeroCarousel | `heroData: { autoplay, intervalMs, slides }` |
| Categories | `categoriesData: { title, items }` |
| FeaturedProducts | `productsData: { title, products }` |
| NewProducts | `newProductsData: { title, products }` |
| BrandsCarousel | `brandsData: { title, items }` |
| Footer | `footerData: { support, columns }` |

---

## 📱 Responsive Grid Sizes

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Categories | 2 cols | 3-4 cols | 4 cols |
| Featured | 1 col | 2 cols | 4 cols |
| New Products | 1 item | 2 items | 4 items |
| Brands | 2 brands | 3 brands | 5 brands |

---

## 🔥 Hot Tips

1. **All colors defined in one place** → Easy to rebrand
2. **All content in one file** → Easy to update
3. **Use `designConfig` everywhere** → Consistency guaranteed
4. **Tailwind + Inline styles** → Best of both worlds
5. **'use client' only where needed** → Performance optimized

---

## ⚡ Performance Checklist

- ✅ Images optimized with Next.js Image component
- ✅ Code-splitting ready with dynamic imports
- ✅ Lazy loading support for images
- ✅ Minimal JavaScript payload
- ✅ Tailwind CSS purging for production

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Styles not showing | Clear .next folder, npm run dev |
| Image not displaying | Check image path in /public/images |
| Menu not working | Verify href paths in landing-page-data.js |
| Colors look off | Check designConfig colors in browser DevTools |
| Port in use | npm run dev -- -p 3001 |

---

## 📚 Documentation Map

- **Complete Guide** → `IMPLEMENTATION_GUIDE.md`
- **Design System** → `DESIGN_SYSTEM.md`
- **Component API** → `COMPONENT_API.md`
- **Setup & Dev** → `SETUP_GUIDE.md`
- **This Summary** → `PROJECT_SUMMARY.md`

---

## 💻 IDE Setup

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- PostCSS Language Support
- Prettier - Code formatter

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## 🔗 Import Statements

```javascript
// Design Config
import { designConfig } from '@/config/design-config';

// Data
import { landingPageData } from '@/data/landing-page-data';

// Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/components/sections/HeroCarousel';
import Categories from '@/components/sections/Categories';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import NewProducts from '@/components/sections/NewProducts';
import BrandsCarousel from '@/components/sections/BrandsCarousel';
```

---

## 📊 Data Structure Examples

### Product Object
```javascript
{
  id: "unique-id",
  title: "Product Name",
  price: 12500,
  currency: "BDT",
  image: "/images/products/product.jpg",
  rating: 4.8  // optional, for featured products
}
```

### Category Object
```javascript
{
  label: "Category Name",
  image: "/images/categories/category.jpg",
  href: "/c/category"
}
```

### Brand Object
```javascript
{
  name: "Brand Name",
  logo: "/images/brands/logo.png"
}
```

---

## 🎓 Learning Resources

### Inside This Project
1. Read `IMPLEMENTATION_GUIDE.md` for architecture
2. Check `COMPONENT_API.md` for component details
3. Review `DESIGN_SYSTEM.md` for design tokens
4. Use `SETUP_GUIDE.md` for deployment

### External
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com)

---

## 📋 Before Deploying

- [ ] Update all image paths
- [ ] Check all links are correct
- [ ] Verify phone number and email
- [ ] Update company address
- [ ] Add proper meta descriptions
- [ ] Set up analytics
- [ ] Test on mobile devices
- [ ] Check color contrast for accessibility
- [ ] Optimize images for web
- [ ] Set up CDN for images

---

## 🔐 Security Considerations

- API endpoints should use environment variables
- Sensitive data in `.env.local` (not committed)
- Input validation on all forms
- HTTPS for production
- Regular security audits

---

## 📞 Support Points

If you need to make changes:

1. **Content Changes** → Edit `landing-page-data.js`
2. **Design/Color Changes** → Edit `design-config.js`
3. **Layout Changes** → Edit component files
4. **New Section** → Create new component + update page.js

**Questions?** Check the relevant guide in `log documents/`

---

## 🎉 You're All Set!

Your GearX Bangladesh landing page is ready to go!

- ✅ All components working
- ✅ All styling configured
- ✅ All content structured
- ✅ All documentation provided
- ✅ Ready for deployment

**Happy coding! 🚀**

---

*Last Updated: October 21, 2025*
