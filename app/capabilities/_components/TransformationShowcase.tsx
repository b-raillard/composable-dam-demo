'use client'

import { CldImage } from 'next-cloudinary'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const DEMO_IMAGE = 'samples/people/smiling-man'

function TransformCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="text-center">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white aspect-square">
        {children}
      </div>
      <p className="mt-2 text-sm font-medium text-gray-700">{label}</p>
    </div>
  )
}

const imgClass = "h-full w-full object-cover"
const imgSizes = "(max-width: 640px) 50vw, 25vw"

export function TransformationShowcase() {
  return (
    <SectionWrapper background="gray">
      <div className="text-center mb-12">
        <h2 className="heading-2">Transformations</h2>
        <p className="mt-4 body-large max-w-2xl mx-auto">
          Real-time image transformations including smart cropping, effects,
          and artistic filters - all applied on delivery via URL parameters.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <TransformCard label="Original">
          <CldImage src={DEMO_IMAGE} alt="Original" width={400} height={400} crop="fit" quality="auto" format="auto" sizes={imgSizes} className="h-full w-full object-contain" />
        </TransformCard>

        <TransformCard label="Face-aware Crop">
          <CldImage src={DEMO_IMAGE} alt="Face-aware Crop" width={400} height={400} crop="thumb" gravity="face" quality="auto" format="auto" sizes={imgSizes} className={imgClass} />
        </TransformCard>

        <TransformCard label="Rounded Corners">
          <CldImage src={DEMO_IMAGE} alt="Rounded Corners" width={400} height={400} crop="thumb" gravity="face" radius={40} quality="auto" format="auto" sizes={imgSizes} className={imgClass} />
        </TransformCard>

        <TransformCard label="Circular Crop">
          <CldImage src={DEMO_IMAGE} alt="Circular Crop" width={400} height={400} crop="thumb" gravity="face" radius="max" quality="auto" format="auto" sizes={imgSizes} className={imgClass} />
        </TransformCard>

        <TransformCard label="Grayscale">
          <CldImage src={DEMO_IMAGE} alt="Grayscale" width={400} height={400} crop="fill" gravity="face" rawTransformations={['e_grayscale']} quality="auto" format="auto" sizes={imgSizes} className={imgClass} />
        </TransformCard>

        <TransformCard label="Sepia">
          <CldImage src={DEMO_IMAGE} alt="Sepia" width={400} height={400} crop="fill" gravity="face" rawTransformations={['e_sepia:80']} quality="auto" format="auto" sizes={imgSizes} className={imgClass} />
        </TransformCard>

        <TransformCard label="Blur">
          <CldImage src={DEMO_IMAGE} alt="Blur" width={400} height={400} crop="fill" gravity="auto" rawTransformations={['e_blur:300']} quality="auto" format="auto" sizes={imgSizes} className={imgClass} />
        </TransformCard>

        <TransformCard label="Art Filter">
          <CldImage src={DEMO_IMAGE} alt="Art Filter" width={400} height={400} crop="fill" gravity="auto" rawTransformations={['e_art:audrey']} quality="auto" format="auto" sizes={imgSizes} className={imgClass} />
        </TransformCard>
      </div>
    </SectionWrapper>
  )
}
