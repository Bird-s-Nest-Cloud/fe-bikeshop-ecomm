# 🎯 CART IMPLEMENTATION - QUICK REFERENCE CARD

## 📍 Access Points

| Item | Location | URL |
|------|----------|-----|
| Cart Page | `/src/app/cart/page.js` | `/cart` |
| Cart Items | `/src/components/cart/CartItem.jsx` | - |
| Cart Summary | `/src/components/cart/CartSummary.jsx` | - |
| Mini Cart | `/src/components/cart/MiniCart.jsx` | - |
| Redux Slice | `/src/redux/slices/cartSlice.js` | - |

---

## 🔧 Redux Actions

```javascript
// Add item to cart
dispatch(addToCart({ 
  variant: { id, product, attributes, price, sale_price, is_available },
  quantity: 1 
}))

// Update quantity
dispatch(updateQuantity({ itemId: 1, quantity: 5 }))

// Remove item
dispatch(removeFromCart(itemId))

// Clear all items
dispatch(clearCart())
```

---

## 🧠 Get Cart Data

```javascript
// Get all items
const items = useSelector(state => state.cart.items)

// Calculate total items
const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

// Calculate subtotal
const subtotal = items.reduce((sum, item) => sum + item.total, 0)
```

---

## 🎨 Tailwind Classes Reference

### Layout
- Grid: `grid`, `lg:grid-cols-3`, `gap-8`
- Flex: `flex`, `items-center`, `justify-between`
- Spacing: `p-6`, `gap-4`, `space-y-4`

### Styling
- Rounded: `rounded-lg`
- Borders: `border`, `border-gray-200`
- Shadows: `shadow-sm`, `hover:shadow-md`

### Colors
- Orange: `bg-orange-600`, `hover:bg-orange-700`
- Gray: `bg-gray-50`, `text-gray-900`
- Red: `text-red-600`, `border-red-300`

### Responsive
- Mobile: `block`, `md:hidden`
- Desktop: `hidden`, `lg:block`
- Grid: `lg:col-span-2`, `lg:sticky`

---

## 📱 Responsive Breakpoints

```css
Mobile    (< 768px):  Single column, full width
Tablet    (768-1024): Single column, natural flow
Desktop   (> 1024px): Two column (70/30), sticky sidebar
```

---

## 🔗 Integration Checklist

### Add to Header
```jsx
import MiniCart from '@/components/cart/MiniCart';

// In header
<MiniCart />
```

### Connect Product Pages
```jsx
import { addToCart } from '@/redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();
dispatch(addToCart({ variant: productData, quantity: 1 }))
```

### Create Checkout Flow
```jsx
import { useSelector } from 'react-redux';
const items = useSelector(state => state.cart.items)
// Use items for checkout
```

---

## 💰 Calculations

```
Subtotal = SUM(item.total)
         = SUM(quantity × sale_price/price)

Savings  = SUM((price - sale_price) × quantity)
         = Original Total - Subtotal

Tax      = Subtotal × 0.10 (10%)

Shipping = FREE

Grand Total = Subtotal × 1.1
            = Subtotal + Shipping + Tax
```

---

## 🎯 Sample Product Data

```javascript
{
  id: 1,
  variant: {
    id: 'v1',
    product: {
      id: 'p1',
      title: 'Mountain Bike Pro',
      primary_image: 'url'
    },
    attributes: { color: 'Red', size: 'Medium' },
    price: 599.99,
    sale_price: 499.99,
    is_available: true
  },
  quantity: 2,
  total: 999.98
}
```

---

## 🧪 Testing Commands

```bash
# Start dev server
npm run dev

# Build
npm run build

# Start production
npm start

# Navigate to cart
http://localhost:3000/cart
```

---

## 📚 Documentation Quick Links

| Doc | Purpose | Time |
|-----|---------|------|
| README_CART.md | Overview | 5m |
| CART_QUICK_START.md | Reference | 5m |
| CART_PAGE_GUIDE.md | Technical | 15m |
| MINI_CART_INTEGRATION.md | Header | 5m |
| CART_VISUAL_GUIDE.md | Design | 10m |
| DEVELOPER_CHECKLIST.md | Tasks | 15m |

---

## 🔥 Common Tasks

### View Cart
```
→ http://localhost:3000/cart
```

### Add Item
```javascript
dispatch(addToCart({ variant, quantity }))
```

### Change Quantity
```javascript
dispatch(updateQuantity({ itemId, quantity: 5 }))
```

### Remove Item
```javascript
dispatch(removeFromCart(itemId))
```

### Clear Cart
```javascript
dispatch(clearCart())
```

### Get Items
```javascript
const items = useSelector(state => state.cart.items)
```

---

## 🎨 Color Palette

```
Primary:     bg-orange-600, hover:bg-orange-700
Gray:        bg-gray-50, text-gray-900
Success:     bg-green-100, text-green-700
Danger:      text-red-600, border-red-300
Border:      border-gray-200
Shadow:      shadow-sm
```

---

## 📊 Component Props

### CartItem
```jsx
<CartItem item={cartItem} />
```

### CartSummary
```jsx
<CartSummary />
```

### EmptyCart
```jsx
<EmptyCart />
```

### MiniCart
```jsx
<MiniCart />
```

---

## 🚀 Quick Deploy

```bash
# Build
npm run build

# Test build
npm start

# Deploy to hosting
# (Use your hosting provider's deployment)
```

---

## ✅ Success Criteria

- [x] Visit `/cart` - see cart page
- [x] Increment quantity - works
- [x] Decrement quantity - works
- [x] Remove item - smooth animation
- [x] Clear cart - confirmation dialog
- [x] View empty state - friendly message
- [x] Mobile responsive - stacked layout
- [x] Desktop responsive - two columns
- [x] Sidebar sticky - on desktop
- [x] Badge updates - in real-time

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Cart empty | Check Redux: useSelector |
| Styles broken | Check Tailwind import |
| Items not updating | Check Redux DevTools |
| Mobile broken | Check breakpoints |
| Icons missing | Verify lucide-react |

---

## 📞 Need Help?

1. **Check** DEVELOPER_CHECKLIST.md (Troubleshooting)
2. **Review** CART_PAGE_GUIDE.md
3. **Read** DOCUMENTATION_INDEX.md
4. **Search** for relevant section

---

## 🎯 Files Summary

```
✅ CartItem.jsx         - ~120 lines
✅ CartSummary.jsx      - ~100 lines
✅ EmptyCart.jsx        - ~30 lines
✅ MiniCart.jsx         - ~30 lines
✅ cartSlice.js         - ~80 lines
✅ cart/page.js         - ~60 lines
───────────────────────
   Total              - ~420 lines
```

---

## 🎓 Quick Concepts

### Redux Flow
User Action → Dispatch → Reducer → State Update → Component Re-render

### Component Hierarchy
```
CartPage
├── CartItem (×n)
├── CartSummary (sticky)
└── EmptyCart (conditional)
```

### Responsive Design
```
Mobile    → Single column, full-width
Tablet    → Single column
Desktop   → Two columns (70/30)
```

---

## 🔐 Key Features

✅ Real-time calculations  
✅ Smooth animations  
✅ Responsive layout  
✅ Redux integrated  
✅ Sample data  
✅ Empty state  
✅ Mobile optimized  
✅ Sticky sidebar  

---

## 🎊 Status: READY!

✅ Complete  
✅ Tested  
✅ Documented  
✅ Production-Ready  

**Let's go! 🚀**

---

**Quick Reference v1.0**  
**Last Updated: October 21, 2025**  
**Status: ✅ Production Ready**
