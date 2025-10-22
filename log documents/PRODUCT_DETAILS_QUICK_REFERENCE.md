# Product Details Page - Quick Reference

## 🚀 Quick Start

### View a Product
Navigate to any product details page:
```
/products/gearx-pro-helmet
/products/urban-matte-helmet
/products/racing-sport-helmet
```

### File Locations
```
✅ Main Component: src/components/products/ProductDetailsPage.jsx
✅ Route File: src/app/products/[slug]/page.js
✅ Image Gallery: src/components/products/ImageGallery.jsx
✅ Variant Selector: src/components/products/VariantSelector.jsx
✅ Related Carousel: src/components/products/RelatedProductsCarousel.jsx
✅ Product Data: src/data/products-complete.js
```

---

## 🎯 Key Components

### 1. ImageGallery
```jsx
<ImageGallery images={product.images} title={product.title} />
```
- Display main product image
- Show thumbnail gallery
- Handle image switching

### 2. VariantSelector
```jsx
<VariantSelector
  variants={product.variants}
  selectedVariants={selectedVariants}
  onVariantChange={handleVariantChange}
/>
```
- Select color, size, etc.
- Prevent out-of-stock selections
- Show visual feedback

### 3. RelatedProductsCarousel
```jsx
<RelatedProductsCarousel products={relatedProducts} />
```
- Show 4 related products
- Carousel navigation
- Same category products

---

## 📊 State Management

```javascript
// Quantity and variants
const [quantity, setQuantity] = useState(1);
const [selectedVariants, setSelectedVariants] = useState({
  color: product?.variants?.color?.[0]?.value || '',
  size: product?.variants?.size?.[0]?.value || '',
});

// User interactions
const [isWishlisted, setIsWishlisted] = useState(false);
const [addedToCart, setAddedToCart] = useState(false);
```

---

## 🎨 CSS Variables Used

```css
--accent-orange: #ff6b35        /* Primary actions */
--accent-red: #e63946          /* Discounts/sales */
--neutral-gray900: #1a1a1a     /* Headings */
--neutral-gray700: #666666     /* Body text */
--neutral-gray300: #eeeeee     /* Borders */
--success: #06d6a0             /* In stock */
--error: #e63946               /* Out of stock */
```

---

## 🔄 Product Data Schema

```javascript
{
  id: string,                    // Unique identifier
  slug: string,                  // URL-friendly name
  title: string,                 // Product name
  price: number,                 // Regular price
  salePrice: number | null,      // Sale price (if on sale)
  image: string,                 // Main image URL
  images: string[],              // All product images
  description: string,           // Short description
  longDescription: string,       // Detailed description
  category: string,              // Product category
  brand: string,                 // Brand name
  rating: number,                // 0-5 star rating
  reviews: number,               // Review count
  stock: number,                 // Available quantity
  features: string[],            // Key features list
  variants: {
    color: [{ name, value, available }],
    size: [{ name, value, available }]
  }
}
```

---

## 🧩 Component Integration

### Using ProductDetailsPage
```jsx
// In route file: src/app/products/[slug]/page.js
import ProductDetailsPage from '@/components/products/ProductDetailsPage';

export default function ProductPage({ params }) {
  return <ProductDetailsPage slug={params.slug} />;
}
```

### Accessing Product Data
```javascript
import { productsData, getRelatedProducts } from '@/data/products-complete';

// Find product by slug
const product = productsData.find(p => p.slug === slug);

// Get related products
const related = getRelatedProducts(product);
```

---

## 🛠️ Common Tasks

### Add New Product
1. Add object to `src/data/products-complete.js`
2. Include: id, slug, title, price, images, variants
3. Page auto-generates on next build

### Modify Product Details Display
1. Edit `src/components/products/ProductDetailsPage.jsx`
2. Change section layout, colors, or content
3. Restart dev server to see changes

### Customize Variant Options
1. Edit product in `products-complete.js`
2. Update `variants` object structure
3. VariantSelector automatically renders

### Change Related Products Logic
1. Edit `getRelatedProducts()` in `products-complete.js`
2. Modify category matching or limit
3. RelatedProductsCarousel auto-updates

---

## 📱 Responsive Behavior

| Screen | Layout | Details |
|--------|--------|---------|
| Mobile (< 640px) | Stack | Image, then details, full-width buttons |
| Tablet (640-1024px) | Stack | Adjusted spacing, responsive thumbnails |
| Desktop (1024px+) | 2 col | Image left, details right |

---

## 🎬 Interactions

### Image Gallery
```
User clicks thumbnail → selectedImageIndex updates → main image changes
```

### Variant Selection
```
User clicks option → selectedVariants[type] = value → button highlights
```

### Quantity Adjustment
```
User clicks ±  → validates against stock → quantity updates
```

### Add to Cart
```
User clicks button → setAddedToCart(true) → button shows success
→ setTimeout 2s → setAddedToCart(false) → button resets
```

---

## 🎯 Key Features

| Feature | Location | Details |
|---------|----------|---------|
| Main Image | ImageGallery | Large product display |
| Thumbnails | ImageGallery | Click to switch main |
| Title/Brand | ProductDetailsPage | Above image gallery |
| Price/Sale | ProductDetailsPage | Below title section |
| Variants | VariantSelector | Color, size selectors |
| Quantity | ProductDetailsPage | +/- buttons with input |
| Add to Cart | ProductDetailsPage | Primary CTA button |
| Wishlist | ProductDetailsPage | Heart icon toggle |
| Related | RelatedProductsCarousel | 4-item carousel |
| Shipping Info | ProductDetailsPage | 3 icons at bottom |

---

## 🔍 Error Handling

### Product Not Found
```jsx
if (!product) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <h1>Product Not Found</h1>
    </div>
  );
}
```

### Image Loading Error
- ImageComponent has fallback to default image
- No broken image displays

---

## ⚡ Performance Tips

1. **Images**: Use WebP format when possible
2. **Data**: Product data loaded at build time
3. **CSS**: Tailwind classes are purged for production
4. **Code**: Client components minimize JS bundle
5. **Caching**: Static pages cached at CDN level

---

## 🧪 Testing Checklist

- [ ] Product page loads for valid slug
- [ ] 404 page shows for invalid slug
- [ ] Images display and switch correctly
- [ ] Variants selectable and show feedback
- [ ] Quantity validated (1 to stock limit)
- [ ] Add to cart button responds
- [ ] Related products display (4 items)
- [ ] Layout responsive on mobile/tablet/desktop
- [ ] No console errors
- [ ] All icons visible (Lucide)
- [ ] Colors match design system
- [ ] Sale price shows discount badge

---

## 📚 Additional Resources

- **Tailwind CSS**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev
- **Next.js Dynamic Routes**: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
- **React Hooks**: https://react.dev/reference/react/hooks

---

## 🎓 Code Snippets

### Get All Products
```javascript
import { productsData } from '@/data/products-complete';
const allProducts = productsData;
```

### Find Product by Slug
```javascript
const product = productsData.find(p => p.slug === 'gearx-pro-helmet');
```

### Filter by Category
```javascript
const helmets = productsData.filter(p => p.category === 'Helmets');
```

### Get Discount Percentage
```javascript
const discountPercent = Math.round(
  ((product.price - product.salePrice) / product.price) * 100
);
```

### Check if On Sale
```javascript
const isOnSale = product.salePrice !== null && 
                 product.salePrice < product.price;
```

---

## 🎨 Design System

### Colors
```javascript
const colors = {
  primary: 'var(--accent-orange)',
  text: 'var(--neutral-gray900)',
  muted: 'var(--neutral-gray700)',
  border: 'var(--neutral-gray300)',
  success: 'var(--success)',
  error: 'var(--error)',
};
```

### Icons (Lucide React)
```javascript
import { 
  Heart, ShoppingCart, Truck, Shield, 
  RotateCcw, ChevronLeft, ChevronRight 
} from 'lucide-react';
```

### Typography
```javascript
// Heading
<h1 className="text-4xl font-bold">Product Title</h1>

// Price
<span className="text-3xl font-bold">BDT 10,900</span>

// Description
<p className="text-sm text-gray-700">Description text</p>
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run build && npm start
```

### Environment Variables
None required for basic functionality.

---

## ❓ FAQ

**Q: How are product pages generated?**
A: Static Site Generation (SSG) at build time using `generateStaticParams()`

**Q: Can I add more variants (like material, warranty)?**
A: Yes, edit the `variants` object in product data and VariantSelector will auto-render

**Q: How is stock validated?**
A: Quantity selector prevents values > product.stock

**Q: Where does the cart integration happen?**
A: `handleAddToCart()` function in ProductDetailsPage - ready for implementation

**Q: Can I customize the related products logic?**
A: Yes, modify `getRelatedProducts()` in `products-complete.js`

**Q: What if a product has no images?**
A: ImageGallery shows "No images available" message

**Q: Is the page SEO-friendly?**
A: Yes, dynamic metadata generated for each product page

---

## 📞 Support

For issues or questions:
1. Check the error in browser console
2. Verify product data structure matches schema
3. Ensure all images have valid URLs
4. Test with different product slugs

---

**Last Updated**: October 21, 2025
**Status**: ✅ Production Ready
