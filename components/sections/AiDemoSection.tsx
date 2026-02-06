import { getPublicId, getFirstAsset } from '@/lib/cloudinary/helpers'
import { CloudinaryImage } from '@/components/media/CloudinaryImage'
import { BeforeAfterSlider } from '@/components/media/BeforeAfterSlider'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { aiDemoTransform } from '@/lib/cloudinary/transformations'
import type { ResolvedSectionAiDemo } from '@/types/contentful'

interface AiDemoSectionProps {
  section: ResolvedSectionAiDemo
}

export function AiDemoSection({ section }: AiDemoSectionProps) {
  const publicId = getPublicId(section.sourceImage)
  const asset = getFirstAsset(section.sourceImage)

  if (!publicId) return null

  const width = asset?.width || aiDemoTransform.width
  const height = asset?.height || aiDemoTransform.height

  return (
    <SectionWrapper>
      {(section.headline || section.description) && (
        <div className="text-center mb-12">
          {section.headline && <h2 className="heading-2">{section.headline}</h2>}
          {section.description && (
            <p className="mt-4 body-large max-w-2xl mx-auto">{section.description}</p>
          )}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {section.showBeforeAfter ? (
          <AiBeforeAfter
            publicId={publicId}
            demoType={section.demoType}
            width={width}
            height={height}
            aiParameters={section.aiParameters}
          />
        ) : (
          <AiResult
            publicId={publicId}
            demoType={section.demoType}
            width={width}
            height={height}
            aiParameters={section.aiParameters}
          />
        )}
      </div>
    </SectionWrapper>
  )
}

function AiBeforeAfter({
  publicId,
  demoType,
  width,
  height,
  aiParameters,
}: {
  publicId: string
  demoType: string
  width: number
  height: number
  aiParameters?: Record<string, unknown>
}) {
  switch (demoType) {
    case 'background-removal':
      return (
        <BeforeAfterSlider
          publicId={publicId}
          alt="Background removal demo"
          width={width}
          height={height}
          beforeLabel="Original"
          afterLabel="Background Removed"
          removeBackground
        />
      )

    case 'generative-fill':
      return (
        <BeforeAfterSlider
          publicId={publicId}
          alt="Generative fill demo"
          width={width}
          height={height}
          beforeLabel="Original"
          afterLabel="Generative Fill"
          fillBackground={
            aiParameters?.prompt
              ? { prompt: aiParameters.prompt as string }
              : true
          }
        />
      )

    default:
      return (
        <BeforeAfterSlider
          publicId={publicId}
          alt={`${demoType} demo`}
          width={width}
          height={height}
          beforeLabel="Original"
          afterLabel="Transformed"
          rawTransformations={
            aiParameters?.rawTransformation
              ? [aiParameters.rawTransformation as string]
              : undefined
          }
        />
      )
  }
}

function AiResult({
  publicId,
  demoType,
  width,
  height,
  aiParameters,
}: {
  publicId: string
  demoType: string
  width: number
  height: number
  aiParameters?: Record<string, unknown>
}) {
  const baseProps = {
    publicId,
    alt: `${demoType} demo result`,
    width,
    height,
    sizes: aiDemoTransform.sizes,
    className: 'rounded-xl w-full',
  }

  switch (demoType) {
    case 'background-removal':
      return <CloudinaryImage {...baseProps} removeBackground />

    case 'generative-fill':
      return (
        <CloudinaryImage
          {...baseProps}
          fillBackground={
            aiParameters?.prompt
              ? { prompt: aiParameters.prompt as string }
              : true
          }
        />
      )

    case 'content-aware-crop':
      return <CloudinaryImage {...baseProps} crop="fill" gravity="auto" />

    case 'object-detection':
      return (
        <CloudinaryImage
          {...baseProps}
          crop="fill"
          gravity={`auto:${(aiParameters?.object as string) || 'subject'}`}
        />
      )

    default:
      return <CloudinaryImage {...baseProps} />
  }
}
