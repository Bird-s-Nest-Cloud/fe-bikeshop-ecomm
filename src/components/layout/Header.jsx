"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { designConfig } from "@/config/design-config";
import TopBar from "./TopBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/slices/userSlice";
import { fetchCart } from "@/redux/slices/cartSlice";
import { axiosInstance } from "@/utils/axiosInstance";
import {
  ChevronDown,
  CircleUser,
  Headset,
  Locate,
  MapPin,
  Search,
  Shield,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import SearchBar from "./SearchBar";
import BottomBar from "./BottomBar";

/**
 * Header Component with TopBar
 *
 * Two-layer header:
 * 1. TopBar - Welcome text, quick links, support info
 * 2. Navigation - Logo, Home, All Products, Category (dropdown), Brands (dropdown), Search, Cart
 */

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);

  // Handle both nested (summary.total_items) and flat (total_items) structure
  const cartItemsCount = cart?.summary?.total_items || cart?.total_items || 0;

  useEffect(() => {
    // Fetch user profile and cart data
    dispatch(fetchUserData());
    dispatch(fetchCart());

    // Fetch categories and brands
    fetchCategories();
    fetchBrands();
  }, [dispatch]);

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest(".category-dropdown")) {
        setIsCategoryOpen(false);
      }
      if (!event.target.closest(".brand-dropdown")) {
        setIsBrandOpen(false);
      }
      // Close mobile menu when clicking outside of it
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories/");
      const categoriesData = response.data?.data || [];

      // Organize categories into parent-child structure
      const parentCategories = categoriesData.filter(
        (cat) => cat.parent_id === null
      );
      const childCategories = categoriesData.filter(
        (cat) => cat.parent_id !== null
      );

      // Build hierarchical structure
      const hierarchicalCategories = parentCategories.map((parent) => ({
        ...parent,
        children: childCategories.filter(
          (child) => child.parent_id === parent.id
        ),
      }));

      setCategories(hierarchicalCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axiosInstance.get("/brands/");
      const brandsData =
        response.data?.data?.items || response.data?.data || [];
      setBrands(brandsData);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const headerData = {
    topbar: {
      welcomeText: "Welcome to GearZ Bangladesh",
      links: [
        {
          label: "GearZ Bangladesh Warranty Policy",
          href: "#",
          icon: <Shield size={14} />,
        },
        {
          label: "Authorized Dealer List",
          href: "#",
          icon: <MapPin size={14} />,
        },
      ],
      support: {
        icon: "headset",
        phone: "+88-01789-881122",
        email: "info@gearzbd.com",
      },
    },

    navbar: {
      logo: {
        src: "/images/gearz-logo.png",
        alt: "GearZ Bangladesh",
      },
      menu: [
        { label: "HOME", href: "/" },
        {
          label: "ABOUT US",
          dropdown: [
            { label: "Our Story", href: "/about" },
            { label: "Our Team", href: "/team" },
          ],
        },
        { label: "TIPS & TRICKS", href: "/tips" },
        { label: "NEWS & UPDATES", href: "/news" },
        { label: "BECOME A DEALER", href: "/dealer" },
        { label: "CONTACT US", href: "/contact" },
      ],
      actions: {
        productDropdown: "OUR PRODUCTS",
        searchPlaceholder: "Search for Products",
        categoryFilter: "All Categories",
        icons: ["search", "refresh", "wishlist", "cart"],
      },
    },
  };

  return (
    <>
      {/* TopBar Section */}
      <TopBar topbarData={headerData.topbar} user={user} />

      {/* Main Navigation */}
      <nav className="relative z-50 bg-white border-b border-gray-300 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-600 hover:text-orange-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Logo */}
              <Link href="/" className="shrink-0">
                <h1 className="text-2xl md:text-3xl font-bold text-[#ff6b35] m-0">
                  GearZ
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center gap-8 flex-1">
              {/* Home Link */}
              <Link
                href="/"
                className="text-base font-semibold text-gray-800 hover:text-orange-600 transition-colors no-underline"
              >
                Home
              </Link>

              {/* All Products Link */}
              <Link
                href="/products"
                className="text-base font-semibold text-gray-800 hover:text-orange-600 transition-colors no-underline"
              >
                All Products
              </Link>

              <Link
                href="#"
                className="text-base font-semibold text-gray-800 hover:text-orange-600 transition-colors no-underline"
              >
                Contact Us
              </Link>

              <Link
                href="#"
                className="text-base font-semibold text-gray-800 hover:text-orange-600 transition-colors no-underline"
              >
                About Us
              </Link>
            </div>

            <div className="hidden md:flex justify-end gap-2">
              <div>
                <Headset color="#ff6b35" size={36} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#ff6b35] hover:text-orange-300 transition-colors flex items-center gap-2">
                  {headerData?.topbar?.support?.phone}
                </p>

                <p className="text-sm text-[#ff6b35] hover:text-orange-300 transition-colors flex items-center gap-2">
                  {headerData?.topbar?.support?.email}
                </p>
              </div>
            </div>

            {/* Cart Icon (Mobile) */}
            <div className="flex md:hidden items-center gap-4">
              <div
                onClick={() => setShowSearchBar(!showSearchBar)}
                className="text-gray-600 hover:text-orange-600 relative"
              >
                {showSearchBar ? <X size={24} /> : <Search size={24} />}
              </div>

              <Link
                href="/cart"
                className="text-gray-600 hover:text-orange-600 relative"
              >
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center bg-[#ff6b35] text-white">
                  {cartItemsCount}
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <div ref={menuRef} className={`md:hidden fixed top-0 ${isMenuOpen ? 'left-0' : 'left-[-256px]'} transition-all ease-in-out duration-300 left-0 h-full w-3xs bg-white pt-4 border-t border-gray-300 flex flex-col gap-4`}>
              <div className="flex gap-4 items-center justify-between border-b border-gray-300 py-2 px-3">
                {/* My Account logic */}
                <div className="flex items-center gap-2 text-gray-600">
                  <CircleUser className="" size={18} />
                  {user ? (
                    <Link
                      href="/my-account"
                      className="hover:text-orange-400 transition-colors no-underline"
                    >
                      Profile
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="hover:text-orange-400 transition-colors no-underline"
                    >
                      Login
                    </Link>
                  )}
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className=" text-gray-600 hover:text-orange-600"
                >
                  <X size={24} />
                </button>
              </div>
              <ul className="pl-4 text-base flex flex-col gap-4 pb-4">
                <li>
                  <Link
                    href="/"
                    className=" font-medium text-gray-900 hover:text-orange-600 no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/products"
                    className=" font-medium text-gray-900 hover:text-orange-600 no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Products
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className=" font-medium text-gray-900 hover:text-orange-600 no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className=" font-medium text-gray-900 hover:text-orange-600 no-underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </li>

                {/* Categories in Mobile */}
                <li>
                  <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className=" font-medium text-gray-900 hover:text-orange-600 bg-transparent border-none cursor-pointer text-left flex items-center gap-1"
                  >
                    Categories
                    <ChevronDown size={14} />
                  </button>

                  {isCategoryOpen && (
                    <div className="pl-4 flex flex-col gap-2">
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <div
                            key={category.id}
                            className="flex flex-col gap-1 mt-2"
                          >
                            {/* Parent Category */}
                            <Link
                              href={`/products?category=${category.slug}`}
                              className="text-sm font-semibold text-gray-900 hover:text-orange-600 no-underline"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsCategoryOpen(false);
                              }}
                            >
                              {category.name}
                            </Link>

                            {/* Child Categories */}
                            {category.children &&
                              category.children.length > 0 && (
                                <div className="pl-4 flex flex-col gap-1">
                                  {category.children.map((child) => (
                                    <Link
                                      key={child.id}
                                      href={`/products?category=${child.slug}`}
                                      className="text-sm text-gray-700 hover:text-orange-600 no-underline"
                                      onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsCategoryOpen(false);
                                      }}
                                    >
                                      {child.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">
                          Loading...
                        </span>
                      )}
                    </div>
                  )}
                </li>

                {/* Brands in Mobile */}
                <li>
                  <button
                    onClick={() => setIsBrandOpen(!isBrandOpen)}
                    className=" font-medium text-gray-900 hover:text-orange-600 bg-transparent border-none cursor-pointer text-left flex items-center gap-1"
                  >
                    Brands
                    <ChevronDown size={14} />
                  </button>

                  {isBrandOpen && (
                    <div className="pl-6 flex flex-col gap-2 mt-2">
                      {brands.length > 0 ? (
                        brands.map((brand, idx) => (
                          <Link
                            key={brand.id || idx}
                            href={`/products?brand=${brand.slug}`}
                            className="text-sm text-gray-700 hover:text-orange-600 no-underline"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsBrandOpen(false);
                            }}
                          >
                            {brand.name}
                          </Link>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">
                          Loading...
                        </span>
                      )}
                    </div>
                  )}
                </li>

                {user && (
                  <li>
                    
                    <button
                      onClick={() => {
                        Cookies.remove("user_token");
                        window.location.reload();
                      }}
                      className="font-medium text-gray-900 hover:text-orange-600"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
        </div>

        {showSearchBar && (
          <div className="block md:hidden absolute -bottom-[59px] left-0 right-0 bg-white p-2 shadow-lg ">
            <SearchBar />
          </div>
        )}
      </nav>

      <BottomBar
        categories={categories}
        brands={brands}
        isCategoryOpen={isCategoryOpen}
        setIsCategoryOpen={setIsCategoryOpen}
        isBrandOpen={isBrandOpen}
        setIsBrandOpen={setIsBrandOpen}
        cartItemsCount={cartItemsCount}
      />
    </>
  );
};

export default Header;
