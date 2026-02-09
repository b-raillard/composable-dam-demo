'use client'

import { CldImage } from 'next-cloudinary'

export function AutoTaggingImage({ publicId }: { publicId: string }) {
  return (
    <CldImage
      src={publicId}
      alt="Auto-tagged image"
      width={800}
      height={600}
      crop="fill"
      gravity="center"
      quality="auto"
      format="auto"
      sizes="(max-width: 1024px) 100vw, 50vw"
      className="w-full h-auto"
    />
  )
}
