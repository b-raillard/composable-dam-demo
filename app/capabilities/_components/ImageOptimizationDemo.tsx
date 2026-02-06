'use client'

import { CldImage } from 'next-cloudinary'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const DEMO_IMAGE = 'samples/landscapes/nature-mountains'

const formats = [
  { label: 'Auto (WebP/AVIF)', format: 'auto', quality: 'auto' },
  { label: 'JPEG q90 (High)', format: 'jpg', quality: 90 },
  { label: 'JPEG q10 (Low)', format: 'jpg', quality: 10 },
  { label: 'WebP q5 (Very Low)', format: 'webp', quality: 5 },
]

const sizes = [
  { label: '400px', width: 400 },
  { label: '800px', width: 800 },
  { label: '1200px', width: 1200 },
]

export function ImageOptimizationDemo() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <h2 className="heading-2">Image Optimization</h2>
        <p className="mt-4 body-large max-w-2xl mx-auto">
          Automatic format selection (f_auto) and quality optimization (q_auto)
          deliver the best format for each browser with minimal file size.
        </p>
      </div>

      <div className="space-y-12">
        {/* Format comparison */}
        <div>
          <h3 className="heading-3 mb-6">Format &amp; Quality Comparison</h3>
          <p className="text-gray-600 mb-8 text-center">
            Compare compression artifacts at different quality levels. Lower quality = smaller file size but more visible artifacts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formats.map((f) => (
              <div key={f.label} className="text-center">
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <CldImage
                    src={DEMO_IMAGE}
                    alt={f.label}
                    width={800}
                    height={600}
                    crop="fill"
                    gravity="auto"
                    quality={f.quality}
                    format={f.format}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-auto"
                  />
                </div>
                <p className="mt-3 text-base font-medium text-gray-700">{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Responsive sizes - actual pixel dimensions */}
        <div>
          <h3 className="heading-3 mb-6">Responsive Sizing</h3>
          <p className="text-gray-600 mb-8 text-center">
            Each image is displayed at its actual pixel size to demonstrate different resolutions served by Cloudinary.
          </p>
          <div className="space-y-8">
            {sizes.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm" style={{ width: s.width, maxWidth: '100%' }}>
                  <CldImage
                    src={DEMO_IMAGE}
                    alt={`${s.label} wide`}
                    width={s.width}
                    height={Math.round(s.width * 0.667)}
                    crop="fill"
                    gravity="auto"
                    quality="auto"
                    format="auto"
                    className="w-full h-auto"
                  />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                    {s.width} x {Math.round(s.width * 0.667)}px
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
