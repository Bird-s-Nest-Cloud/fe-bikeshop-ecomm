'use client';

import React from 'react';
import Link from 'next/link';

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

const TopBar = ({ topbarData }) => {
  return (
    <div
      className="hidden sm:flex items-center justify-between px-4 md:px-6 lg:px-12 py-2 bg-[--primary-main] text-white border-b border-[--primary-light]"
    >
      {/* Left Section - Welcome Text */}
      <div className="flex items-center gap-4">
        <span
          className="text-sm font-medium"
        >
          {topbarData?.welcomeText}
        </span>
        
        {/* Quick Links */}
        <div className="hidden md:flex items-center gap-4 ml-4 border-l border-gray-600 pl-4">
          {topbarData?.links?.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-xs text-white hover:text-orange-400 transition-colors no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right Section - Support Info */}
      <div className="flex items-center gap-6">
        {/* Phone */}
        <a
          href={`tel:${topbarData?.support?.phone}`}
          className="text-xs font-semibold text-[#ff6b35] hover:text-orange-300 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 8.993c0-1.104.897-2 2-2h3.574c.898 0 1.67.778 1.67 1.734v2.053c0 .956-.772 1.734-1.67 1.734H7.02c-.697 0-1.326.428-1.607 1.103-.281.675-.281 1.422 0 2.097C6.694 17.572 9.723 21 14.5 21c.828 0 1.5-.672 1.5-1.5V18c0-.828.672-1.5 1.5-1.5h2.5c.828 0 1.5.672 1.5 1.5v1.5c0 5.247-4.253 9.5-9.5 9.5-7.732 0-12.5-5.373-12.5-12.007v-2.5z" />
          </svg>
          {topbarData?.support?.phone}
        </a>

        {/* Email */}
        <a
          href={`mailto:${topbarData?.support?.email}`}
          className="text-xs text-white hover:text-orange-400 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 6C2 4.9 2.9 4 4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6zm2 2l6 4 6-4 6 4v-2l-12 7-12-7v2z" />
          </svg>
          {topbarData?.support?.email}
        </a>
      </div>
    </div>
  );
};

export default TopBar;
