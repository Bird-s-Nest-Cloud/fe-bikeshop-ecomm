'use client';

import React from 'react';
import { ThumbsUp, Lock, Award, Star } from 'lucide-react';

/**
 * Benefits Section Component
 * 
 * Displays key benefits/features of the store:
 * - Positive Feedback
 * - Payment Security
 * - Guaranteed Parts Support
 * - Only Best Brands
 */

const Benefits = () => {
  const benefits = [
    {
      icon: ThumbsUp,
      title: '99% POSITIVE',
      subtitle: 'FEEDBACKS',
    },
    {
      icon: Lock,
      title: 'PAYMENT',
      subtitle: 'SECURE SYSTEM',
    },
    {
      icon: Award,
      title: 'GUARANTEED',
      subtitle: 'PARTS SUPPORT',
    },
    {
      icon: Star,
      title: 'ONLY BEST',
      subtitle: 'BRANDS',
    },
  ];

  return (
    <section className="w-full bg-white py-12 px-4 md:px-6 lg:px-12">
      <style>{`
        .benefits-scroll::-webkit-scrollbar {
          height: 6px;
        }
        
        .benefits-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .benefits-scroll::-webkit-scrollbar-thumb {
          background: var(--accent-orange);
          border-radius: 3px;
        }
        
        .benefits-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--accent-orange);
          opacity: 0.8;
        }
        
        .benefits-scroll {
          scrollbar-color: var(--accent-orange) transparent;
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div
          className="benefits-scroll flex gap-6 overflow-x-auto lg:grid lg:grid-cols-4 lg:overflow-x-visible"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="flex items-center  gap-4 p-4 md:p-6  flex-shrink-0 lg:flex-shrink border-r-2 border-gray-200 last:border-r-0"
                
              >
                {/* Icon */}
                <div className="flex-shrink-0 min-w-14">
                  <IconComponent
                    size={48}
                    stroke="var(--accent-orange)"
                    strokeWidth={1.5}
                    className="text-[var(--accent-orange)]"
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="text-xs md:text-sm font-semibold text-gray-700">
                    {benefit.title}
                  </p>
                  <p className="text-xs md:text-sm font-semibold text-gray-700">
                    {benefit.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
