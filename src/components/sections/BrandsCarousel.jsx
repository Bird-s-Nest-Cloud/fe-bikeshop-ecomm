'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ImageComponent from '../shared/ImageComponent';

/**
 * BrandsCarousel Component
 * Displays brand logos in an auto-playing carousel
 */

const BrandsCarousel = ({ brandsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const brands = brandsData?.items || [];
  const title = brandsData?.title || 'Our Brands';

  // Auto-play logic
  useEffect(() => {
    if (!isAutoplay || brands.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % brands.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoplay, brands.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % brands.length);
    setIsAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + brands.length) % brands.length);
    setIsAutoplay(false);
  };

  if (brands.length === 0) return null;

  const visibleItems = 5;
  const getVisibleBrands = () => {
    const result = [];
    for (let i = 0; i < visibleItems; i++) {
      result.push(brands[(currentIndex + i) % brands.length]);
    }
    return result;
  };

  return (
    <section className="w-full py-16 px-4 md:px-6 lg:px-12" style={{ backgroundColor: 'var(--neutral-gray300)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--neutral-gray900)' }}>
            {title}
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--accent-orange)' }} />
        </div>

        {/* Carousel Container */}
        <div
          className="relative py-8"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          {/* Brands Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {getVisibleBrands().map((brand, idx) => (
              <div
                key={idx}
                className="rounded-lg p-8 flex items-center justify-center min-h-[150px] shadow-sm hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                style={{ backgroundColor: 'var(--neutral-white)' }}
              >
                <div className="relative w-full h-20 flex items-center justify-center">
                  {/* Brand Logo or Name */}
                  {brand.logo ? (
                    <ImageComponent
                      src={brand.logo}
                      alt={brand.name}
                      width={150}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-lg font-bold text-center" style={{ color: 'var(--primary-main)' }}>
                      {brand.name}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {brands.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-white w-10 h-10 rounded-full border-none cursor-pointer items-center justify-center transition-colors hover:opacity-80 hidden lg:flex z-10"
                style={{ backgroundColor: 'var(--accent-orange)' }}
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white w-10 h-10 rounded-full border-none cursor-pointer items-center justify-center transition-colors hover:opacity-80 hidden lg:flex z-10"
                style={{ backgroundColor: 'var(--accent-orange)' }}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Indicators */}
          <div className="flex justify-center gap-4 mt-8">
            {brands.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsAutoplay(false);
                }}
                className="border-none cursor-pointer rounded-full transition-all duration-300"
                style={{
                  width: currentIndex === idx ? '2rem' : '0.5rem',
                  height: '0.5rem',
                  background: currentIndex === idx ? 'var(--accent-orange)' : 'var(--neutral-gray300)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsCarousel;
