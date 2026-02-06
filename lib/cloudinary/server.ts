import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export { cloudinary }

/** Fetch auto-generated tags for a given public_id */
export async function getAutoTags(
  publicId: string
): Promise<{ tag: string; confidence: number }[]> {
  try {
    const result = await cloudinary.api.resource(publicId, {
      image_metadata: true,
      colors: true,
    })

    const tags: { tag: string; confidence: number }[] = []

    if (result.info?.categorization?.google_tagging?.data) {
      for (const item of result.info.categorization.google_tagging.data) {
        tags.push({ tag: item.tag, confidence: item.confidence })
      }
    }

    if (result.info?.categorization?.aws_rek_tagging?.data) {
      for (const item of result.info.categorization.aws_rek_tagging.data) {
        tags.push({ tag: item.tag, confidence: item.confidence })
      }
    }

    if (tags.length === 0 && result.tags) {
      for (const tag of result.tags) {
        tags.push({ tag, confidence: 1 })
      }
    }

    return tags.sort((a, b) => b.confidence - a.confidence)
  } catch (error) {
    console.error('Failed to fetch auto tags:', error)
    return []
  }
}

/** Fetch full resource metadata from Cloudinary */
export async function getResourceMetadata(publicId: string) {
  try {
    return await cloudinary.api.resource(publicId, {
      image_metadata: true,
      colors: true,
      faces: true,
    })
  } catch (error) {
    console.error('Failed to fetch resource metadata:', error)
    return null
  }
}
