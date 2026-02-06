'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ResolvedNavigationItem } from '@/types/contentful'

interface NavigationProps {
  items: ResolvedNavigationItem[]
}

export function Navigation({ items }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav>
      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-8">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              {...(item.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {mobileOpen ? (
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg md:hidden">
          <ul className="flex flex-col py-4">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium"
                  onClick={() => setMobileOpen(false)}
                  {...(item.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
