'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/components/sections/HeroCarousel';
import Categories from '@/components/sections/Categories';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import NewProducts from '@/components/sections/NewProducts';
import BrandsCarousel from '@/components/sections/BrandsCarousel';
import { landingPageData } from '@/data/landing-page-data';

/**
 * Landing Page Component
 * 
 * Main landing page that orchestrates all sections in order:
 * 1. Header (TopBar + Navigation)
 * 2. Hero Carousel
 * 3. Categories
 * 4. Featured Products
 * 5. New Products
 * 6. Brands Carousel
 * 7. Footer
 * 
 * All content is driven from the landingPageData configuration
 */

export default function Home() {
  const data = landingPageData;

  return (
    <main className="w-full">
      {/* Header Section */}
      <Header headerData={data.header} categoriesData={data.categories} />

      {/* Hero Carousel Section */}
      <section className="px-4 md:px-6 lg:px-12 py-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <HeroCarousel heroData={data.heroCarousel} />
        </div>
      </section>

      {/* Categories Section */}
      <Categories categoriesData={data.categories} />

      {/* Featured Products Section */}
      <FeaturedProducts productsData={data.featuredProducts} />

      {/* New Products Section */}
      <NewProducts newProductsData={data.newProducts} />

      {/* Brands Carousel Section */}
      <BrandsCarousel brandsData={data.brands} />

      {/* Footer Section */}
      <Footer footerData={data.footer} />
    </main>
  );
}
