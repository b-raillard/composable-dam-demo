import { getPublicId } from '@/lib/cloudinary/helpers'
import { CloudinaryImage } from '@/components/media/CloudinaryImage'
import { featureIconTransform } from '@/lib/cloudinary/transformations'
import type { ResolvedFeatureItem } from '@/types/contentful'

interface FeatureCardProps {
  feature: ResolvedFeatureItem
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const imagePublicId = getPublicId(feature.image)

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:border-primary-200">
      {imagePublicId && (
        <div className="mb-4 overflow-hidden rounded-xl aspect-square">
          <CloudinaryImage
            publicId={imagePublicId}
            alt={feature.title}
            width={featureIconTransform.width}
            height={featureIconTransform.height}
            crop={featureIconTransform.crop}
            gravity={featureIconTransform.gravity}
            sizes={featureIconTransform.sizes}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
      <p className="mt-2 text-gray-600 text-sm leading-relaxed">{feature.description}</p>
      {feature.link && (
        <a
          href={feature.link}
          className="mt-4 inline-block text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Learn more &rarr;
        </a>
      )}
    </div>
  )
}
