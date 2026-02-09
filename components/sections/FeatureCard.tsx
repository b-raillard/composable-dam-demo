import { getAllPublicIds } from '@/lib/cloudinary/helpers'
import { CloudinaryImage } from '@/components/media/CloudinaryImage'
import { featureIconTransform } from '@/lib/cloudinary/transformations'
import type { ResolvedFeatureItem } from '@/types/contentful'

interface FeatureCardProps {
  feature: ResolvedFeatureItem
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const imagePublicIds = getAllPublicIds(feature.image)

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:border-primary-200">
      {imagePublicIds.length > 0 && (
        <div className="mb-4 overflow-hidden rounded-xl">
          {imagePublicIds.length === 1 ? (
            // Single image - display as before
            <div className="aspect-square">
              <CloudinaryImage
                publicId={imagePublicIds[0]}
                alt={feature.title}
                width={featureIconTransform.width}
                height={featureIconTransform.height}
                crop={featureIconTransform.crop}
                gravity={featureIconTransform.gravity}
                sizes={featureIconTransform.sizes}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          ) : (
            // Multiple images - display in a grid
            <div className="grid grid-cols-2 gap-2">
              {imagePublicIds.map((publicId, index) => (
                <div key={publicId} className="aspect-square">
                  <CloudinaryImage
                    publicId={publicId}
                    alt={`${feature.title} - Image ${index + 1}`}
                    width={featureIconTransform.width / 2}
                    height={featureIconTransform.height / 2}
                    crop={featureIconTransform.crop}
                    gravity={featureIconTransform.gravity}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
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
