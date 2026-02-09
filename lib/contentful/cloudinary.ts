import { createClient } from 'contentful'

// Re-export types and helpers that can be used in client components
export type { CloudinaryAsset } from './helpers'
export { extractCloudinaryPublicId, buildCloudinaryUrl } from './helpers'

// Configuration du client Contentful
const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
})

/**
 * Récupère les entrées Contentful avec des assets Cloudinary
 * @param contentType - Le type de contenu Contentful
 * @param limit - Nombre maximum d'entrées à récupérer
 */
export async function getContentfulEntriesWithCloudinary<T = Record<string, any>>(
  contentType: string,
  limit = 10
) {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: contentType,
      limit,
    })

    return entries.items.map((item) => ({
      id: item.sys.id,
      createdAt: item.sys.createdAt,
      updatedAt: item.sys.updatedAt,
      fields: item.fields as T,
    }))
  } catch (error) {
    console.error('Error fetching Contentful entries:', error)
    return []
  }
}

/**
 * Récupère une entrée spécifique avec son asset Cloudinary
 * @param entryId - L'ID de l'entrée Contentful
 */
export async function getContentfulEntry<T = Record<string, any>>(entryId: string) {
  try {
    const entry = await contentfulClient.getEntry(entryId)

    return {
      id: entry.sys.id,
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
      fields: entry.fields as T,
    }
  } catch (error) {
    console.error('Error fetching Contentful entry:', error)
    return null
  }
}

