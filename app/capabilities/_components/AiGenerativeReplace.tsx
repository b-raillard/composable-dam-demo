'use client'

import { CldImage } from 'next-cloudinary'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const DEMO_IMAGE = 'samples/animals/cat'

const replaceExamples = [
  { label: 'Original', from: '', to: '', raw: undefined },
  { label: 'Cat to Dog', from: 'cat', to: 'golden retriever', raw: 'e_gen_replace:from_cat;to_golden retriever' },
  { label: 'Cat to Lion', from: 'cat', to: 'lion', raw: 'e_gen_replace:from_cat;to_lion' },
  { label: 'Cat to Rabbit', from: 'cat', to: 'rabbit', raw: 'e_gen_replace:from_cat;to_rabbit' },
]

export function AiGenerativeReplace() {
  return (
    <SectionWrapper background="gray">
      <div className="text-center mb-12">
        <h3 className="heading-3">AI Generative Replace</h3>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Replace objects in images using AI. Specify what to replace and with what -
          the AI handles seamless integration with the surrounding context.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {replaceExamples.map((ex) => (
          <div key={ex.label} className="text-center">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white aspect-square">
              <CldImage
                src={DEMO_IMAGE}
                alt={ex.label}
                width={400}
                height={400}
                crop="fill"
                gravity="auto"
                quality="auto"
                format="auto"
                rawTransformations={ex.raw ? [ex.raw] : undefined}
                sizes="(max-width: 640px) 50vw, 25vw"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700">{ex.label}</p>
            {ex.from && (
              <p className="text-xs text-gray-500">
                {ex.from} &rarr; {ex.to}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
