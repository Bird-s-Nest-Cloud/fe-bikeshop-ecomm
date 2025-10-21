'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard';

/**
 * NewProducts Component
 * Displays new arrival products in a responsive carousel using the ProductCard component
 */

const NewProducts = ({ newProductsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  const products = newProductsData?.products || [];
  const title = newProductsData?.title || 'New Arrivals';
  const subtitle = newProductsData?.subtitle || '';

  // Update items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  if (products.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2" style={{ color: 'var(--neutral-gray900)' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-base mb-4" style={{ color: 'var(--neutral-gray700)' }}>
              {subtitle}
            </p>
          )}
          <div className="w-20 h-1 rounded-full" style={{ backgroundColor: 'var(--accent-orange)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
