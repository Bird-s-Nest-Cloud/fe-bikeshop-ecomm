"use client";

import React, { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { ChevronDown, ShoppingCart, User } from "lucide-react";
import SearchBar from "./SearchBar";

/**
 * TopBar Component
 *
 * Upper navigation bar containing:
 * - Welcome text
 * - Quick links (warranty, dealers, account)
 * - Support information (phone and email)
 *
 * Responsive: Hidden on mobile, shown on desktop
 */

const BottomBar = ({
  categories,
  brands,
  isCategoryOpen,
  setIsCategoryOpen,
  isBrandOpen,
  setIsBrandOpen,
  cartItemsCount
}) => { 
  const bottomInfo = {
    welcomeText: "Welcome to GearZ Bangladesh",
    support: {
      icon: "headset",
      phone: "+88-01789-881111",
      email: "info@gearzbd.com",
    },
  };

  return (
    <div className="hidden md:block py-2 px-6 bg-[var(--accent-orange)] text-white">
      <div className="max-w-7xl mx-auto sm:flex items-center justify-between gap-4">
        {/* Left Section - Welcome Text */}
        <div className="flex items-center gap-4">
          {/* Category Dropdown */}
              <div className="relative group category-dropdown">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="text-sm font-semibold text-white hover:text-orange-200 transition-colors py-2 bg-transparent border-none cursor-pointer flex items-center gap-1"
                >
                  Categories
                  <ChevronDown size={14} />
                </button>

                {/* Category Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-3 bg-white rounded-md min-w-60 z-50 transition-all ${
                    isCategoryOpen
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                  style={{
                    boxShadow: "var(--shadow-lg)",
                  }}
                >
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <div key={category.id}>
                        {/* Parent Category */}
                        <Link
                          href={`/products?category=${category.slug}`}
                          className="block text-sm font-semibold text-gray-900 py-3 px-6 no-underline hover:bg-orange-50 transition-colors border-b border-gray-200"
                          onClick={() => setIsCategoryOpen(false)}
                        >
                          {category.name}
                        </Link>

                        {/* Child Categories */}
                        {category.children && category.children.length > 0 && (
                          <div className="bg-gray-50">
                            {category.children.map((child, childIdx) => (
                              <Link
                                key={child.id}
                                href={`/products?category=${child.slug}`}
                                className={`block text-sm text-gray-700 py-2 pl-10 pr-6 no-underline hover:bg-orange-50 transition-colors ${
                                  childIdx < category.children.length - 1
                                    ? "border-b border-gray-100"
                                    : "border-b border-gray-200"
                                }`}
                                onClick={() => setIsCategoryOpen(false)}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 py-4 px-6">
                      Loading categories...
                    </div>
                  )}
                </div>
              </div>

              {/* Brands Dropdown */}
              <div className="relative group brand-dropdown">
                <button
                  onClick={() => setIsBrandOpen(!isBrandOpen)}
                  className="text-sm font-semibold text-white hover:text-orange-200 transition-colors py-2 bg-transparent border-none cursor-pointer flex items-center gap-1"
                >
                  Brands
                  <ChevronDown size={14} />
                </button>

                {/* Brands Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-3 bg-white rounded-md min-w-[200px] z-50 transition-all ${
                    isBrandOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                  style={{
                    boxShadow: "var(--shadow-lg)",
                  }}
                >
                  {brands.length > 0 ? (
                    brands.map((brand, idx) => (
                      <Link
                        key={brand.id || idx}
                        href={`/products?brand=${brand.slug}`}
                        className={`block text-sm text-gray-900 py-4 px-6 no-underline hover:bg-gray-100 transition-colors ${
                          idx < brands.length - 1
                            ? "border-b border-gray-200"
                            : ""
                        }`}
                        onClick={() => setIsBrandOpen(false)}
                      >
                        {brand.name}
                      </Link>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 py-4 px-6">
                      Loading brands...
                    </div>
                  )}
                </div>
              </div>
        </div>

        {/* Right Section - Support Info */}
        <div className="flex items-center gap-6 flex-1">
          
          {/* Search Bar & Action Icons */}
            <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
              <SearchBar />

              {/* Cart Icon */}
              <Link
                href="/cart"
                className="text-white hover:text-orange-600 transition-colors relative"
              >
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center bg-[#ff6b35] text-white border border-white">
                  {cartItemsCount}
                </span>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
