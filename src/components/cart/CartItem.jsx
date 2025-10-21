'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '@/redux/slices/cartSlice';
import { Trash2, Minus, Plus } from 'lucide-react';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  const price = item.variant.sale_price || item.variant.price;
  const originalPrice = item.variant.price;
  const hasSalePrice = item.variant.sale_price && item.variant.sale_price < item.variant.price;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ itemId: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      dispatch(removeFromCart(item.id));
    }, 300);
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="shrink-0 w-full md:w-32 h-32">
            <img
              src={item.variant.product.primary_image}
              alt={item.variant.product.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.variant.product.title}
              </h3>

              {/* Attributes */}
              <div className="flex flex-wrap gap-2 mb-3">
                {Object.entries(item.variant.attributes).map(([key, value]) => (
                  <span
                    key={key}
                    className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                  >
                    {key}: {value}
                  </span>
                ))}
              </div>

              {/* Stock Status */}
              {!item.variant.is_available && (
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full mb-3">
                  Out of Stock
                </span>
              )}

              {/* Prices */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-gray-900">
                  ${price.toFixed(2)}
                </span>
                {hasSalePrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                      Save ${(originalPrice - price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Quantity and Remove */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={!item.variant.is_available}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="w-12 text-center font-semibold text-gray-900">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={!item.variant.is_available}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600">Line Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${item.total.toFixed(2)}
                </p>
              </div>

              <button
                onClick={handleRemove}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
