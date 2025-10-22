import { cookies } from 'next/headers';
import HeroCarousel from '@/components/sections/HeroCarousel';
import Categories from '@/components/sections/Categories';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import NewProducts from '@/components/sections/NewProducts';
import BrandsCarousel from '@/components/sections/BrandsCarousel';
import { landingPageData } from '@/data/landing-page-data';
import { axiosInstance } from '@/utils/axiosInstance';

/**
 * Landing Page Component (Server-Side Rendered)
 * 
 * Fetches homepage data from API and renders all sections:
 * 1. Hero Carousel (from API banners)
 * 2. Categories (static data)
 * 3. Featured Products (from API)
 * 4. New Products (from API)
 * 5. Brands Carousel (static data)
 */

// Fetch homepage data on the server
async function getHomepageData() {
  try {
    // Get token from cookies (server-side)
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;
    
    // Make request with token in headers
    const response = await axiosInstance.get('/homepage', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    
    if (response.data && response.data.status) {
      return response.data.data;
    }
    
    // Return null if API fails
    return null;
  } catch (error) {
    console.error('Error fetching homepage data:', error.message);
    // Return null on error, fallback to static data
    return null;
  }
}

export default async function Home() {
  // Fetch data from API
  const apiData = await getHomepageData();
  
  // Prepare hero carousel data from API banners
  const heroData = apiData?.banners ? {
    slides: apiData.banners.map(banner => ({
      id: banner.id,
      image: banner.image,
      imageMobile: banner.image_mobile,
      headline: banner.title,
      subtext: banner.subtitle,
      cta: {
        label: banner.button_text || 'Shop Now',
        href: banner.link_product ? `/products/${banner.link_product.slug}` : '/products'
      },
      displayOrder: banner.display_order
    })).sort((a, b) => a.displayOrder - b.displayOrder),
    intervalMs: 5000,
    autoplay: true
  } : landingPageData.heroCarousel;

  // Prepare featured products data
  const featuredSection = apiData?.featured_sections?.find(
    section => section.section_type === 'featured'
  );
  const productsData = featuredSection ? {
    title: featuredSection.title,
    subtitle: featuredSection.subtitle,
    products: featuredSection.products.map(product => ({
      id: product.id,
      name: product.title,
      slug: product.slug,
      price: parseFloat(product.price),
      salePrice: product.sale_price ? parseFloat(product.sale_price) : null,
      image: product.primary_image || '/placeholder-image.jpg',
      rating: 4.5,
      reviews: 0,
      badge: product.is_on_sale ? 'Sale' : null
    }))
  } : landingPageData.featuredProducts;

  // Prepare new products data
  const newSection = apiData?.featured_sections?.find(
    section => section.section_type === 'new'
  );
  const newProductsData = newSection ? {
    title: newSection.title,
    subtitle: newSection.subtitle,
    products: newSection.products.map(product => ({
      id: product.id,
      name: product.title,
      slug: product.slug,
      price: parseFloat(product.price),
      salePrice: product.sale_price ? parseFloat(product.sale_price) : null,
      image: product.primary_image || '/placeholder-image.jpg',
      rating: 4.5,
      reviews: 0,
      badge: product.is_on_sale ? 'Sale' : null
    }))
  } : landingPageData.newProducts;

  return (
    <main className="w-full">
      {/* Hero Carousel Section */}
      <section className="px-4 md:px-6 lg:px-12 py-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <HeroCarousel heroData={heroData} />
        </div>
      </section>

      {/* Categories Section - Using static data */}
      <Categories categoriesData={landingPageData.categories} />

      {/* Featured Products Section */}
      <FeaturedProducts productsData={productsData} />

      {/* New Products Section */}
      <NewProducts newProductsData={newProductsData} />

      {/* Brands Carousel Section - Using static data */}
      <BrandsCarousel brandsData={landingPageData.brands} />
    </main>
  );
}
