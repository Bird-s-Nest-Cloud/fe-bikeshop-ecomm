import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      variant: {
        id: 'v1',
        product: {
          id: 'p1',
          title: 'Mountain Bike Pro',
          primary_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
        },
        attributes: { color: 'Red', size: 'Medium' },
        price: 599.99,
        sale_price: 499.99,
        is_available: true,
      },
      quantity: 2,
      total: 999.98,
    },
    {
      id: 2,
      variant: {
        id: 'v2',
        product: {
          id: 'p2',
          title: 'Bike Helmet Safety Plus',
          primary_image: 'https://images.unsplash.com/photo-1578496781457-a4b3b0e60b6a?w=500&h=500&fit=crop',
        },
        attributes: { color: 'Black', size: 'Large' },
        price: 89.99,
        sale_price: 69.99,
        is_available: true,
      },
      quantity: 1,
      total: 69.99,
    },
    {
      id: 3,
      variant: {
        id: 'v3',
        product: {
          id: 'p3',
          title: 'Bike Chain Lubricant',
          primary_image: 'https://images.unsplash.com/photo-1559163499-fe8d86f76b23?w=500&h=500&fit=crop',
        },
        attributes: { type: 'Synthetic', volume: '500ml' },
        price: 24.99,
        sale_price: null,
        is_available: true,
      },
      quantity: 3,
      total: 74.97,
    },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { variant, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.variant.id === variant.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total = existingItem.quantity * (variant.sale_price || variant.price);
      } else {
        state.items.push({
          id: Date.now(),
          variant,
          quantity,
          total: quantity * (variant.sale_price || variant.price),
        });
      }
    },

    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === itemId);

      if (item && quantity > 0) {
        item.quantity = quantity;
        item.total = quantity * (item.variant.sale_price || item.variant.price);
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
