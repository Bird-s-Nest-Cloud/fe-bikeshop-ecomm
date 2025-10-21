'use client';

import React, { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from '../ProductCard';
import FilterSidebar from './FilterSidebar';
import Pagination from './Pagination';
import { productsData } from '@/data/products-data';

const ITEMS_PER_PAGE = 12;

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 25000 },
    selectedCategories: [],
    selectedBrands: [],
  });

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productsData.filter((product) => {
      const priceMatch =
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max;

      const categoryMatch =
        filters.selectedCategories.length === 0 ||
        filters.selectedCategories.includes(product.category);

      const brandMatch =
        filters.selectedBrands.length === 0 ||
        filters.selectedBrands.includes(product.brand);

      return priceMatch && categoryMatch && brandMatch;
    });

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-white min-h-screen px-6">
      <div className="max-w-7xl mx-auto py-16">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--neutral-gray900)' }}>
            All Products
          </h1>
          <p className="text-lg" style={{ color: 'var(--neutral-gray700)' }}>
            Showing {paginatedProducts.length > 0 ? startIndex + 1 : 0} to{' '}
            {Math.min(endIndex, filteredAndSortedProducts.length)} of{' '}
            {filteredAndSortedProducts.length} products
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex items-center justify-between mb-8 gap-4">
          {/* Filter Button (Mobile) */}
          <button
            onClick={() => setFilterSidebarOpen(!filterSidebarOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 ml-auto"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-80 shrink-0 ">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              isOpen={true}
              onClose={() => {}}
            />
          </div>

          {/* Mobile Sidebar */}
          <div className='block lg:hidden'>
            <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            isOpen={filterSidebarOpen}
            onClose={() => setFilterSidebarOpen(false)}
          />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold mb-2" style={{ color: 'var(--neutral-gray900)' }}>
                  No products found
                </h3>
                <p style={{ color: 'var(--neutral-gray700)' }}>
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      priceRange: { min: 0, max: 25000 },
                      selectedCategories: [],
                      selectedBrands: [],
                    })
                  }
                  className="mt-6 px-6 py-2 rounded-lg font-semibold transition-colors hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--accent-orange)',
                    color: 'white',
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
