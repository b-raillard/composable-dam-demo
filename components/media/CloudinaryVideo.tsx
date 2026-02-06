'use client'

import dynamic from 'next/dynamic'
import 'next-cloudinary/dist/cld-video-player.css'

const CldVideoPlayer = dynamic(
  () => import('next-cloudinary').then((mod) => mod.CldVideoPlayer),
  { ssr: false }
)

interface CloudinaryVideoProps {
  publicId: string
  width?: number
  height?: number
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  sourceTypes?: string[]
  transformation?: Record<string, unknown>
  colors?: {
    accent?: string
    base?: string
    text?: string
  }
  fontFace?: string
  className?: string
  poster?: string
  logo?: boolean
}

export function CloudinaryVideo({
  publicId,
  width = 1920,
  height = 1080,
  autoplay = false,
  loop = false,
  muted = true,
  controls = true,
  sourceTypes,
  transformation,
  colors,
  fontFace,
  className,
  poster,
  logo = false,
}: CloudinaryVideoProps) {
  return (
    <div className={className}>
      <CldVideoPlayer
        src={publicId}
        width={width}
        height={height}
        autoplay={autoplay ? 'on-scroll' : undefined}
        loop={loop}
        muted={muted}
        controls={controls}
        sourceTypes={sourceTypes}
        transformation={transformation}
        colors={colors}
        fontFace={fontFace}
        poster={poster}
        logo={logo}
      />
    </div>
  )
}
