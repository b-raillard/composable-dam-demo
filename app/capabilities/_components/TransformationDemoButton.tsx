'use client'

import { useState } from 'react'
import { TransformationDemoModal } from './TransformationDemoModal'

export function TransformationDemoButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="rainbow-border-btn inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-primary-50 hover:text-primary-700 transition-colors"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          {/* Large 4-pointed star */}
          <path d="M10 2.5c0 4.1-2.4 6.5-6.5 6.5C7.6 9 10 11.4 10 15.5 10 11.4 12.4 9 16.5 9 12.4 9 10 6.6 10 2.5z" />
          {/* Small 4-pointed star */}
          <path d="M18 13c0 2.3-1.3 3.7-3.7 3.7C16.7 16.7 18 18 18 20.3 18 18 19.3 16.7 21.3 16.7 19.3 16.7 18 15.3 18 13z" />
        </svg>
        Transformation Demo
      </button>

      {showModal && <TransformationDemoModal onClose={() => setShowModal(false)} />}
    </>
  )
}
