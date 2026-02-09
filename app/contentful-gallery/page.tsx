import { getContentfulEntriesWithCloudinary } from '@/lib/contentful/cloudinary'
import type { CloudinaryAsset } from '@/lib/contentful/helpers'
import type { Metadata } from 'next'
import { GalleryGrid } from './_components/GalleryGrid'

export const metadata: Metadata = {
  title: 'Cloudinary Gallery | Composable DAM Demo',
  description: 'Browse images managed in Contentful and delivered by Cloudinary with automatic optimization.',
}

// Types pour les différents Content Types Contentful
interface CloudinaryMediaDisplayFields {
  cloudinaryJson?: CloudinaryAsset | CloudinaryAsset[]
  title?: string
  description?: string
}

interface FeatureItemFields {
  image?: CloudinaryAsset | CloudinaryAsset[]
  title?: string
  description?: string
}

export default async function ContentfulGalleryPage() {
  // Récupérer les entrées depuis les deux Content Types
  const mediaDisplayEntries = await getContentfulEntriesWithCloudinary<CloudinaryMediaDisplayFields>(
    'cloudinaryMediaDisplay',
    20
  )

  const featureItemEntries = await getContentfulEntriesWithCloudinary<FeatureItemFields>(
    'featureItem',
    20
  )

  // Combiner toutes les entrées
  const allEntries = [
    ...mediaDisplayEntries.map(entry => ({
      ...entry,
      cloudinaryField: entry.fields.cloudinaryJson,
      source: 'cloudinaryMediaDisplay' as const
    })),
    ...featureItemEntries.map(entry => ({
      ...entry,
      cloudinaryField: entry.fields.image,
      source: 'featureItem' as const
    }))
  ]

  const entries = allEntries.filter(entry => entry.cloudinaryField)

  if (entries.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Cloudinary + Contentful Gallery</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800">
            No entries found. Make sure you have:
          </p>
          <ol className="list-decimal list-inside mt-4 space-y-2 text-yellow-700">
            <li>Created a Content Type with a Cloudinary field</li>
            <li>Added some entries with Cloudinary images</li>
            <li>Updated the Content Type ID in this component</li>
          </ol>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">
        Cloudinary + Contentful Gallery
      </h1>
      <p className="text-gray-600 mb-8">
        Images managed in Contentful, delivered by Cloudinary
      </p>

      <GalleryGrid entries={entries} />
    </div>
  )
}
