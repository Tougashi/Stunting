'use client';

import React from 'react';
import Link from 'next/link';
import ProfileButton from '../ui/ProfileButton';

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface NavbarProps {
  logo?: string;
  navItems?: NavItem[];
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/', isActive: true },
  { label: 'Scan', href: '/scan' },
  { label: 'History', href: '/history' },
];

const Navbar: React.FC<NavbarProps> = ({
  logo = 'Stunting',
  navItems = defaultNavItems,
  className = '',
}) => {
  return (
    <nav 
      className={`bg-[#EFFFFE] px-4 sm:px-6 lg:px-8 relative z-50 ${className}`}
      style={{
        boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-[var(--color-primary)]">
              {logo}
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="hidden sm:block">
            <div className="flex space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    item.isActive
                      ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                      : 'text-gray-600 hover:text-[var(--color-primary)]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Profile Button */}
          <div className="flex-shrink-0">
            <ProfileButton />
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] p-2"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
