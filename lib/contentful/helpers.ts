// Helpers for Cloudinary assets that can be used in client components

export interface CloudinaryAsset {
  public_id: string
  resource_type: string
  format: string
  version: number
  url: string
  secure_url: string
  width: number
  height: number
  bytes: number
  duration?: number
  tags?: string[]
  context?: {
    custom?: Record<string, string>
  }
}

/**
 * Extrait le public_id Cloudinary d'un champ Contentful
 * @param cloudinaryField - Le champ JSON contenant les données Cloudinary
 */
export function extractCloudinaryPublicId(
  cloudinaryField: CloudinaryAsset | null | undefined
): string | null {
  if (!cloudinaryField || !cloudinaryField.public_id) {
    return null
  }
  return cloudinaryField.public_id
}

/**
 * Transforme un asset Cloudinary depuis Contentful avec des transformations
 * @param cloudinaryAsset - L'asset Cloudinary depuis Contentful
 * @param transformations - Transformations Cloudinary à appliquer
 */
export function buildCloudinaryUrl(
  cloudinaryAsset: CloudinaryAsset | null | undefined,
  transformations?: string
): string | null {
  const publicId = extractCloudinaryPublicId(cloudinaryAsset)
  if (!publicId) return null

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const baseUrl = `https://res.cloudinary.com/${cloudName}`

  if (transformations) {
    return `${baseUrl}/image/upload/${transformations}/${publicId}`
  }

  return `${baseUrl}/image/upload/${publicId}`
}
