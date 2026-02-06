import { getPublicId } from '@/lib/cloudinary/helpers'
import { CloudinaryVideo } from '@/components/media/CloudinaryVideo'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { videoPlayerDefaults } from '@/lib/cloudinary/transformations'
import type { ResolvedSectionVideo } from '@/types/contentful'

interface VideoSectionProps {
  section: ResolvedSectionVideo
}

export function VideoSection({ section }: VideoSectionProps) {
  const videoPublicId = getPublicId(section.video)
  const posterPublicId = getPublicId(section.posterImage)

  if (!videoPublicId) return null

  const sourceTypes = section.enableStreaming
    ? ['hls', 'dash', 'mp4']
    : undefined

  return (
    <SectionWrapper background="dark">
      {(section.headline || section.description) && (
        <div className="text-center mb-12">
          {section.headline && <h2 className="heading-2">{section.headline}</h2>}
          {section.description && (
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              {section.description}
            </p>
          )}
        </div>
      )}
      <div className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl">
        <CloudinaryVideo
          publicId={videoPublicId}
          width={videoPlayerDefaults.width}
          height={videoPlayerDefaults.height}
          autoplay={section.autoplay}
          loop={section.loop}
          sourceTypes={sourceTypes}
          colors={videoPlayerDefaults.colors}
          fontFace={videoPlayerDefaults.fontFace}
          poster={posterPublicId || undefined}
        />
      </div>
    </SectionWrapper>
  )
}
