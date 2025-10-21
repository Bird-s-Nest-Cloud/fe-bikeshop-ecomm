'use client';

import React from 'react';
import ProductCard from '../ProductCard';

/**
 * FeaturedProducts Component
 * Displays featured products in a responsive grid using the ProductCard component
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
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
