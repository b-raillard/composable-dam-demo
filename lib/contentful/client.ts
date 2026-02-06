import { createClient, type ContentfulClientApi } from 'contentful'

let deliveryClient: ContentfulClientApi<undefined> | null = null
let previewClient: ContentfulClientApi<undefined> | null = null

export function isContentfulConfigured(): boolean {
  return !!(process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN)
}

export function getContentfulClient(preview = false): ContentfulClientApi<undefined> {
  if (preview) {
    if (!previewClient) {
      previewClient = createClient({
        space: process.env.CONTENTFUL_SPACE_ID!,
        accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
        host: 'preview.contentful.com',
        environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
      })
    }
    return previewClient
  }

  if (!deliveryClient) {
    deliveryClient = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
      environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    })
  }
  return deliveryClient
}
