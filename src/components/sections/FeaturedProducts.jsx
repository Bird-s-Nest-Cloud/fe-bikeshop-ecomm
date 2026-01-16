"use client";

import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "../ProductCard";
import Link from "next/link";
import Image from "next/image";
import FeaturedProductCard from "../FeaturedProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * FeaturedProducts Component
 * Displays featured products in a responsive grid using the ProductCard component
 *
 * Props:
 * - featuredSection: Featured section object from API
 */

const FeaturedProducts = ({ featuredSection, newSection, saleSection }) => {
  if (!featuredSection || !newSection || !saleSection) return null;
  console.log('FeaturedProducts Props:', { featuredSection, newSection, saleSection });

  const title = featuredSection.title || "Featured Products";
  const subtitle = featuredSection.subtitle || "";
  const [subTitle, setSubtitle] = useState(featuredSection.subtitle);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('featured');
  const [currentSaleIndex, setCurrentSaleIndex] = useState(0);

  useEffect(() => {
    setProducts(featuredSection.products || []);
  }, [featuredSection]);

  // Transform API products data
  const featuredProducts = (featuredSection.products || []).map((product) => ({
    id: product.id,
    name: product.title,
    slug: product.slug,
    price: parseFloat(product.price),
    salePrice: product.sale_price ? parseFloat(product.sale_price) : null,
    image: product.primary_image || "/placeholder-image.jpg",
    rating: 4.5,
    reviews: 0,
    badge: product.is_on_sale ? "Sale" : null,
  }));

  const newProducts = (newSection.products || []).map((product) => ({
    id: product.id,
    name: product.title,
    slug: product.slug,
    price: parseFloat(product.price),
    salePrice: product.sale_price ? parseFloat(product.sale_price) : null,
    image: product.primary_image || "/placeholder-image.jpg",
    rating: 4.5,
    reviews: 0,
    badge: product.is_on_sale ? "Sale" : null,
  }));

  const saleProducts = (saleSection.products || []).map((product) => ({
    id: product.id,
    name: product.title,
    slug: product.slug,
    price: parseFloat(product.price),
    salePrice: product.sale_price ? parseFloat(product.sale_price) : null,
    image: product.primary_image || "/placeholder-image.jpg",
    rating: 4.5,
    reviews: 0,
    badge: product.is_on_sale ? "Sale" : null,
  }));

  // Auto-slide carousel for sale products
  useEffect(() => {
    if (saleProducts.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSaleIndex((prev) => (prev + 1) % saleProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [saleProducts.length]);

  // Calculate discount percentage
  const calculateDiscount = (price, salePrice) => {
    if (!salePrice || price <= 0) return 0;
    return Math.round(((price - salePrice) / price) * 100);
  };

  const currentSaleProduct = saleProducts[currentSaleIndex];
  const currentDiscount = currentSaleProduct 
    ? calculateDiscount(currentSaleProduct.price, currentSaleProduct.salePrice)
    : 0;

  const goToSlide = (index) => {
    setCurrentSaleIndex(index);
  };

  const nextSlide = useCallback(() => {
    setCurrentSaleIndex((prev) => (prev + 1) % saleProducts.length);
  }, [saleProducts.length]);

  const prevSlide = useCallback(() => {
    setCurrentSaleIndex((prev) => (prev - 1 + saleProducts.length) % saleProducts.length);
  }, [saleProducts.length]);

  return (
    <section className="w-full bg-gray-100 py-16 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        {/* <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 text-lg mb-4">{subtitle}</p>
          )}
          <div className="w-20 h-1 bg-[#ff6b35] mx-auto rounded-full" />
        </div> */}

        <div className="grid grid-cols-1  sm:grid-cols-4 gap-6 lg:gap-3">
          <div className="col-span-2 lg:col-span-1">
            <div className="border-3 w-full border-[#ff6b35] rounded-lg px-4 py-8 flex flex-col items-center bg-white relative overflow-hidden">
              <div className="mb-4 flex gap-4 items-center">
                {/* Header */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                SPECIAL OFFER
              </h3>
              
              {/* Discount Badge */}
              <div className="w-16 h-16 bg-[#e53935] rounded-full flex flex-col items-center justify-center text-white shadow-lg">
                  <span className="text-[10px] font-medium leading-tight">Save upto</span>
                  <span className="text-lg font-bold leading-tight">{currentDiscount || 0}%</span>
                </div>
              </div>

              {/* Carousel Content */}
              {currentSaleProduct && (
                <div className="flex flex-col items-center w-full flex-1">
                  {/* Product Image */}
                  <div className="relative w-full h-48 my-6 overflow-hidden">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out h-full"
                      style={{ transform: `translateX(-${currentSaleIndex * 100}%)` }}
                    >
                      {saleProducts.map((product, idx) => (
                        <div key={product.id || idx} className="min-w-full h-full flex items-center justify-center">
                          <Link href={`/products/${product.slug}`}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="object-contain max-h-full hover:scale-105 transition-transform duration-300"
                            />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Product Title */}
                  <Link href={`/products/${currentSaleProduct.slug}`} className="text-center mb-4">
                    <h4 className="text-[#e53935] font-semibold text-lg hover:underline line-clamp-2">
                      {currentSaleProduct.name}
                    </h4>
                  </Link>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-2xl font-bold text-[#e53935]">
                      ৳ {currentSaleProduct.salePrice?.toLocaleString() || currentSaleProduct.price?.toLocaleString()}
                    </span>
                    {currentSaleProduct.salePrice && (
                      <span className="text-gray-400 line-through text-lg">
                        ৳ {currentSaleProduct.price?.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Carousel Dots */}
                  <div className="flex gap-2 mt-4">
                    {saleProducts.slice(0, 5).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === currentSaleIndex 
                            ? 'bg-[#ff6b35] w-4' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={prevSlide}
                      className="p-1 rounded-full hover:bg-gray-100 text-[#ff6b35]  transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-1 rounded-full hover:bg-gray-100 text-[#ff6b35]  transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!currentSaleProduct && (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No sale products available
                </div>
              )}
            </div>
          </div>
          {/* Products Grid */}
         <div className="col-span-2 lg:col-span-3">
           <div className="mb-4">
            <div className="flex gap-2 justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setProducts(featuredProducts);
                    setSubtitle(featuredSection.subtitle || '');
                    setActiveTab('featured');
                  }}
                  className={`border-3 border-[#ff6b35] ${activeTab === 'featured' ? 'bg-[#ff6b35] text-white' : 'text-[#ff6b35] bg-white'}  border-b-0 rounded-t-lg py-1 px-2  font-semibold`}
                >
                  Featured
                </button>
                <button
                  onClick={() => {
                    setProducts(newProducts);
                    setSubtitle(newSection.subtitle || '');
                    setActiveTab('new');
                  }}
                  className={`border-3 border-[#ff6b35] ${activeTab === 'new' ? 'bg-[#ff6b35] text-white' : 'text-[#ff6b35] bg-white'}  border-b-0 rounded-t-lg py-1 px-2  font-semibold`}
                >
                  New Arrivals
                </button>
              </div>

              <Link href="/products" className="flex items-center gap-2">
                <span className="text-base font-semibold text-gray-600 hover:text-orange-400">
                  See All
                </span>
              </Link>
            </div>
            <div className="w-full h-0.5 bg-[#ff6b35] mx-auto rounded-full" />
          </div>
          <div className="mb-4">
          {subTitle && (
            <p className="text-gray-600 text-lg mb-4">{subTitle}</p>
          )}
        </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[2px]">
            {products.map((product, idx) => (
              <FeaturedProductCard key={product.id || idx} product={product} />
            ))}
          </div>
         </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
