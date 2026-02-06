'use client'

import { CldImage, type CldImageProps } from 'next-cloudinary'

type CloudinaryImageProps = {
  publicId: string
  alt: string
  priority?: boolean
} & Omit<CldImageProps, 'src' | 'alt'>

export function CloudinaryImage({
  publicId,
  alt,
  priority = false,
  crop = 'fill',
  gravity = 'auto',
  quality = 'auto',
  format = 'auto',
  sizes = '100vw',
  ...rest
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={publicId}
      alt={alt}
      crop={crop}
      gravity={gravity}
      quality={quality}
      format={format}
      sizes={sizes}
      priority={priority}
      {...rest}
    />
  )
}
