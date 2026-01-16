'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * FeaturedSectionsGrid Component
 * Displays featured product sections in a 3-column grid layout
 * Each column shows a list of products with image, title, and price
 * 
 * Props:
 * - sections: Array of section objects from API (featured_sections)
 * - maxProducts: Maximum number of products to show per section (default: 3)
 */

const FeaturedSectionsGrid = ({ sections, maxProducts = 3 }) => {
  if (!sections || sections.length === 0) return null;

  // Map section types to display titles (can be customized)
  const getSectionTitle = (section) => {
    if (section.title) return section.title;
    
    switch (section.section_type) {
      case 'featured':
        return 'Featured Products';
      case 'new':
        return 'New Arrivals';
      case 'manual':
        return 'On-Sale Products';
      default:
        return 'Products';
    }
  };

  return (
    <section className="w-full bg-white py-12 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.slice(0, 3).map((section) => (
            <FeaturedSectionColumn
              key={section.id}
              title={getSectionTitle(section)}
              products={section.products?.slice(0, maxProducts) || []}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Individual Section Column
 */
const FeaturedSectionColumn = ({ title, products }) => {
  return (
    <div className="flex flex-col">
      {/* Section Title */}
      <div className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
        <span className='border-b-2 border-[#ff5722] pb-3'>{title}</span> Products
      </div>

      {/* Products List */}
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <FeaturedProductItem key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <p className="text-gray-400 text-sm">No products available</p>
      )}
    </div>
  );
};

/**
 * Individual Product Item
 */
const FeaturedProductItem = ({ product }) => {
  const price = parseFloat(product.price);
  const salePrice = product.sale_price ? parseFloat(product.sale_price) : null;
  const isOnSale = product.is_on_sale && salePrice;

  return (
    <div className="flex items-start gap-4 group">
      {/* Product Image */}
      <Link 
        href={`/products/${product.slug}`}
        className="flex-shrink-0 w-16 h-16 relative overflow-hidden rounded-lg bg-gray-50"
      >
        <Image
          src={product.primary_image || '/placeholder-image.jpg'}
          alt={product.title}
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-300"
          sizes="64px"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        {/* Product Title */}
        <Link href={`/products/${product.slug}`}>
          <h4 className="text-[#ff5722] font-semibold text-sm leading-tight hover:text-gray-600 line-clamp-2 mb-1">
            {product.title}
          </h4>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#e53935] font-semibold text-sm">
            ৳ {(isOnSale ? salePrice : price).toLocaleString()}
          </span>
          {isOnSale && (
            <span className="text-gray-400 line-through text-xs">
              ৳ {price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSectionsGrid;
