'use client'

import { CldImage } from 'next-cloudinary'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const DEMO_IMAGE = 'samples/animals/cat'

const cropExamples = [
  { label: 'Landscape', width: 800, height: 400 },
  { label: 'Square', width: 600, height: 600 },
  { label: 'Portrait', width: 400, height: 600 },
  { label: 'Banner', width: 1200, height: 300 },
]

export function AiContentAwareCrop() {
  return (
    <SectionWrapper>
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="heading-3">Content-Aware Crop</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Intelligent cropping that automatically identifies and preserves the
            most important part of an image. Using <code className="bg-gray-100 px-2 py-0.5 rounded">gravity: auto</code>,
            Cloudinary analyzes the image content and crops to keep the subject
            in frame regardless of aspect ratio.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cropExamples.map((ex) => (
            <div key={ex.label} className="text-center">
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <CldImage
                  src={DEMO_IMAGE}
                  alt={`Content-aware crop - ${ex.label}`}
                  width={ex.width}
                  height={ex.height}
                  crop="fill"
                  gravity="auto"
                  quality="auto"
                  format="auto"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-1 text-xs font-medium text-gray-600">{ex.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
