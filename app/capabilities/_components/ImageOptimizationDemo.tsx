'use client'

import { CldImage } from 'next-cloudinary'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const DEMO_IMAGE = 'samples/landscapes/nature-mountains'

const formats = [
  { label: 'Auto (WebP/AVIF)', format: 'auto', quality: 'auto' },
  { label: 'JPEG q80', format: 'jpg', quality: 80 },
  { label: 'JPEG q30', format: 'jpg', quality: 30 },
  { label: 'WebP q50', format: 'webp', quality: 50 },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {formats.map((f) => (
              <div key={f.label} className="text-center">
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <CldImage
                    src={DEMO_IMAGE}
                    alt={f.label}
                    width={400}
                    height={300}
                    crop="fill"
                    gravity="auto"
                    quality={f.quality}
                    format={f.format}
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700">{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Responsive sizes */}
        <div>
          <h3 className="heading-3 mb-6">Responsive Sizing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sizes.map((s) => (
              <div key={s.label} className="text-center">
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <CldImage
                    src={DEMO_IMAGE}
                    alt={`${s.label} wide`}
                    width={s.width}
                    height={Math.round(s.width * 0.667)}
                    crop="fill"
                    gravity="auto"
                    quality="auto"
                    format="auto"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700">
                  Requested: {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
