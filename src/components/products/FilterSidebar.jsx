'use client';

import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { categories, brands } from '@/data/products-data';

const FilterSidebar = ({ filters, onFilterChange, isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    category: true,
    brand: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (type, value) => {
    onFilterChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: parseFloat(value) || 0,
      },
    });
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = filters.selectedCategories.includes(category)
      ? filters.selectedCategories.filter((c) => c !== category)
      : [...filters.selectedCategories, category];

    onFilterChange({
      ...filters,
      selectedCategories: updatedCategories,
    });
  };

  const handleBrandChange = (brand) => {
    const updatedBrands = filters.selectedBrands.includes(brand)
      ? filters.selectedBrands.filter((b) => b !== brand)
      : [...filters.selectedBrands, brand];

    onFilterChange({
      ...filters,
      selectedBrands: updatedBrands,
    });
  };

  const handleResetFilters = () => {
    onFilterChange({
      priceRange: { min: 0, max: 25000 },
      selectedCategories: [],
      selectedBrands: [],
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 w-80 h-screen lg:h-auto bg-white z-50 lg:z-0 transform transition-transform duration-300 px-2 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } overflow-y-auto`}
      >
        <div className="p-6 lg:p-0">
          {/* Close Button (Mobile) */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--neutral-gray900)' }}>
              Filters
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className="w-full mb-6 py-2 px-4 border border-gray-300 rounded-lg font-semibold transition-colors hover:bg-gray-100"
            style={{ color: 'var(--accent-orange)' }}
          >
            Reset Filters
          </button>

          {/* Price Filter */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="text-lg font-semibold" style={{ color: 'var(--neutral-gray900)' }}>
                Price Range
              </h3>
              <ChevronDown
                size={20}
                style={{
                  transform: expandedSections.price ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 300ms',
                }}
              />
            </button>

            {expandedSections.price && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-gray700)' }}>
                    Min Price
                  </label>
                  <input
                    type="number"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'var(--accent-orange)' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--neutral-gray700)' }}>
                    Max Price
                  </label>
                  <input
                    type="number"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'var(--accent-orange)' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="text-lg font-semibold" style={{ color: 'var(--neutral-gray900)' }}>
                Category
              </h3>
              <ChevronDown
                size={20}
                style={{
                  transform: expandedSections.category ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 300ms',
                }}
              />
            </button>

            {expandedSections.category && (
              <div className="space-y-3">
                {categories.map((category) => (
                  <label key={category} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 rounded accent-orange-500"
                    />
                    <span className="ml-3 text-sm" style={{ color: 'var(--neutral-gray900)' }}>
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div className="mb-8">
            <button
              onClick={() => toggleSection('brand')}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="text-lg font-semibold" style={{ color: 'var(--neutral-gray900)' }}>
                Brand
              </h3>
              <ChevronDown
                size={20}
                style={{
                  transform: expandedSections.brand ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform 300ms',
                }}
              />
            </button>

            {expandedSections.brand && (
              <div className="space-y-3">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="w-4 h-4 rounded accent-orange-500"
                    />
                    <span className="ml-3 text-sm" style={{ color: 'var(--neutral-gray900)' }}>
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
