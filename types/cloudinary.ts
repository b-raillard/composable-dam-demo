/** Represents a single Cloudinary asset as stored by the Contentful Cloudinary App */
export interface CloudinaryAsset {
  public_id: string
  resource_type: 'image' | 'video' | 'raw'
  type: string
  format: string
  version: number
  url: string
  secure_url: string
  width: number
  height: number
  bytes: number
  duration?: number
  tags?: string[]
  created_at: string
  derived?: Array<{
    url: string
    secure_url: string
    raw_transformation: string
  }>
  context?: {
    custom?: Record<string, string>
  }
}

/**
 * The Contentful Cloudinary App stores assets as an array of CloudinaryAsset objects
 * in a JSON Object field. This type represents that field value.
 */
export type CloudinaryField = CloudinaryAsset[]

export interface CloudinaryTransformOptions {
  width?: number
  height?: number
  crop?: string
  gravity?: string
  quality?: string | number
  format?: string
  effect?: string
  overlay?: string
  flags?: string
  aspectRatio?: string
  background?: string
  radius?: string | number
  dpr?: string | number
  fetchFormat?: string
  rawTransformation?: string
}
