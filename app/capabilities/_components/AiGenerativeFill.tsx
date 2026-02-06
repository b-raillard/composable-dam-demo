'use client'

import { CldImage } from 'next-cloudinary'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const DEMO_IMAGE = 'samples/landscapes/nature-mountains'

const fillExamples = [
  { label: 'Original', width: 800, height: 600, fill: false },
  { label: 'Extended (16:9)', width: 1600, height: 900, fill: true },
  { label: 'Extended (1:1)', width: 1200, height: 1200, fill: true },
  { label: 'Extended (9:16)', width: 900, height: 1600, fill: true },
]

export function AiGenerativeFill() {
  return (
    <SectionWrapper background="gray">
      <div className="text-center mb-12">
        <h3 className="heading-3">AI Generative Fill</h3>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Extend images beyond their original boundaries using AI-generated content.
          Change aspect ratios without cropping - the AI fills in the missing areas
          seamlessly.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {fillExamples.map((ex) => (
          <div key={ex.label} className="text-center">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <CldImage
                src={DEMO_IMAGE}
                alt={ex.label}
                width={ex.width}
                height={ex.height}
                crop={ex.fill ? 'pad' : 'fill'}
                gravity="auto"
                quality="auto"
                format="auto"
                fillBackground={ex.fill}
                sizes="(max-width: 640px) 50vw, 25vw"
                className="w-full h-auto"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700">{ex.label}</p>
            <p className="text-xs text-gray-500">{ex.width}x{ex.height}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
