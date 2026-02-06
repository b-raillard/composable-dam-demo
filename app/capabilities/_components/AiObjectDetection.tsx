'use client'

import { CldImage } from 'next-cloudinary'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const DEMO_IMAGE = 'samples/animals/three-dogs'

const objectTargets = [
  { label: 'Auto (subject)', gravity: 'auto' },
  { label: 'Dog', gravity: 'auto:dog' },
  { label: 'Face', gravity: 'auto:face' },
  { label: 'Center', gravity: 'center' },
]

export function AiObjectDetection() {
  return (
    <SectionWrapper background="gray">
      <div className="text-center mb-12">
        <h3 className="heading-3">AI Object Detection &amp; Targeting</h3>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Target specific objects in images for smart cropping. The AI detects
          and focuses on the specified object type, ensuring it remains centered
          in the frame.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {objectTargets.map((target) => (
          <div key={target.label} className="text-center">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white aspect-square">
              <CldImage
                src={DEMO_IMAGE}
                alt={`Object detection - ${target.label}`}
                width={400}
                height={400}
                crop="fill"
                gravity={target.gravity}
                quality="auto"
                format="auto"
                sizes="(max-width: 640px) 50vw, 25vw"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700">{target.label}</p>
            <p className="text-xs text-gray-500 font-mono">g_{target.gravity}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
