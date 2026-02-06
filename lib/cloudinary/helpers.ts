import type { CloudinaryAsset, CloudinaryField } from '@/types/cloudinary'

/** Extract the public_id from the first asset in a CloudinaryField */
export function getPublicId(field: CloudinaryField | undefined): string | null {
  const asset = getFirstAsset(field)
  return asset?.public_id ?? null
}

/** Get the first asset from a CloudinaryField array */
export function getFirstAsset(field: CloudinaryField | undefined): CloudinaryAsset | null {
  if (!field || !Array.isArray(field) || field.length === 0) return null
  return field[0]
}

/** Get all public_ids from a CloudinaryField */
export function getAllPublicIds(field: CloudinaryField | undefined): string[] {
  if (!field || !Array.isArray(field)) return []
  return field.map((asset) => asset.public_id).filter(Boolean)
}

/** Check if a CloudinaryAsset is a video */
export function isVideo(asset: CloudinaryAsset | null): boolean {
  return asset?.resource_type === 'video'
}

/** Check if a CloudinaryField contains a video */
export function fieldIsVideo(field: CloudinaryField | undefined): boolean {
  return isVideo(getFirstAsset(field))
}

/** Get dimensions from the first asset in a CloudinaryField */
export function getAssetDimensions(field: CloudinaryField | undefined): {
  width: number
  height: number
} | null {
  const asset = getFirstAsset(field)
  if (!asset) return null
  return { width: asset.width, height: asset.height }
}

/** Get the aspect ratio of the first asset */
export function getAspectRatio(field: CloudinaryField | undefined): number | null {
  const dims = getAssetDimensions(field)
  if (!dims || dims.height === 0) return null
  return dims.width / dims.height
}

/** Get the secure URL for the first asset */
export function getSecureUrl(field: CloudinaryField | undefined): string | null {
  const asset = getFirstAsset(field)
  return asset?.secure_url ?? null
}
