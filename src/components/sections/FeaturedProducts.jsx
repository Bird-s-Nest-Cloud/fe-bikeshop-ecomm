'use client';

import React from 'react';
import Link from 'next/link';

/**
 * StarRating Component - Displays a 5-star rating visualization
 */
const StarRating = ({ rating = 0, size = 'small' }) => {
  const sizeMap = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5',
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={sizeMap[size]}
          fill={star <= Math.round(rating) ? '#ff6b35' : '#eeeeee'}
          stroke={star <= Math.round(rating) ? '#ff6b35' : '#dddddd'}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="text-xs text-gray-600 ml-2">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
};

/**
 * FeaturedProducts Component
 * Displays featured products in a responsive grid
 */

const FeaturedProducts = ({ productsData }) => {
  const products = productsData?.products || [];
  const title = productsData?.title || 'Featured Products';

  return (
    <section className="w-full bg-gray-100 py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-[#ff6b35] mx-auto rounded-full" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-200 aspect-square">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundImage: `url('${product.image}')`,
                  }}
                />

                {/* Quick View Button */}
                <button
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#ff6b35] text-white px-6 py-2 rounded-md font-semibold text-sm transition-all duration-300 group-hover:translate-y-0 translate-y-28 z-10"
                >
                  Quick View
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Product Title */}
                <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-tight min-h-12">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={product.rating} size="small" />
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-lg font-bold text-[#ff6b35]">
                    {product.currency} {product.price.toFixed(0)}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-[#1a237e] text-white py-4 rounded-md font-semibold text-sm transition-colors hover:bg-gray-900">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
