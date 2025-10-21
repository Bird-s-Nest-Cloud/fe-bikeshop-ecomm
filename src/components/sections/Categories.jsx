'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ImageComponent from '../shared/ImageComponent';

/**
 * Categories Component
 * 
 * Displays product categories in a responsive grid:
 * - Desktop: 4 columns
 * - Tablet: 2 columns
 * - Mobile: 2 columns
 * 
 * Features:
 * - Category cards with images
 * - Hover effects with overlay and CTA
 * - Responsive grid layout
 * 
 * Props:
 * - categoriesData: Object containing title and items array
 */

const Categories = ({ categoriesData }) => {
  const items = categoriesData?.items || [];
  const title = categoriesData?.title || 'Shop by Category';

  return (
    <section className="w-full bg-white py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--neutral-gray900)' }}>{title}</h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--accent-orange)' }} />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <Link key={idx} href={item.href} className="group cursor-pointer">
              <div
                className="relative overflow-hidden rounded-lg min-h-[250px] shadow-md hover:shadow-xl transition-all"
                style={{
                  minHeight: '250px',
                  backgroundColor: 'var(--neutral-gray300)',
                }}
              >
                {/* Background Image */}
                <ImageComponent
                  src={item.image}
                  alt={item.label}
                  width={300}
                  height={250}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"
                />

                {/* Content */}
                <div
                  className="absolute inset-0 p-6 text-white flex flex-col justify-end"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    zIndex: 2,
                  }}
                >
                  <h3 className="text-lg font-bold mb-2">{item.label}</h3>

                  {/* Arrow Icon */}
                  <div
                    className="opacity-0 group-hover:opacity-100 -translate-x-2.5 group-hover:translate-x-0 transition-all duration-300"
                  >
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
