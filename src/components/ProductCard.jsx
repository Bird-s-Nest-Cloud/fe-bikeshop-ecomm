'use client';

import React from 'react';
import Link from 'next/link';
import ImageComponent from './shared/ImageComponent';

/**
 * ProductCard Component
 * Displays a single product card with image, title, and price
 * The entire card is a clickable link to the product details page
 */
const ProductCard = ({ product }) => {
  if (!product) return null;

  const productDetailsUrl = `/products/${product.slug || product.id}`;

  return (
    <Link href={productDetailsUrl}>
      <div 
        className="rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group h-full flex flex-col"
        style={{ backgroundColor: 'var(--neutral-white)' }}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden aspect-square shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'var(--neutral-gray300)' }}>
          <ImageComponent
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col grow">
          {/* Product Title */}
          <h3 className="text-sm font-semibold mb-2 leading-tight min-h-12" style={{ color: 'var(--neutral-gray900)' }}>
            {product.title}
          </h3>

          {/* Price */}
          <div className="mt-auto">
            <span className="text-lg font-bold" style={{ color: 'var(--accent-orange)' }}>
              {product.currency} {product.price.toFixed(0)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
