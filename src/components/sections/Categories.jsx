'use client';

import React from 'react';
import Link from 'next/link';

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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <div className="w-20 h-1 bg-[#ff6b35] mx-auto rounded-full" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <Link key={idx} href={item.href} className="group cursor-pointer">
              <div
                className="relative overflow-hidden rounded-lg min-h-[250px] bg-gray-200 shadow-md hover:shadow-xl transition-all"
                style={{
                  minHeight: '250px',
                }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundImage: `url('${item.image}')`,
                  }}
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
                  }}
                >
                  <h3 className="text-lg font-bold mb-2">{item.label}</h3>

                  {/* Arrow Icon */}
                  <div
                    className="opacity-0 group-hover:opacity-100 -translate-x-2.5 group-hover:translate-x-0 transition-all duration-300"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
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
