'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard';

/**
 * CategoryProducts Component
 * Displays products by category with tabs and horizontal carousel
 * 
 * Props:
 * - categoryProducts: Array of category objects with products from API
 */

const CategoryProducts = ({ categoryProducts }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const carouselRef = useRef(null);

  if (!categoryProducts || categoryProducts.length === 0) return null;

  const categories = categoryProducts;
  const currentCategoryData = categories[activeCategory];
  
  // Transform API products data for ProductCard
  const products = (currentCategoryData?.products || []).map(product => ({
    id: product.id,
    name: product.title,
    slug: product.slug,
    price: parseFloat(product.price),
    salePrice: product.sale_price ? parseFloat(product.sale_price) : null,
    image: product.primary_image || '/placeholder-image.jpg',
    rating: 4.5,
    reviews: 0,
    badge: product.is_on_sale ? 'Sale' : null
  }));

  // Update items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);

  const totalPages = Math.ceil(products.length / itemsPerView);
  const maxIndex = Math.max(0, totalPages - 1);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="w-full bg-white py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-8 border-b-2 border-gray-200">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(index)}
                className={`pb-3 px-2 text-lg font-semibold uppercase tracking-wide transition-all duration-300 relative ${
                  activeCategory === index
                    ? 'text-[#ff6b35]'
                    : 'text-gray-600 hover:text-gray-700'
                }`}
              >
                {category.name}
                {/* Active indicator */}
                {activeCategory === index && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#ff6b35] rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          {products.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                aria-label="Next products"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </>
          )}

          {/* Products Grid */}
          <div 
            ref={carouselRef}
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {/* Render pages */}
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div 
                  key={pageIndex} 
                  className="min-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-3"
                >
                  {products
                    .slice(pageIndex * itemsPerView, (pageIndex + 1) * itemsPerView)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentPage 
                      ? 'w-8 bg-[#e53935]' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No products available in this category
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryProducts;
