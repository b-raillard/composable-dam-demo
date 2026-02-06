import { getAllPublicIds } from '@/lib/cloudinary/helpers'
import { CloudinaryImage } from '@/components/media/CloudinaryImage'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { galleryTransform } from '@/lib/cloudinary/transformations'
import type { ResolvedSectionMediaGallery } from '@/types/contentful'

interface MediaGalleryProps {
  section: ResolvedSectionMediaGallery
}

const layoutClasses: Record<string, string> = {
  grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
  masonry: 'columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4',
  carousel: 'flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4',
}

export function MediaGallery({ section }: MediaGalleryProps) {
  const publicIds = getAllPublicIds(section.mediaItems)
  const layout = section.layout || 'grid'
  const containerClass = layoutClasses[layout] || layoutClasses.grid

  return (
    <SectionWrapper>
      {section.headline && (
        <div className="text-center mb-12">
          <h2 className="heading-2">{section.headline}</h2>
        </div>
      )}
      <div className={containerClass}>
        {publicIds.map((publicId, index) => (
          <div
            key={publicId}
            className={
              layout === 'carousel'
                ? 'flex-none w-[80%] sm:w-[45%] lg:w-[30%] snap-center'
                : layout === 'masonry'
                  ? 'break-inside-avoid'
                  : ''
            }
          >
            <div className="overflow-hidden rounded-xl">
              <CloudinaryImage
                publicId={publicId}
                alt={`Gallery image ${index + 1}`}
                width={galleryTransform.width}
                height={layout === 'masonry' ? undefined as unknown as number : galleryTransform.height}
                crop={layout === 'masonry' ? 'scale' : galleryTransform.crop}
                gravity={galleryTransform.gravity}
                sizes={galleryTransform.sizes}
                className="w-full h-auto transition-transform hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
