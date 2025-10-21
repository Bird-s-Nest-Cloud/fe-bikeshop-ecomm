'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ImageComponent from '../shared/ImageComponent';

/**
 * HeroCarousel Component
 * 
 * Full-width image carousel with:
 * - Auto-play functionality (configurable interval)
 * - Manual navigation (prev/next buttons)
 * - Slide indicators (dots)
 * - Headline and subtext overlay
 * - Call-to-action button
 * 
 * Props:
 * - heroData: Object containing slides array and autoplay settings
 */

const HeroCarousel = ({ heroData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const slides = heroData?.slides || [];
  const autoplayInterval = heroData?.intervalMs || 5000;

  // Auto-play logic
  useEffect(() => {
    if (!isAutoplay || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [isAutoplay, slides.length, autoplayInterval]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoplay(false);
  };

  if (slides.length === 0) return null;

  const currentSlideData = slides[currentSlide];

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      style={{ minHeight: '500px' }}
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Carousel Container */}
      <div
        className="flex w-full h-full"
        style={{
          transition: 'all 0.5s ease-in-out',
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="relative min-w-full overflow-hidden"
            style={{
              minHeight: '500px',
            }}
          >
            {/* Background Image */}
            <ImageComponent
              src={slide.image}
              alt={slide.headline}
              width={1200}
              height={500}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            />

            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                zIndex: 2,
              }}
            />

            {/* Content */}
            <div
              className="absolute inset-0 flex flex-col justify-center items-start"
              style={{
                padding: '64px',
                maxWidth: '600px',
                zIndex: 3,
              }}
            >
              {/* Headline */}
              <h2
                className="text-5xl font-bold text-white mb-6"
                style={{
                  lineHeight: '1.2',
                }}
              >
                {slide.headline}
              </h2>

              {/* Subtext */}
              <p
                className="text-lg text-white mb-8"
                style={{
                  lineHeight: '1.5',
                }}
              >
                {slide.subtext}
              </p>

              {/* CTA Button */}
              {slide.cta && (
                <Link
                  href={slide.cta.href}
                  className="inline-block text-white px-8 py-4 rounded-md font-semibold text-base transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--accent-orange)',
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  {slide.cta.label}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons - Prev */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-none cursor-pointer flex items-center justify-center transition-all hover:shadow-lg z-10"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: 'var(--primary-main)',
        }}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Navigation Buttons - Next */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-none cursor-pointer flex items-center justify-center transition-all hover:shadow-lg z-10"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          color: 'var(--primary-main)',
        }}
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators - Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className="border-none cursor-pointer rounded-full transition-all"
            style={{
              width: currentSlide === idx ? '2rem' : '0.5rem',
              height: '0.5rem',
              background: currentSlide === idx ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.5)',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
