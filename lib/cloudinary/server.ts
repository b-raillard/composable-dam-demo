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
      categorization: true,
    })

    console.log('getAutoTags - checking for categorization data')
    console.log('result.info exists:', !!result.info)
    console.log('result.categorization exists:', !!result.categorization)

    const tags: { tag: string; confidence: number }[] = []

    // Check both result.info.categorization and result.categorization
    const categorization = result.info?.categorization || result.categorization

    if (categorization) {
      console.log('Found categorization:', Object.keys(categorization))

      // Cloudinary AI Content Analysis
      if (categorization.cld_ai?.data) {
        for (const item of categorization.cld_ai.data) {
          tags.push({ tag: item.tag, confidence: item.confidence })
        }
      }

      // Google Auto Tagging (if enabled)
      if (categorization.google_tagging?.data) {
        for (const item of categorization.google_tagging.data) {
          tags.push({ tag: item.tag, confidence: item.confidence })
        }
      }

      // AWS Rekognition (if enabled)
      if (categorization.aws_rek_tagging?.data) {
        for (const item of categorization.aws_rek_tagging.data) {
          tags.push({ tag: item.tag, confidence: item.confidence })
        }
      }

      // Imagga tagging (if enabled)
      if (categorization.imagga_tagging?.data) {
        for (const item of categorization.imagga_tagging.data) {
          tags.push({ tag: item.tag, confidence: item.confidence })
        }
      }
    }

    // Fallback 1: Use manual tags if they exist
    if (tags.length === 0 && result.tags) {
      console.log('Using manual tags:', result.tags)
      for (const tag of result.tags) {
        tags.push({ tag, confidence: 1 })
      }
    }

    // Fallback 2: Use predominant colors from Google/Cloudinary analysis
    if (tags.length === 0 && result.predominant) {
      console.log('Using predominant color tags')
      if (result.predominant.google) {
        for (const [color, percentage] of result.predominant.google) {
          tags.push({ tag: color, confidence: percentage / 100 })
        }
      }
    }

    // Fallback 3: Generate descriptive tags from image metadata
    if (tags.length === 0) {
      console.log('Using image characteristics as tags')
      if (result.format) tags.push({ tag: result.format.toUpperCase(), confidence: 1 })
      if (result.width && result.height) {
        const aspectRatio = result.width / result.height
        if (aspectRatio > 1.5) tags.push({ tag: 'landscape', confidence: 0.9 })
        else if (aspectRatio < 0.75) tags.push({ tag: 'portrait', confidence: 0.9 })
        else tags.push({ tag: 'square', confidence: 0.9 })
      }
      if (result.resource_type) tags.push({ tag: result.resource_type, confidence: 1 })
    }

    console.log('Final tags count:', tags.length)
    return tags.sort((a, b) => b.confidence - a.confidence)
  } catch (error) {
    console.error('Failed to fetch auto tags:', error)
    return []
  }
}

/** Trigger AI Content Analysis on an image */
export async function triggerAutoTagging(publicId: string) {
  try {
    // Try multiple categorization add-ons that might be available
    const result = await cloudinary.uploader.explicit(publicId, {
      type: 'upload',
      categorization: 'aws_rek_tagging,google_tagging,imagga_tagging',
      overwrite: false,
    })
    console.log('Explicit API result:', JSON.stringify(result, null, 2))
    return true
  } catch (error) {
    console.error('Failed to trigger auto-tagging:', error)
    console.error('Error details:', error)
    return false
  }
}

/** Fetch full resource metadata from Cloudinary */
export async function getResourceMetadata(publicId: string) {
  try {
    return await cloudinary.api.resource(publicId, {
      image_metadata: true,
      colors: true,
      faces: true,
      categorization: true,
    })
  } catch (error) {
    console.error('Failed to fetch resource metadata:', error)
    return null
  }
}
