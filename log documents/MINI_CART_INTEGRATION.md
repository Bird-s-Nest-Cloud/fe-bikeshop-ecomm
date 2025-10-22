# 🔗 Integration: Add Mini Cart to Header

## Overview
The `MiniCart` component displays a shopping cart icon with a badge showing the total number of items in the cart. This guide shows how to integrate it into your header.

---

## 📍 MiniCart Component Location
```
src/components/cart/MiniCart.jsx
```

---

## 🚀 How to Add to Header

### Step 1: Import the Component
In your `Header.jsx` file, add this import:

```jsx
import MiniCart from '@/components/cart/MiniCart';
```

### Step 2: Add to Header JSX
Place the `<MiniCart />` component in your header where you want the cart icon to appear (typically in the top right area with other user icons).

**Example:**
```jsx
<header className="bg-white border-b border-gray-200">
  <div className="flex justify-between items-center px-6 py-4">
    <h1>Your Logo</h1>
    
    <nav>
      {/* Navigation links */}
    </nav>
    
    <div className="flex items-center gap-4">
      {/* User profile icon, notifications, etc. */}
      
      {/* Add MiniCart here */}
      <MiniCart />
    </div>
  </div>
</header>
```

---

## 🎨 Component Features

### Display
- **Shopping Cart Icon** - From lucide-react
- **Item Badge** - Red badge showing total quantity
- **Clickable** - Links directly to `/cart` page

### Behavior
- **Real-time Updates** - Badge updates immediately when cart changes
- **No Items** - Badge is hidden when cart is empty
- **Responsive** - Works on all screen sizes

---

## 📦 What it Looks Like

### With Items
```
🛒
 4
```
(Cart icon with red "4" badge)

### Empty Cart
```
🛒
```
(Cart icon without badge)

---

## 🔧 Redux Integration

The MiniCart automatically connects to Redux:

```jsx
// Inside MiniCart.jsx
const items = useSelector((state) => state.cart.items);
const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
```

No additional configuration needed! It automatically updates when:
- Items are added to cart
- Quantities are changed
- Items are removed
- Cart is cleared

---

## 💡 Tips & Variations

### Variation 1: Add Text Label
```jsx
<div className="flex items-center gap-2">
  <MiniCart />
  <span className="text-sm">Cart</span>
</div>
```

### Variation 2: Custom Styling
```jsx
<div className="flex items-center gap-4 p-4 hover:bg-gray-100 rounded-lg">
  <MiniCart />
</div>
```

### Variation 3: With Dropdown Menu
```jsx
<div className="relative group">
  <MiniCart />
  {/* Dropdown menu goes here */}
</div>
```

---

## 🧪 Testing

To verify MiniCart is working:

1. **Navigate to Header** - Should see cart icon
2. **No Items** - Badge should not show
3. **Go to `/cart`** - Add/remove items
4. **Return to Home** - Badge should show updated count
5. **Change Quantity** - Badge updates in real-time
6. **Clear Cart** - Badge disappears

---

## 🔐 Redux Store

Ensure Redux store is properly configured:

```javascript
// src/redux/store.js
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,  // ← Cart reducer must be here
    // ... other reducers
  },
});
```

✅ Already configured in your project!

---

## 📱 Responsive Behavior

The MiniCart component is fully responsive:

| Screen | Display |
|--------|---------|
| Mobile | Icon + badge (compact) |
| Tablet | Icon + badge (compact) |
| Desktop | Icon + badge (comfortable spacing) |

---

## 🎯 Complete Header Example

```jsx
'use client';

import Link from 'next/link';
import { Search, User, Menu } from 'lucide-react';
import MiniCart from '@/components/cart/MiniCart';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-orange-600">
            BikeShop
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link href="/products" className="hover:text-orange-600">Products</Link>
            <Link href="/about" className="hover:text-orange-600">About</Link>
            <Link href="/contact" className="hover:text-orange-600">Contact</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Search className="w-5 h-5" />
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <User className="w-5 h-5" />
            </button>
            
            {/* Mini Cart - HERE */}
            <MiniCart />
            
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
```

---

## ✨ Features Summary

| Feature | Status |
|---------|--------|
| Cart icon display | ✅ |
| Item count badge | ✅ |
| Real-time updates | ✅ |
| Redux integration | ✅ |
| Links to cart page | ✅ |
| Responsive design | ✅ |
| Hover effects | ✅ |
| Empty state handling | ✅ |

---

## 🚀 Next Steps

1. **Add to Header** - Integrate MiniCart component
2. **Style Header** - Add custom styling as needed
3. **Test** - Verify cart updates work
4. **Add to Products** - Create "Add to Cart" buttons

---

## 📝 Notes

- ✅ MiniCart uses Redux `useSelector` - automatic updates
- ✅ No prop drilling needed
- ✅ Fully Tailwind styled
- ✅ Icons from lucide-react
- ✅ Responsive on all devices

---

**Ready to integrate! 🎉**
