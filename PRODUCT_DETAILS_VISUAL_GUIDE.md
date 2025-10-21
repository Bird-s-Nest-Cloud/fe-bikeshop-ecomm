# Product Details Page - Visual Guide & Implementation Map

## 🗺️ Complete Implementation Map

```
GearX Bike Shop Frontend
│
├── 📍 Home Page (/)
│   └── Links to Products
│
├── 📍 Products Listing (/products)
│   ├── Filter Sidebar (Price, Category, Brand)
│   ├── Sort Dropdown
│   ├── Product Grid (ProductCard × N)
│   │   └── Each ProductCard links to...
│   └── Pagination
│
├── 📍 Product Details (/products/[slug])  ← YOU ARE HERE
│   ├── 🖼️  Image Gallery
│   │   ├── Main Image (600×600)
│   │   └── Thumbnails (4+ images)
│   ├── 📝 Product Info
│   │   ├── Title, Brand, Price
│   │   ├── Description
│   │   ├── Rating & Reviews
│   │   └── Stock Status
│   ├── 🎨 Variant Selector
│   │   ├── Color Options
│   │   ├── Size Options
│   │   └── Other Attributes
│   ├── 🛒 Add to Cart Section
│   │   ├── Quantity Selector
│   │   ├── Add to Cart Button
│   │   ├── Buy Now Button
│   │   └── Wishlist Button
│   ├── 📦 Trust Signals
│   │   ├── Free Shipping
│   │   ├── Secure Payment
│   │   └── Easy Returns
│   ├── 📄 Product Details
│   │   ├── Full Description
│   │   └── Features List
│   └── 🎠 Related Products Carousel
│       └── ProductCard × 4 (same category)
│
└── 📍 Cart (/cart) & Checkout
    └── Destination when "Add to Cart" clicked
```

---

## 🎨 Visual Layout

### Desktop View (1024px+)

```
┌────────────────────────────────────────────────────────────────┐
│                         HEADER / NAV                            │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🔗 Products > Product Name                                     │
│                                                                  │
│  ┌──────────────────────┬──────────────────────────────────┐   │
│  │                      │                                  │   │
│  │   MAIN IMAGE         │  GearX Pro Helmet               │   │
│  │   (600×600)          │  ⭐⭐⭐⭐⭐ 4.8 (48)              │   │
│  │                      │                                  │   │
│  │                      │  BDT 10,900  ≈ BDT 12,500      │   │
│  │                      │  [Save 15%]                     │   │
│  │                      │                                  │   │
│  │                      │  Premium helmet with...         │   │
│  │                      │                                  │   │
│  ├─────────────┬────────┤  ✓ In Stock (24 available)     │   │
│  │[IMG1][IMG2] │ [IMG3] │                                  │   │
│  │[IMG4]       │        │  Select Color:                  │   │
│  │             │        │  [Black][White][Red][Blue×]    │   │
│  │ (Thumbnails)│        │                                  │   │
│  │             │        │  Select Size:                   │   │
│  │             │        │  [S][M][L×][XL]                │   │
│  │             │        │                                  │   │
│  └─────────────┴────────┤  [−] [1] [+]                    │   │
│                         │  [Add to Cart >>]              │   │
│                         │  [Buy Now]                      │   │
│                         │                                  │   │
│                         │  🚚 Free Shipping  🔒 Secure   │   │
│                         │  ↻ Easy Returns                 │   │
│                         │                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PRODUCT DETAILS                          PRODUCT INFO         │
│  ═══════════════════                       ═════════════        │
│                                                                  │
│  Full Description...                       Category: Helmets    │
│  ─────────────────────────                 Brand: GearX        │
│  Features:                                 SKU: helmet-001      │
│  • Feature 1                               Availability:       │
│  • Feature 2                               24 in stock         │
│  • Feature 3                                                    │
│                                                                  │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  RELATED PRODUCTS                                               │
│  ◄ [Card1][Card2][Card3][Card4] ►                             │
│                                                                  │
├────────────────────────────────────────────────────────────────┤
│                         FOOTER                                  │
└────────────────────────────────────────────────────────────────┘
```

### Tablet View (640-1024px)

```
┌────────────────────────────────────────┐
│         HEADER / NAV (Compressed)      │
├────────────────────────────────────────┤
│                                        │
│  🔗 Products > Product Name            │
│                                        │
│  ┌────────────────────────────────┐   │
│  │        MAIN IMAGE              │   │
│  │        (responsive)            │   │
│  └────────────────────────────────┘   │
│                                        │
│  [Thumb1][Thumb2][Thumb3]            │
│                                        │
│  ┌────────────────────────────────┐   │
│  │  Product Details               │   │
│  │  Title, Price, Description     │   │
│  │  Variants, Quantity, Add Cart  │   │
│  └────────────────────────────────┘   │
│                                        │
│  [Trust Signals in 3 rows]            │
│                                        │
│  ┌────────────────────────────────┐   │
│  │  Product Info / Features       │   │
│  └────────────────────────────────┘   │
│                                        │
│  ┌────────────────────────────────┐   │
│  │  Related Products (2 per row)  │   │
│  │  [Card1][Card2]                │   │
│  │  [Card3][Card4]                │   │
│  └────────────────────────────────┘   │
│                                        │
├────────────────────────────────────────┤
│         FOOTER                         │
└────────────────────────────────────────┘
```

### Mobile View (< 640px)

```
┌──────────────────────┐
│      HEADER          │
├──────────────────────┤
│                      │
│ 🔗 Products > Name   │
│                      │
│ ┌────────────────┐   │
│ │  MAIN IMAGE    │   │
│ │  (full width)  │   │
│ └────────────────┘   │
│                      │
│ [T1][T2][T3] >>>   │
│ (scrollable)        │
│                      │
│ GearX Pro Helmet    │
│                      │
│ ⭐⭐⭐⭐⭐ 4.8        │
│                      │
│ BDT 10,900          │
│ BDT 12,500          │
│ [Save 15%]          │
│                      │
│ Premium helmet...   │
│                      │
│ ✓ In Stock (24)     │
│                      │
│ ┌────────────────┐   │
│ │ Select Color   │   │
│ │ [B][W][R][Bl×] │   │
│ └────────────────┘   │
│                      │
│ ┌────────────────┐   │
│ │ Select Size    │   │
│ │ [S][M][L][XL]  │   │
│ └────────────────┘   │
│                      │
│ [−] [1] [+]        │
│                      │
│ [Add to Cart]      │
│ [Buy Now]          │
│                      │
│ 🚚 Free Shipping   │
│ 🔒 Secure Payment  │
│ ↻ Easy Returns     │
│                      │
│ PRODUCT DETAILS    │
│ ───────────────    │
│ Full Description   │
│                      │
│ Features:          │
│ • Feature 1        │
│ • Feature 2        │
│                      │
│ RELATED PRODUCTS   │
│ [Card1]            │
│ [Card2]            │
│ [Card3]            │
│ [Card4]            │
│                      │
├──────────────────────┤
│      FOOTER          │
└──────────────────────┘
```

---

## 📊 Component Hierarchy

```
ProductDetailsPage
├── Breadcrumb Navigation
│   └── Link to /products
│
├── Main Product Section (Grid: 2 col → 1 col)
│   │
│   ├── LEFT: ImageGallery
│   │   ├── Main Image (using ImageComponent)
│   │   └── Thumbnail Grid
│   │       └── ImageComponent × N
│   │
│   └── RIGHT: Product Details
│       ├── Product Header
│       │   ├── Brand Name
│       │   ├── Product Title
│       │   └── Wishlist Button (Heart)
│       │
│       ├── Rating Section
│       │   ├── Stars (SVG × 5)
│       │   └── Review Text
│       │
│       ├── Pricing
│       │   ├── Sale Price (primary)
│       │   ├── Regular Price (strikethrough)
│       │   └── Discount Badge
│       │
│       ├── Description
│       │   └── Short text
│       │
│       ├── Stock Status
│       │   └── Conditional display
│       │
│       ├── VariantSelector
│       │   ├── Color Options
│       │   └── Size Options
│       │
│       ├── Quantity & Actions
│       │   ├── Quantity Input (−, input, +)
│       │   ├── Add to Cart Button
│       │   └── Buy Now Button
│       │
│       └── Trust Signals (3-col grid)
│           ├── Truck Icon
│           ├── Shield Icon
│           └── RotateCcw Icon
│
├── Product Details Section
│   ├── Description & Features (2 col)
│   │   ├── Long Description
│   │   └── Features List
│   │
│   └── Product Info (1 col sidebar)
│       ├── Category
│       ├── Brand
│       ├── SKU
│       └── Availability
│
└── RelatedProductsCarousel
    ├── Section Title
    ├── Carousel Grid (4 col → 2 col → 1 col)
    │   └── ProductCard × 4
    ├── Navigation Buttons
    └── Indicator Dots
```

---

## 🔄 Data Flow Diagram

```
User navigates to /products/gearx-pro-helmet
         ↓
   Route matches [slug]
         ↓
  generateStaticParams()
  (Build time)
         ↓
  generateMetadata()
  (SEO metadata)
         ↓
  ProductDetailsPage({ slug })
         ↓
  useMemo:
  product = productsData.find(p => p.slug === slug)
         ↓
  State Initialize:
  ├── quantity = 1
  ├── selectedVariants = {color, size}
  ├── isWishlisted = false
  └── addedToCart = false
         ↓
  Render Components:
  ├── ImageGallery(images)
  ├── VariantSelector(variants)
  ├── Quantity Input
  ├── Add to Cart Button
  ├── RelatedProductsCarousel(related)
  └── Product Info Display
         ↓
  Page Ready for Interaction
         ↓
  User Interactions:
  ├── Click Thumbnail → Update Main Image
  ├── Click Variant → Update Selected Variant
  ├── Click +/- → Update Quantity
  ├── Click Heart → Toggle Wishlist
  ├── Click "Add to Cart" → Show Feedback
  └── Click Related → Navigate to /products/[other-slug]
```

---

## 🎯 Feature Map

```
Product Details Page Features
│
├── 📷 IMAGE GALLERY
│   ├── Main image display (600×600)
│   ├── Multiple thumbnail images
│   ├── Click thumbnail to switch
│   ├── Responsive thumbnail layout
│   └── Image fallback handling
│
├── 📝 PRODUCT INFORMATION
│   ├── Product title (4xl bold)
│   ├── Brand name (orange)
│   ├── Star rating (5 stars)
│   ├── Review count
│   ├── Short description
│   ├── Long detailed description
│   ├── Key features list
│   └── Breadcrumb navigation
│
├── 💰 PRICING
│   ├── Regular price (BDT)
│   ├── Sale price (if on sale)
│   ├── Strikethrough original
│   ├── Discount badge (Save X%)
│   └── Currency display
│
├── 📦 STOCK & AVAILABILITY
│   ├── In stock indicator
│   ├── Available quantity
│   ├── Out of stock message
│   ├── Stock validation
│   └── Quantity limit enforcement
│
├── 🎨 VARIANT SELECTION
│   ├── Color options (with name/value)
│   ├── Size options (with name/value)
│   ├── Other attribute options
│   ├── Out-of-stock variant disabling
│   ├── Visual selection feedback
│   └── Orange highlight on select
│
├── 🛒 ADD TO CART FLOW
│   ├── Quantity selector (±)
│   ├── Manual quantity input
│   ├── Min/max validation
│   ├── Add to Cart button
│   ├── Visual feedback (2s)
│   ├── Buy Now button
│   └── Disabled state when out of stock
│
├── ❤️  WISHLIST
│   ├── Heart toggle button
│   ├── Fill/empty states
│   ├── Orange highlight when wishlisted
│   └── Session-based state
│
├── 🚚 TRUST SIGNALS
│   ├── Free shipping (truck icon)
│   ├── Secure payment (shield icon)
│   ├── Easy returns (rotate icon)
│   └── All using Lucide React icons
│
├── 📄 ADDITIONAL INFO
│   ├── Category display
│   ├── Brand name
│   ├── SKU/Product ID
│   ├── Availability status
│   └── Gray background box
│
└── 🎠 RELATED PRODUCTS
    ├── Same category carousel
    ├── 4 product cards displayed
    ├── Previous/next navigation
    ├── Indicator dots
    ├── Responsive grid (4-2-1)
    ├── ProductCard components
    └── Click → Navigate to product
```

---

## 🎨 Color & Style Map

```
COLORS (All CSS Variables)
├── Primary Actions
│   └── --accent-orange (#ff6b35)
│
├── Discount/Alert
│   └── --accent-red (#e63946)
│
├── Success/In Stock
│   └── --success (#06d6a0)
│
├── Error/Out of Stock
│   └── --error (#e63946)
│
├── Text Colors
│   ├── --neutral-gray900 (headings)
│   ├── --neutral-gray700 (body)
│   ├── --neutral-gray600 (secondary)
│   └── --neutral-gray300 (borders)
│
├── Backgrounds
│   ├── --neutral-white (main)
│   └── --neutral-gray300 (boxes)
│
└── Shadows
    ├── --shadow-md (cards)
    └── --shadow-lg (dropdowns)

TYPOGRAPHY
├── Headings
│   ├── Product Title: 4xl bold
│   ├── Section Title: 2xl bold
│   ├── Label: sm semibold
│   └── Brand: sm semibold
│
└── Text
    ├── Body: base regular
    ├── Secondary: sm regular
    └── Caption: xs regular

SPACING
├── Container Padding: px-4 md:px-6 lg:px-12
├── Section Gap: gap-12 or gap-8
├── Component Gap: gap-4 or gap-6
├── Button Padding: py-3 px-6
└── Grid Gap: gap-6

BORDERS & RADIUS
├── Card Border: rounded-lg
├── Input Border: rounded-lg
├── Button Border: rounded-lg
├── Border Color: gray-300
└── Border Width: border (1px)

TRANSITIONS
├── Hover Effects: transition-all (300ms)
├── Color Changes: transition-colors (200ms)
├── Scale Changes: transition-transform (200ms)
└── Opacity: transition-opacity (150ms)
```

---

## 🔌 Integration Points

```
INTERNAL COMPONENTS
├── ImageComponent (/shared)
│   └── Used by: ImageGallery, ProductCard
│
├── ProductCard (/components)
│   └── Used by: RelatedProductsCarousel
│
└── ImageGallery, VariantSelector
    └── Used by: ProductDetailsPage

EXTERNAL DATA
├── productsData (products-complete.js)
│   ├── Product lookup by slug
│   └── Related products fetching
│
└── getRelatedProducts(product)
    └── Filters same category products

LUCIDE ICONS
├── Heart (wishlist)
├── ShoppingCart (add to cart)
├── Truck (shipping)
├── Shield (security)
├── RotateCcw (returns)
├── ChevronLeft (carousel prev)
└── ChevronRight (carousel next)

NEXT.JS FEATURES
├── Dynamic Routes ([slug])
├── Static Generation (generateStaticParams)
├── Dynamic Metadata (generateMetadata)
├── Link Component (navigation)
└── Image Optimization (via ImageComponent)

TAILWIND CSS
├── Responsive Prefixes (sm:, md:, lg:)
├── Hover States (hover:)
├── Transitions (transition-all)
├── Grid System (grid, grid-cols)
└── Spacing Utilities (gap, p, m)
```

---

## 📱 Responsive Adaptation

```
MOBILE (320px-639px)
├── 1-column layout
├── Full-width images
├── Stacked components
├── Large touch targets (48px+)
├── Scrollable thumbnail gallery
├── Simplified navigation
└── Vertical product cards

TABLET (640px-1023px)
├── 1-column main content
├── 2-column related products
├── Optimized spacing
├── Medium text sizes
├── Balanced padding
└── Touch-friendly buttons

DESKTOP (1024px+)
├── 2-column main section
│   ├── Left: Image gallery
│   └── Right: Product details
├── 4-column related products
├── Max-width constraint (1280px)
├── Generous whitespace
├── Hover effects enabled
└── Large touch targets optional

ULTRA-WIDE (1440px+)
├── Max-width enforced (1280px)
├── Centered on screen
├── Lateral margins
└── Same desktop layout
```

---

## 🎯 State Management Map

```
Component State (React Hooks)

quantity: number
├── Default: 1
├── Min: 1
├── Max: product.stock
└── Updated by: +/- buttons, input

selectedVariants: object
├── color: string (variant value)
├── size: string (variant value)
├── Default: first option of each type
└── Updated by: variant button clicks

isWishlisted: boolean
├── Default: false
├── Visual: heart fills with orange
└── Updated by: heart button toggle

addedToCart: boolean
├── Default: false
├── Shows: "Added to Cart!" message
├── Duration: 2 seconds
└── Updated by: Add to Cart button
```

---

## 🚀 Performance Optimization

```
BUILD TIME
├── Static generation of all product pages
├── Pre-computed metadata for SEO
├── CSS purging for production
└── Image format optimization

RUNTIME
├── CDN delivery of pre-built pages
├── Lazy loading of thumbnail images
├── Minimal JavaScript bundle
└── Efficient state updates

OPTIMIZATION TECHNIQUES
├── Image compression (WebP)
├── CSS minimification
├── Tree-shaking unused code
├── Code splitting by route
└── Browser caching with headers
```

---

## 📊 Testing Coverage Map

```
FUNCTIONALITY
├── Image gallery switching ✅
├── Variant selection ✅
├── Quantity validation ✅
├── Add to cart flow ✅
├── Wishlist toggle ✅
├── Related products ✅
└── Navigation ✅

RESPONSIVE
├── Mobile layout ✅
├── Tablet layout ✅
├── Desktop layout ✅
├── Image scaling ✅
├── Text readability ✅
└── Touch targets ✅

DESIGN SYSTEM
├── Color usage ✅
├── Typography ✅
├── Icon rendering ✅
├── Spacing ✅
├── Transitions ✅
└── Shadows ✅

PERFORMANCE
├── Page load time ✅
├── Lighthouse score ✅
├── Core Web Vitals ✅
├── Image optimization ✅
└── CSS efficiency ✅

BROWSER SUPPORT
├── Chrome ✅
├── Firefox ✅
├── Safari ✅
├── iOS Safari ✅
└── Android Chrome ✅
```

---

## 🎓 Key Information Density

| Section | Importance | Content Type | Audience |
|---------|-----------|--------------|----------|
| Image Gallery | Critical | UI Component | Users, Devs |
| Product Info | Critical | Display | Users |
| Variant Selector | High | Interaction | Users, Devs |
| Add to Cart | Critical | Action | Users |
| Related Products | Medium | Discovery | Users |
| Trust Signals | Medium | Assurance | Users |
| Product Details | Low | Reference | Users, Buyers |

---

**Created**: October 21, 2025
**Version**: 1.0
**Status**: ✅ Complete and Production-Ready
