'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
            className="relative min-w-full"
            style={{
              minHeight: '500px',
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
              }}
            />

            {/* Content */}
            <div
              className="absolute inset-0 flex flex-col justify-center items-start"
              style={{
                padding: '64px',
                maxWidth: '600px',
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
                  className="inline-block bg-[#ff6b35] text-white px-8 py-4 rounded-md font-semibold text-base transition-all hover:bg-orange-600 hover:shadow-lg"
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
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 text-[#1a237e] border-none cursor-pointer flex items-center justify-center transition-all hover:bg-white hover:shadow-lg z-10"
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

      {/* Navigation Buttons - Next */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 text-[#1a237e] border-none cursor-pointer flex items-center justify-center transition-all hover:bg-white hover:shadow-lg z-10"
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

      {/* Slide Indicators - Dots */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10"
      >
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className="border-none cursor-pointer rounded-full transition-all"
            style={{
              width: currentSlide === idx ? '2rem' : '0.5rem',
              height: '0.5rem',
              background: currentSlide === idx ? '#ff6b35' : 'rgba(255, 255, 255, 0.5)',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
