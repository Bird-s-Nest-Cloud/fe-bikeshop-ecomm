'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
    <section className="w-full bg-gray-100 py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-[#ff6b35] mx-auto rounded-full" />
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
                className="bg-white rounded-lg p-8 flex items-center justify-center min-h-[150px] shadow-sm hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <div className="relative w-full h-20 flex items-center justify-center">
                  {/* Brand Logo or Name */}
                  {brand.logo ? (
                    <div
                      className="w-full h-full bg-contain bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url('${brand.logo}')`,
                      }}
                    />
                  ) : (
                    <span className="text-lg font-bold text-[#1a237e] text-center">
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
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff6b35] text-white w-10 h-10 rounded-full border-none cursor-pointer items-center justify-center transition-colors hover:bg-orange-600 hidden lg:flex z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff6b35] text-white w-10 h-10 rounded-full border-none cursor-pointer items-center justify-center transition-colors hover:bg-orange-600 hidden lg:flex z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
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
                  background: currentIndex === idx ? '#ff6b35' : '#eeeeee',
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
