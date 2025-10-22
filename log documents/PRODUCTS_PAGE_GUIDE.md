# Products Page Implementation Guide

## Overview
Created a comprehensive products page at `/products` with advanced filtering, sorting, and pagination features.

## Files Created

### 1. **Data Files**

#### `/src/data/products-data.js`
- Comprehensive product catalog with 16+ products
- Product attributes: id, title, price, currency, image, rating, category, brand, description, createdAt
- Exports:
  - `productsData` - Array of all products
  - `categories` - List of product categories
  - `brands` - List of brands
  - `priceRanges` - Predefined price range options
  - `getPriceRange()` - Utility function to get min/max prices

**Categories:** Helmets, Riding Gear, Rain Gear, Accessories
**Brands:** GearX, LS2, AGV, MT, Shoei, HJC

### 2. **Components**

#### `/src/components/products/ProductsPage.jsx` (Main Component)
**Features:**
- Displays products in a responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- Filters products based on price range, category, and brand
- Sorts products by: newest, oldest, price ascending, price descending
- Pagination with 12 items per page
- Responsive layout with collapsible sidebar on mobile
- Shows product count and current page range

**State Management:**
- `currentPage` - Current pagination page
- `sortBy` - Current sort option
- `filterSidebarOpen` - Mobile sidebar visibility
- `filters` - Active filters (priceRange, categories, brands)

**Key Functions:**
- `filteredAndSortedProducts` - Computed products after filtering and sorting
- `handleFilterChange()` - Updates filters and resets pagination

#### `/src/components/products/FilterSidebar.jsx`
**Features:**
- Collapsible filter sections
- Expandable/collapsible categories and brands
- Min/Max price inputs
- Reset filters button
- Mobile overlay with close button
- Checkbox filters for categories and brands

**Filter Sections:**
1. **Price Range** - Min/Max input fields
2. **Category** - Checkboxes for all categories
3. **Brand** - Checkboxes for all brands

**Responsive Behavior:**
- Fixed sidebar on desktop (left side)
- Mobile drawer overlay on smaller screens
- Smooth transitions

#### `/src/components/products/Pagination.jsx`
**Features:**
- Previous/Next navigation buttons
- Page number buttons with smart ellipsis
- Shows maximum 5 page numbers
- Highlight current page
- Disabled state for edge pages

**Smart Page Display:**
- Always shows first and last page
- Shows current page ± 1 page
- Uses ellipsis (...) for gaps
- Limit to 5 visible pages

### 3. **Routes**

#### `/src/app/products/page.js`
- Route handler for `/products` path
- Exports `ProductsPage` component
- Includes metadata for SEO

## Component Hierarchy

```
/products (page.js)
├── ProductsPage (Main Component)
│   ├── Page Header
│   ├── Top Controls (Filter Button + Sort Dropdown)
│   ├── Main Layout
│   │   ├── FilterSidebar (Desktop)
│   │   ├── FilterSidebar (Mobile)
│   │   └── Products Grid
│   │       ├── ProductCard (x12 per page)
│   │       └── Pagination
│   └── Empty State (if no products)
```

## Styling

### Tailwind CSS Classes Used
- Grid layouts: `grid`, `grid-cols-1`, `md:grid-cols-2`, `lg:grid-cols-3`
- Responsive: `hidden`, `lg:block`, `lg:hidden`
- Spacing: `gap-6`, `p-6`, `mb-12`, `py-16`, `px-4`
- Effects: `rounded-lg`, `shadow-md`, `hover:bg-gray-100`, `transition-colors`
- Flexbox: `flex`, `items-center`, `justify-between`, `gap-2`

### CSS Variables Used (from globals.css)
- `--accent-orange` (#ff6b35) - Primary color
- `--neutral-gray900` (#1a1a1a) - Dark text
- `--neutral-gray700` (#666666) - Medium text
- `--neutral-white` (#ffffff) - White background

## Responsive Design

### Desktop (lg: 1024px+)
- Sidebar visible on left (fixed width: 320px)
- Product grid: 3 columns
- Full width controls visible

### Tablet (md: 768px - 1023px)
- Sidebar becomes mobile drawer
- Product grid: 2 columns
- Filter button visible in top controls

### Mobile (< 768px)
- Sidebar in overlay drawer
- Product grid: 1 column
- Filter button prominent in top controls

## Features

### 1. Filtering
- **Price Range**: Min and max inputs for price filtering
- **Category**: Multi-select checkboxes for categories
- **Brand**: Multi-select checkboxes for brands
- **Reset Button**: Clear all filters at once

### 2. Sorting
- **Newest First**: Sort by creation date (most recent)
- **Oldest First**: Sort by creation date (oldest)
- **Price Low to High**: Ascending price order
- **Price High to Low**: Descending price order

### 3. Pagination
- 12 items per page
- Smart page number display
- Previous/Next navigation
- Current page highlighting
- Page count display at bottom

### 4. Product Display
- Uses existing `ProductCard` component
- Displays product image, title, and price
- Link to product details page

### 5. Empty State
- Shows message when no products match filters
- "Clear Filters" button to reset
- Helpful guidance for users

## Data Structure

### Product Object
```javascript
{
  id: "helmet-001",
  title: "GearX Pro Helmet",
  price: 12500.0,
  currency: "BDT",
  image: "/images/products/helmet1.jpg",
  rating: 4.8,
  category: "Helmets",
  brand: "GearX",
  description: "Premium professional helmet with advanced safety features",
  createdAt: new Date("2025-10-01"),
}
```

## Usage

### Accessing the Products Page
```
http://localhost:3000/products
```

### URL Structure
```
/products
```

The page will automatically:
- Load all products from `products-data.js`
- Initialize filters with default values
- Display products paginated (12 per page)
- Apply filters and sorting as selected

## Future Enhancements

1. **URL Query Parameters** - Persist filters in URL (e.g., `/products?category=Helmets&price_max=10000`)
2. **Search Functionality** - Add search bar to find products by name
3. **View Options** - Grid/List view toggle
4. **Saved Filters** - LocalStorage to save filter preferences
5. **Product Details Page** - Detailed product page at `/products/[id]`
6. **Reviews & Ratings** - Display product reviews
7. **Wishlist** - Add to wishlist functionality
8. **Quick View** - Modal preview of products
9. **Related Products** - Show similar products
10. **Stock Status** - Show availability

## Performance Considerations

- Used `useMemo` to optimize filter and sort calculations
- Pagination limits DOM nodes (12 items per page)
- Mobile sidebar uses fixed positioning for smooth animations
- CSS variables enable theme changes without component updates

## Accessibility

- Semantic HTML structure
- Checkbox labels properly associated
- Color contrast meets WCAG standards
- Keyboard navigation support
- Screen reader friendly

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes
