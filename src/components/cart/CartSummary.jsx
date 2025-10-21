'use client';

import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '@/redux/slices/cartSlice';
import { ShoppingCart } from 'lucide-react';

export default function CartSummary() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);

  const originalTotal = items.reduce((sum, item) => {
    return sum + item.quantity * item.variant.price;
  }, 0);

  const savings = originalTotal - subtotal;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md p-8 sticky top-24 h-fit">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="w-6 h-6 text-orange-600" />
        <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
      </div>

      {/* Summary Items */}
      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>

        {/* Savings */}
        {savings > 0 && (
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span className="text-green-700 font-medium">Total Savings</span>
            <span className="font-semibold text-green-700">-${savings.toFixed(2)}</span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex justify-between items-center text-gray-600">
          <span>Shipping</span>
          <span className="font-semibold text-green-600">FREE</span>
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center text-gray-600">
          <span>Tax</span>
          <span className="font-semibold text-gray-900">${(subtotal * 0.1).toFixed(2)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-6" />

      {/* Grand Total */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Grand Total</span>
          <span className="text-3xl font-bold text-orange-600">
            ${(subtotal * 1.1).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 text-lg">
          Proceed to Checkout
        </button>
        <button
          onClick={handleClearCart}
          className="w-full bg-transparent border-2 border-red-300 text-red-600 hover:bg-red-50 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Clear Cart
        </button>
      </div>

      {/* Info */}
      <p className="text-center text-xs text-gray-500 mt-4">
        Free shipping on orders over $50
      </p>
    </div>
  );
}
