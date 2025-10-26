'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { designConfig } from '@/config/design-config';
import TopBar from './TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '@/redux/slices/userSlice';
import { fetchCart } from '@/redux/slices/cartSlice';

/**
 * Header Component with TopBar
 * 
 * Two-layer header:
 * 1. TopBar - Welcome text, quick links, support info
 * 2. Navigation - Logo, Home, All Products, Category (dropdown), Search, Cart
 */

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  
  // Handle both nested (summary.total_items) and flat (total_items) structure
  const cartItemsCount = cart?.summary?.total_items || cart?.total_items || 0;


  useEffect(() => {
    // Fetch user profile and cart data
    dispatch(fetchUserData());
    dispatch(fetchCart());
  }, [dispatch]);

  const categories = [
      { label: "Helmets", image: "/images/categories/helmets.jpg", href: "/c/helmets" },
      { label: "Riding Gears", image: "/images/categories/riding-gears.jpg", href: "/c/gears" },
      { label: "Rain Gear", image: "/images/categories/rain-gear.jpg", href: "/c/rain" },
      { label: "Accessories", image: "/images/categories/accessories.jpg", href: "/c/accessories" }
    ]

  const headerData = {
    topbar: {
      welcomeText: "Welcome to GearX Bangladesh",
      links: [
        { label: "GearX Bangladesh Warranty Policy", href: "/warranty-policy" },
        { label: "Authorized Dealer List", href: "/dealers" }
      ],
      support: {
        icon: "headset",
        phone: "+88-01789-881111",
        email: "info@gearxbd.com"
      }
    },
    
    navbar: {
      logo: {
        src: "/images/gearx-logo.png",
        alt: "GearX Bangladesh"
      },
      menu: [
        { label: "HOME", href: "/" },
        {
          label: "ABOUT US", dropdown: [
            { label: "Our Story", href: "/about" },
            { label: "Our Team", href: "/team" }
          ]
        },
        { label: "TIPS & TRICKS", href: "/tips" },
        { label: "NEWS & UPDATES", href: "/news" },
        { label: "BECOME A DEALER", href: "/dealer" },
        { label: "CONTACT US", href: "/contact" }
      ],
      actions: {
        productDropdown: "OUR PRODUCTS",
        searchPlaceholder: "Search for Products",
        categoryFilter: "All Categories",
        icons: ["search", "refresh", "wishlist", "cart"]
      }
    }
  }

  return (
    <>
      {/* TopBar Section */}
      <TopBar topbarData={headerData.topbar} user={user}/>

      {/* Main Navigation */}
      <nav
      className="sticky top-0 z-50 bg-white border-b border-gray-300 py-4 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <h1
              className="text-2xl font-bold text-[#ff6b35] m-0"
            >
              GearX
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 flex-1">
            {/* Home Link */}
            <Link
              href="/"
              className="text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors no-underline"
            >
              Home
            </Link>

            {/* All Products Link */}
            <Link
              href="/products"
              className="text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors no-underline"
            >
              All Products
            </Link>

            {/* Category Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors py-2 bg-transparent border-none cursor-pointer flex items-center gap-2"
              >
                Category
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {/* Category Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 bg-white rounded-md min-w-[200px] z-50 transition-all ${
                  isCategoryOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                style={{
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                {categories.map((category, idx) => (
                  <Link
                    key={idx}
                    href={category.href}
                    className={`block text-sm text-gray-900 py-4 px-6 no-underline hover:bg-gray-100 transition-colors ${
                      idx < categories.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                    onClick={() => setIsCategoryOpen(false)}
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Search Bar & Action Icons */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
            {/* Search Input */}
            <div className="flex items-center gap-4 bg-gray-100 rounded-md border border-gray-300 py-2 px-4 w-[250px]">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search Products"
                className="bg-transparent border-none outline-none text-sm w-full text-gray-900"
              />
            </div>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="text-gray-600 hover:text-orange-600 transition-colors relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center bg-[#ff6b35] text-white"
              >
                {cartItemsCount}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-orange-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Cart Icon (Mobile) */}
          <Link href="/cart" className="md:hidden text-gray-600 hover:text-orange-600 relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center bg-[#ff6b35] text-white"
            >
              {cartItemsCount}
            </span>
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="mt-4 pt-4 border-t border-gray-300 flex flex-col gap-4"
          >
            <Link
              href="/"
              className="text-sm font-medium text-gray-900 hover:text-orange-600 no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/shop"
              className="text-sm font-medium text-gray-900 hover:text-orange-600 no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>

            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="text-sm font-medium text-gray-900 hover:text-orange-600 bg-transparent border-none cursor-pointer text-left flex items-center gap-2"
            >
              Category
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isCategoryOpen ? "M5 15l7-7 7 7" : "M19 14l-7 7m0 0l-7-7m7 7V3"}
                />
              </svg>
            </button>

            {isCategoryOpen && (
              <div className="pl-6 flex flex-col gap-2">
                {categories.map((category, idx) => (
                  <Link
                    key={idx}
                    href={category.href}
                    className="text-sm text-gray-700 hover:text-orange-600 no-underline"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsCategoryOpen(false);
                    }}
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Header;