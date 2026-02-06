'use client'

import { useState, useRef, useCallback } from 'react'
import { CldImage } from 'next-cloudinary'

interface BeforeAfterSliderProps {
  publicId: string
  alt: string
  width: number
  height: number
  beforeLabel?: string
  afterLabel?: string
  afterTransformations?: Record<string, unknown>
  removeBackground?: boolean
  fillBackground?: boolean | { gravity?: string; prompt?: string }
  rawTransformations?: string[]
  className?: string
}

export function BeforeAfterSlider({
  publicId,
  alt,
  width,
  height,
  beforeLabel = 'Before',
  afterLabel = 'After',
  afterTransformations,
  removeBackground,
  fillBackground,
  rawTransformations,
  className = '',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.min(100, Math.max(0, (x / rect.width) * 100))
    setPosition(percent)
  }, [])

  const handleMouseDown = useCallback(() => {
    isDragging.current = true
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging.current) handleMove(e.clientX)
    },
    [handleMove]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX)
    },
    [handleMove]
  )

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-lg cursor-col-resize ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* After image (full width, behind) */}
      <div className="absolute inset-0">
        <CldImage
          src={publicId}
          alt={`${alt} - ${afterLabel}`}
          width={width}
          height={height}
          crop="fill"
          gravity="auto"
          quality="auto"
          format="auto"
          removeBackground={removeBackground}
          fillBackground={fillBackground}
          rawTransformations={rawTransformations}
          {...afterTransformations}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <CldImage
          src={publicId}
          alt={`${alt} - ${beforeLabel}`}
          width={width}
          height={height}
          crop="fill"
          gravity="auto"
          quality="auto"
          format="auto"
          className="h-full w-full object-cover"
          style={{ width: `${(100 / position) * 100}%`, maxWidth: 'none' }}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 z-10 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-gray-700"
          >
            <path
              d="M6 10L2 10M2 10L5 7M2 10L5 13M14 10L18 10M18 10L15 7M18 10L15 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-20 rounded bg-black/60 px-3 py-1 text-sm font-medium text-white">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 z-20 rounded bg-black/60 px-3 py-1 text-sm font-medium text-white">
        {afterLabel}
      </div>
    </div>
  )
}
