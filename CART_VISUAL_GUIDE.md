# 🛒 Cart Page - Visual Guide & Features

## 📱 Responsive Layouts

### Desktop View (1024px+)
```
┌─────────────────────────────────────────────┐
│         Shopping Cart (4 items)             │
├──────────────────────────────┬──────────────┤
│                              │              │
│  [CartItem 1]               │  Order       │
│  ┌──────────────────────┐   │  Summary     │
│  │ IMG │ Title          │   │  ┌────────┐  │
│  │     │ Attr           │   │  │Subtotal│  │
│  │     │ Price          │   │  │Savings │  │
│  │     │ Qty [-1 2 +1]  │   │  │ Shipping│  │
│  └──────────────────────┘   │  │Tax     │  │
│                              │  │─────── │  │
│  [CartItem 2]               │  │Grand   │  │
│  [CartItem 3]               │  │Total   │  │
│  [CartItem 4]               │  │[CTABtn]│  │
│                              │  └────────┘  │
│                              │  [ClearBtn] │
│                              │              │
└──────────────────────────────┴──────────────┘
```

### Mobile View (<768px)
```
┌──────────────────────────┐
│  Shopping Cart           │
│  (4 items in cart)       │
├──────────────────────────┤
│ [CartItem 1]             │
│ ┌────────┐               │
│ │  IMG   │ Title         │
│ └────────┘ Attr          │
│ Price │ Qty │ Total │ X  │
│────────────────────────── │
│ [CartItem 2]             │
│────────────────────────── │
│ [CartItem 3]             │
│────────────────────────── │
│                          │
│ Order Summary (Sticky)   │
│ ┌────────────────────┐   │
│ │Subtotal   $1,144  │   │
│ │Savings      -$140 │   │
│ │Shipping      FREE │   │
│ │Tax          $114  │   │
│ │────────────────── │   │
│ │TOTAL      $1,259  │   │
│ │  [Checkout Btn]   │   │
│ │  [Clear Cart Btn] │   │
│ └────────────────────┘   │
└──────────────────────────┘
```

---

## 🎨 Cart Item Component

### Structure
```
┌─────────────────────────────────────────┐
│                                         │
│  ┌──────┐  Mountain Bike Pro           │
│  │      │  [Red Badge] [Medium Badge]  │
│  │ IMG  │  $499.99 <-- $599.99 Save$100
│  │      │                              │
│  │      │  [-] 2 [+]    Line: $999.98  │
│  └──────┘                          [×] │
│                                         │
└─────────────────────────────────────────┘
```

### Features
- ✅ Product image with rounded corners
- ✅ Title and variant badges
- ✅ Price with strike-through original
- ✅ Savings badge (if on sale)
- ✅ Quantity controls with +/- buttons
- ✅ Line total (Qty × Price)
- ✅ Remove button (trash icon)
- ✅ Out of stock badge (if applicable)
- ✅ Smooth fade animation on removal

---

## 💰 Order Summary Sidebar

### Components
```
┌──────────────────────────────┐
│  🛒 Order Summary            │
├──────────────────────────────┤
│ Subtotal (4 items)   $1,144  │
│                              │
│ ┌──────────────────────────┐ │
│ │ Total Savings    -$140   │ │ (green)
│ └──────────────────────────┘ │
│                              │
│ Shipping              FREE   │
│ Tax                   $114   │
│ ────────────────────────────  │
│ Grand Total        $1,259.43 │ (bold, large)
├──────────────────────────────┤
│  PROCEED TO CHECKOUT         │ (primary)
│  CLEAR CART                  │ (secondary)
├──────────────────────────────┤
│ Free shipping on orders >$50 │
└──────────────────────────────┘
```

### Behavior
- ✅ Sticky on desktop (stays visible while scrolling)
- ✅ Real-time updates (watches Redux cart)
- ✅ Calculations: Subtotal, Savings, Tax
- ✅ Clear cart with confirmation dialog
- ✅ Smooth color transitions on hover

---

## 📦 Empty Cart State

```
┌─────────────────────────────┐
│                             │
│        🛒 (large icon)      │
│                             │
│   Your cart is empty        │
│                             │
│  Looks like you haven't     │
│  added anything yet.        │
│  Start shopping now!        │
│                             │
│  [Continue Shopping Btn]    │
│                             │
└─────────────────────────────┘
```

---

## 🎯 Header Mini Cart (MiniCart Component)

```
Header:
┌─────────────────────────────────┐
│ Logo    Search   User  🛒  |    │  <- Mini cart with badge
│                          [4]    │     (badge shows item count)
└─────────────────────────────────┘
```

### Features
- ✅ Shopping cart icon
- ✅ Red badge with item count
- ✅ Links to `/cart` page
- ✅ Updates in real-time from Redux

---

## 🔄 Data Flow

### Adding to Cart
```
Product Page
    ↓
[Add to Cart Button]
    ↓
dispatch(addToCart({...}))
    ↓
Redux cartSlice
    ↓
Cart Page Updates
    ↓
CartSummary Recalculates
```

### Quantity Update
```
[+] or [-] Button
    ↓
dispatch(updateQuantity({...}))
    ↓
Redux updates item.quantity
    ↓
Redux recalculates item.total
    ↓
CartSummary recalculates
    ↓
Page re-renders
```

### Remove Item
```
[Trash Icon]
    ↓
dispatch(removeFromCart(itemId))
    ↓
Fade out animation (300ms)
    ↓
Redux removes from items array
    ↓
Page re-renders
    ↓
CartSummary updates
```

---

## 🎨 Color Palette

| Element | Color | Tailwind Class |
|---------|-------|-----------------|
| Background | Light Gray | `bg-gray-50` |
| Cards | White | `bg-white` |
| Text (Primary) | Dark Gray | `text-gray-900` |
| Text (Secondary) | Gray | `text-gray-600` |
| Borders | Light Gray | `border-gray-200` |
| Primary Button | Orange | `bg-orange-600` |
| Primary Hover | Dark Orange | `bg-orange-700` |
| Secondary Button | Gray | `bg-gray-200` |
| Danger/Remove | Red | `text-red-600` |
| Savings Badge | Green | `bg-green-100` text-green-700` |
| Sale Badge | Red | `bg-red-100` text-red-700` |

---

## ✨ Animations

### Item Removal
```
Initial State:   opacity-100, scale-100
Removing:        opacity-0, scale-95 (300ms)
Final State:     Item removed from DOM
```

### Button Interactions
```
Hover:          bg-color changes, smooth transition
Disabled:       opacity-50, cursor-not-allowed
Active:         slight color deepening
```

---

## 📊 Calculations

### Subtotal
```
Subtotal = SUM(item.total for each item)
         = SUM(quantity × sale_price/price)
```

### Savings
```
Savings = SUM((price - sale_price) × quantity)
        = Original Total - Subtotal
```

### Tax (10%)
```
Tax = Subtotal × 0.10
```

### Grand Total
```
Grand Total = Subtotal + Tax + Shipping
            = Subtotal × 1.10  (since Shipping is FREE)
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 768px | Single column, full width |
| Tablet | 768px - 1024px | Single column |
| Desktop | > 1024px | Two column (70/30) |

---

## 🎯 Interactive Elements

### Quantity Controls
- **[-] Button** - Decreases quantity by 1 (min: 1)
- **Quantity Display** - Shows current quantity (non-editable display)
- **[+] Button** - Increases quantity by 1

### Action Buttons
- **Proceed to Checkout** - Full width, primary color
- **Clear Cart** - Full width, secondary/outlined style
- **Remove Item** - Icon only, red on hover

### Links
- **Continue Shopping** - From empty cart state, links to `/products`
- **Mini Cart Icon** - From header, links to `/cart`

---

## 🔐 State Management

```javascript
// Redux State
{
  cart: {
    items: [
      {
        id: 1,
        variant: { /* product info */ },
        quantity: 2,
        total: 999.98
      },
      // ... more items
    ]
  }
}

// Selectors
items = useSelector(state => state.cart.items)
totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
```

---

## 🚀 Performance Optimizations

✅ **Memoization** - Components re-render only when props change
✅ **Selector Memoization** - Redux selectors are optimized
✅ **Lazy Loading** - Images lazy load
✅ **Smooth Animations** - GPU-accelerated transitions
✅ **Sticky Positioning** - No layout shift on scroll

---

## 🎓 Learning Resources

- Tailwind CSS: https://tailwindcss.com/
- Redux Toolkit: https://redux-toolkit.js.org/
- Next.js App Router: https://nextjs.org/docs/app
- Lucide Icons: https://lucide.dev/

---

## 💻 Browser Support

✅ Chrome/Chromium (v90+)
✅ Firefox (v88+)
✅ Safari (v14+)
✅ Edge (v90+)
✅ Mobile browsers

---

**The cart page is production-ready! 🎉**
