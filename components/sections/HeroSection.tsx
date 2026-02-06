import { getPublicId, fieldIsVideo } from '@/lib/cloudinary/helpers'
import { CloudinaryImage } from '@/components/media/CloudinaryImage'
import { CloudinaryVideo } from '@/components/media/CloudinaryVideo'
import { Button } from '@/components/ui/Button'
import { heroTransform } from '@/lib/cloudinary/transformations'
import type { ResolvedSectionHero } from '@/types/contentful'

interface HeroSectionProps {
  section: ResolvedSectionHero
}

export function HeroSection({ section }: HeroSectionProps) {
  const publicId = getPublicId(section.backgroundMedia)
  const isVideoBackground = section.backgroundType === 'video' || fieldIsVideo(section.backgroundMedia)
  const overlayOpacity = section.overlayOpacity ?? 0.5

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background */}
      {publicId && (
        <div className="absolute inset-0">
          {isVideoBackground ? (
            <CloudinaryVideo
              publicId={publicId}
              autoplay
              loop
              muted
              controls={false}
              className="h-full w-full [&_video]:object-cover [&_video]:h-full [&_video]:w-full"
            />
          ) : (
            <CloudinaryImage
              publicId={publicId}
              alt=""
              width={heroTransform.width}
              height={heroTransform.height}
              crop={heroTransform.crop}
              gravity={heroTransform.gravity}
              sizes={heroTransform.sizes}
              priority
              className="h-full w-full object-cover"
            />
          )}
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1
          className={`heading-1 ${publicId ? 'text-white' : 'text-gray-900'}`}
        >
          {section.headline}
        </h1>
        {section.subheadline && (
          <p
            className={`mt-6 text-xl md:text-2xl max-w-3xl mx-auto ${
              publicId ? 'text-gray-200' : 'text-gray-600'
            }`}
          >
            {section.subheadline}
          </p>
        )}
        {section.ctaText && section.ctaUrl && (
          <div className="mt-10">
            <Button href={section.ctaUrl} size="lg">
              {section.ctaText}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
