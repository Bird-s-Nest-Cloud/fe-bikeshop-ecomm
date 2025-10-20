'use client';

import React, { useState, useEffect } from 'react';

/**
 * NewProducts Component
 * Displays new arrival products in a responsive carousel
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
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base text-gray-600 mb-4">
              {subtitle}
            </p>
          )}
          <div className="w-20 h-1 bg-[#ff6b35] rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Products Carousel */}
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {products.map((product, idx) => (
                <div
                  key={idx}
                  className="px-4"
                  style={{
                    minWidth: `${100 / itemsPerView}%`,
                  }}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                    {/* Product Image */}
                    <div
                      className="relative bg-gray-200 overflow-hidden"
                      style={{
                        minHeight: '200px',
                      }}
                    >
                      <div
                        className="w-full h-full min-h-[200px] bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${product.image}')`,
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4 leading-tight min-h-8">
                        {product.title}
                      </h3>

                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-[#ff6b35]">
                          {product.currency || 'BDT'} {product.price.toFixed(0)}
                        </span>

                        {/* Add to Cart Icon */}
                        <button className="w-10 h-10 rounded-full bg-[#ff6b35] text-white border-none cursor-pointer flex items-center justify-center transition-colors hover:bg-orange-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9h-3v-3.5H9.5V11h-3v1.5h3v3.5H12.5v-3.5h3V11z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {products.length > itemsPerView && (
            <>
              {/* Previous Button */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 bg-[#ff6b35] text-white w-10 h-10 rounded-full border-none cursor-pointer items-center justify-center transition-colors hover:bg-orange-600 hidden md:flex z-5"
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
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 bg-[#ff6b35] text-white w-10 h-10 rounded-full border-none cursor-pointer items-center justify-center transition-colors hover:bg-orange-600 hidden md:flex z-5"
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

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-4 mt-8 md:hidden">
            {Array.from({ length: Math.max(1, products.length - itemsPerView + 1) }).map(
              (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="border-none cursor-pointer rounded-full transition-all duration-300"
                  style={{
                    width: currentIndex === idx ? '2rem' : '0.5rem',
                    height: '0.5rem',
                    background: currentIndex === idx ? '#ff6b35' : '#eeeeee',
                  }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
