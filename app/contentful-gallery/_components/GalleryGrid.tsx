'use client'

import { CldImage } from 'next-cloudinary'
import type { CloudinaryAsset } from '@/lib/contentful/helpers'
import { extractCloudinaryPublicId } from '@/lib/contentful/helpers'

interface GalleryEntry {
  id: string
  cloudinaryField: CloudinaryAsset | CloudinaryAsset[] | undefined
  source: 'cloudinaryMediaDisplay' | 'featureItem'
  fields: {
    title?: string
    description?: string
  }
}

interface GalleryGridProps {
  entries: GalleryEntry[]
}

export function GalleryGrid({ entries }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.flatMap((entry) => {
        const cloudinaryData = entry.cloudinaryField

        // Si cloudinaryField est un array, on crée une carte pour chaque image
        const assets = Array.isArray(cloudinaryData) ? cloudinaryData : [cloudinaryData]

        return assets.map((asset, index) => {
          const publicId = extractCloudinaryPublicId(asset)

          if (!publicId) {
            console.log('No publicId for asset:', asset)
            return null
          }

          const title = entry.fields.title || 'Untitled'
          const description = entry.fields.description

          return (
            <div
              key={`${entry.id}-${index}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video relative bg-gray-100">
                <CldImage
                  src={publicId}
                  alt={title || `Cloudinary Image ${index + 1}`}
                  width={800}
                  height={450}
                  crop="fill"
                  gravity="center"
                  quality="auto"
                  format="auto"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-2">
                  {title} {assets.length > 1 ? `(${index + 1}/${assets.length})` : ''}
                </h2>
                {description && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {description}
                  </p>
                )}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    Public ID: <code className="bg-gray-100 px-1 rounded">{publicId}</code>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Source: <span className="bg-primary-50 text-primary-700 px-1.5 py-0.5 rounded text-xs">{entry.source}</span>
                  </p>
                </div>
              </div>
            </div>
          )
        })
      })}
    </div>
  )
}
