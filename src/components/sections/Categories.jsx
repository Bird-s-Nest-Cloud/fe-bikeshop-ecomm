'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageComponent from '../shared/ImageComponent';

/**
 * Categories Component
 * 
 * Displays product categories in a responsive carousel:
 * - Desktop: 4 items visible with prev/next navigation
 * - Tablet: 2 items visible
 * - Mobile: 1 item visible
 * 
 * Features:
 * - Category cards with images
 * - Hover effects with overlay and CTA
 * - Carousel navigation buttons
 * - Responsive carousel layout
 * 
 * Props:
 * - categories: Array of category objects from API
 */

const Categories = ({ categories = [] }) => {
  const title = 'Shop by Category';
  const [currentIndex, setCurrentIndex] = useState(0);

  // Transform API categories data to items format
  const items = categories.map(category => ({
    name: category.name,
    image: category.image_url,
    href: `/products?category=${category.slug}`,
    productCount: category.product_count
  }));

  // Determine items per slide based on screen size (will be set via data attribute)
  const itemsPerSlide = 4;

  // Calculate total slides
  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  // Ensure currentIndex doesn't exceed available slides
  const safeCurrentIndex = Math.min(currentIndex, Math.max(0, totalSlides - 1));

  // Get visible items for current slide
  const visibleItems = items.slice(
    safeCurrentIndex * itemsPerSlide,
    safeCurrentIndex * itemsPerSlide + itemsPerSlide
  );

  // Handle next slide
  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % totalSlides);
  };

  // Handle prev slide
  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="w-full bg-white py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--neutral-gray900)' }}>
            {title}
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--accent-orange)' }} />
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Categories Carousel Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {visibleItems.map((item, idx) => (
              <Link key={idx} href={item.href} className="group cursor-pointer">
                <div
                  className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
                  style={{
                    minHeight: '250px',
                    backgroundColor: 'var(--neutral-gray300)',
                  }}
                >
                  {/* Background Image */}
                  <ImageComponent
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={250}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />

                  {/* Content */}
                  <div
                    className="absolute inset-0 p-6 text-white flex flex-col justify-end"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                      zIndex: 2,
                    }}
                  >
                    <h3 className="text-lg font-bold mb-2">{item.name}</h3>

                    {/* Arrow Icon */}
                    <div className="opacity-0 group-hover:opacity-100 -translate-x-2.5 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Buttons - Only show on desktop when there are multiple slides */}
          {totalSlides > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center transition-all hover:scale-110 z-40"
                style={{
                  backgroundColor: 'var(--accent-orange)',
                  color: 'white',
                }}
                aria-label="Previous categories"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center transition-all hover:scale-110 z-40"
                style={{
                  backgroundColor: 'var(--accent-orange)',
                  color: 'white',
                }}
                aria-label="Next categories"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Mobile Navigation Buttons */}
          {totalSlides > 1 && (
            <div className="flex lg:hidden gap-2 mt-6 justify-center">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: 'var(--accent-orange)',
                  color: 'white',
                }}
                aria-label="Previous categories"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: 'var(--accent-orange)',
                  color: 'white',
                }}
                aria-label="Next categories"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex gap-2 mt-6 justify-center">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: safeCurrentIndex === idx ? '24px' : '8px',
                    backgroundColor: safeCurrentIndex === idx ? 'var(--accent-orange)' : 'var(--neutral-gray400)',
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
