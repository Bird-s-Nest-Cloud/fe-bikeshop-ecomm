'use client';

import React, { useState, useMemo } from 'react';
import { Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import ImageGallery from './ImageGallery';
import VariantSelector from './VariantSelector';
import RelatedProductsCarousel from './RelatedProductsCarousel';
import { productsData, getRelatedProducts } from '@/data/products-complete';

const ProductDetailsPage = ({ slug }) => {
  const product = useMemo(
    () => productsData.find((p) => p.slug === slug),
    [slug]
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState({
    color: product?.variants?.color?.[0]?.value || '',
    size: product?.variants?.size?.[0]?.value || '',
  });
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--neutral-gray900)' }}>
            Product Not Found
          </h1>
          <p style={{ color: 'var(--neutral-gray700)' }}>
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product);
  const isOnSale = product.salePrice !== null && product.salePrice < product.price;
  const discountPercentage = isOnSale
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleVariantChange = (variantType, value) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantType]: value,
    }));
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    // TODO: Implement cart functionality
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(product.stock, value));
    setQuantity(newQuantity);
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'var(--neutral-gray700)' }}>
          <a href="/products" className="hover:opacity-75">
            Products
          </a>
          <span>/</span>
          <span style={{ color: 'var(--neutral-gray900)' }}>{product.title}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Images */}
          <div>
            <ImageGallery images={product.images} title={product.title} />
          </div>

          {/* Right Column - Product Details */}
          <div>
            {/* Product Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <p style={{ color: 'var(--accent-orange)' }} className="text-sm font-semibold mb-2">
                    {product.brand}
                  </p>
                  <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--neutral-gray900)' }}>
                    {product.title}
                  </h1>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-3 rounded-lg border border-gray-300 hover:border-orange-500 transition-colors"
                >
                  <Heart
                    size={24}
                    fill={isWishlisted ? 'var(--accent-orange)' : 'none'}
                    color={isWishlisted ? 'var(--accent-orange)' : 'var(--neutral-gray700)'}
                  />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4"
                      fill={i < Math.round(product.rating) ? 'var(--accent-orange)' : '#eeeeee'}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span style={{ color: 'var(--neutral-gray700)' }} className="text-sm">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <span className="text-3xl font-bold" style={{ color: 'var(--accent-orange)' }}>
                    {product.currency} {(product.salePrice || product.price).toFixed(0)}
                  </span>
                  {isOnSale && (
                    <span
                      className="ml-2 text-lg line-through"
                      style={{ color: 'var(--neutral-gray700)' }}
                    >
                      {product.currency} {product.price.toFixed(0)}
                    </span>
                  )}
                </div>
                {isOnSale && (
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: 'var(--accent-red)', color: 'white' }}
                  >
                    Save {discountPercentage}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p style={{ color: 'var(--neutral-gray700)' }} className="mb-6">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <p className="text-sm font-semibold" style={{ color: 'var(--success)' }}>
                  ✓ In Stock ({product.stock} available)
                </p>
              ) : (
                <p className="text-sm font-semibold" style={{ color: 'var(--error)' }}>
                  Out of Stock
                </p>
              )}
            </div>

            {/* Variant Selection */}
            {product.variants && (
              <VariantSelector
                variants={product.variants}
                selectedVariants={selectedVariants}
                onVariantChange={handleVariantChange}
              />
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-4 py-3 font-semibold hover:bg-gray-100 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border-l border-r border-gray-300 py-3 outline-none"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-4 py-3 font-semibold hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: addedToCart ? 'var(--success)' : 'var(--accent-orange)',
                }}
              >
                <ShoppingCart size={20} />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              disabled={product.stock === 0}
              className="w-full py-3 px-6 rounded-lg font-semibold text-white border border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              style={{
                backgroundColor: 'var(--neutral-white)',
                color: 'var(--neutral-gray900)',
                borderColor: 'var(--neutral-gray300)',
              }}
            >
              Buy Now
            </button>

            {/* Shipping & Return Info */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <Truck
                  size={24}
                  style={{ color: 'var(--accent-orange)' }}
                  className="mx-auto mb-2"
                />
                <p className="text-xs font-semibold" style={{ color: 'var(--neutral-gray900)' }}>
                  Free Shipping
                </p>
                <p style={{ color: 'var(--neutral-gray700)' }} className="text-xs">
                  On orders over 5,000 BDT
                </p>
              </div>
              <div className="text-center">
                <Shield
                  size={24}
                  style={{ color: 'var(--accent-orange)' }}
                  className="mx-auto mb-2"
                />
                <p className="text-xs font-semibold" style={{ color: 'var(--neutral-gray900)' }}>
                  Secure Payment
                </p>
                <p style={{ color: 'var(--neutral-gray700)' }} className="text-xs">
                  100% secure transactions
                </p>
              </div>
              <div className="text-center">
                <RotateCcw
                  size={24}
                  style={{ color: 'var(--accent-orange)' }}
                  className="mx-auto mb-2"
                />
                <p className="text-xs font-semibold" style={{ color: 'var(--neutral-gray900)' }}>
                  Easy Returns
                </p>
                <p style={{ color: 'var(--neutral-gray700)' }} className="text-xs">
                  30-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="border-t border-gray-200 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--neutral-gray900)' }}>
                Product Details
              </h2>
              <p style={{ color: 'var(--neutral-gray700)' }} className="mb-6 leading-relaxed">
                {product.longDescription}
              </p>

              {/* Features */}
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--neutral-gray900)' }}>
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.features?.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3"
                    style={{ color: 'var(--neutral-gray700)' }}
                  >
                    <span className="text-lg leading-none mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Info */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <p style={{ color: 'var(--neutral-gray700)' }} className="text-sm">
                    Category
                  </p>
                  <p className="font-semibold" style={{ color: 'var(--neutral-gray900)' }}>
                    {product.category}
                  </p>
                </div>
                <div>
                  <p style={{ color: 'var(--neutral-gray700)' }} className="text-sm">
                    Brand
                  </p>
                  <p className="font-semibold" style={{ color: 'var(--neutral-gray900)' }}>
                    {product.brand}
                  </p>
                </div>
                <div>
                  <p style={{ color: 'var(--neutral-gray700)' }} className="text-sm">
                    SKU
                  </p>
                  <p className="font-semibold" style={{ color: 'var(--neutral-gray900)' }}>
                    {product.id}
                  </p>
                </div>
                <div>
                  <p style={{ color: 'var(--neutral-gray700)' }} className="text-sm">
                    Availability
                  </p>
                  <p
                    className="font-semibold"
                    style={{ color: product.stock > 0 ? 'var(--success)' : 'var(--error)' }}
                  >
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProductsCarousel products={relatedProducts} />
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
