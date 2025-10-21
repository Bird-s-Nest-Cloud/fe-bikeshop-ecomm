'use client';

import React from 'react';

const VariantSelector = ({ variants, selectedVariants, onVariantChange }) => {
  return (
    <div className="space-y-6">
      {Object.entries(variants).map(([variantType, options]) => (
        <div key={variantType}>
          <h3 className="text-sm font-semibold capitalize mb-3" style={{ color: 'var(--neutral-gray900)' }}>
            Select {variantType}
          </h3>
          <div className="flex flex-wrap gap-3">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  if (option.available) {
                    onVariantChange(variantType, option.value);
                  }
                }}
                disabled={!option.available}
                className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
                  selectedVariants[variantType] === option.value
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-300 hover:border-gray-400'
                } ${!option.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                style={{
                  borderColor:
                    selectedVariants[variantType] === option.value
                      ? 'var(--accent-orange)'
                      : 'inherit',
                  backgroundColor:
                    selectedVariants[variantType] === option.value
                      ? 'rgba(255, 107, 53, 0.1)'
                      : 'inherit',
                  color:
                    selectedVariants[variantType] === option.value
                      ? 'var(--accent-orange)'
                      : 'var(--neutral-gray900)',
                }}
              >
                {option.name}
                {!option.available && ' (Out of Stock)'}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariantSelector;
