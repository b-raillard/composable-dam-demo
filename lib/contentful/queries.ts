import { unstable_cache } from 'next/cache'
import { getContentfulClient, isContentfulConfigured } from './client'
import type {
  PageSkeleton,
  SiteSettingsSkeleton,
  ResolvedPage,
  ResolvedSection,
  ResolvedSectionHero,
  ResolvedSectionFeatureGrid,
  ResolvedSectionMediaGallery,
  ResolvedSectionVideo,
  ResolvedSectionAiDemo,
  ResolvedSectionRichText,
  ResolvedFeatureItem,
  ResolvedSiteSettings,
  ResolvedNavigationItem,
} from '@/types/contentful'
import type { CloudinaryField } from '@/types/cloudinary'
import type { Entry } from 'contentful'

const REVALIDATE = parseInt(process.env.REVALIDATE_DEFAULT || '3600', 10)

function resolveSection(entry: Entry): ResolvedSection | null {
  const contentType = entry.sys.contentType?.sys?.id
  if (!contentType) return null

  switch (contentType) {
    case 'sectionHero': {
      const fields = entry.fields as Record<string, unknown>
      return {
        id: entry.sys.id,
        contentType: 'sectionHero',
        headline: (fields.headline as string) || '',
        subheadline: fields.subheadline as string | undefined,
        ctaText: fields.ctaText as string | undefined,
        ctaUrl: fields.ctaUrl as string | undefined,
        backgroundType: fields.backgroundType as string | undefined,
        backgroundMedia: fields.backgroundMedia as CloudinaryField | undefined,
        overlayOpacity: fields.overlayOpacity as number | undefined,
      } satisfies ResolvedSectionHero
    }

    case 'sectionFeatureGrid': {
      const fields = entry.fields as Record<string, unknown>
      const featureEntries = (fields.features as Entry[] | undefined) || []
      const features: ResolvedFeatureItem[] = featureEntries
        .filter((f) => f?.fields)
        .map((f) => {
          const ff = f.fields as Record<string, unknown>
          return {
            id: f.sys.id,
            title: (ff.title as string) || '',
            description: (ff.description as string) || '',
            image: ff.image as CloudinaryField | undefined,
            link: ff.link as string | undefined,
          }
        })

      return {
        id: entry.sys.id,
        contentType: 'sectionFeatureGrid',
        headline: fields.headline as string | undefined,
        subheadline: fields.subheadline as string | undefined,
        features,
        columns: fields.columns as number | undefined,
      } satisfies ResolvedSectionFeatureGrid
    }

    case 'sectionMediaGallery': {
      const fields = entry.fields as Record<string, unknown>
      return {
        id: entry.sys.id,
        contentType: 'sectionMediaGallery',
        headline: fields.headline as string | undefined,
        mediaItems: (fields.mediaItems as CloudinaryField) || [],
        layout: fields.layout as string | undefined,
        columns: fields.columns as number | undefined,
      } satisfies ResolvedSectionMediaGallery
    }

    case 'sectionVideo': {
      const fields = entry.fields as Record<string, unknown>
      return {
        id: entry.sys.id,
        contentType: 'sectionVideo',
        headline: fields.headline as string | undefined,
        description: fields.description as string | undefined,
        video: (fields.video as CloudinaryField) || [],
        posterImage: fields.posterImage as CloudinaryField | undefined,
        enableStreaming: fields.enableStreaming as boolean | undefined,
        playerTheme: fields.playerTheme as string | undefined,
        autoplay: fields.autoplay as boolean | undefined,
        loop: fields.loop as boolean | undefined,
      } satisfies ResolvedSectionVideo
    }

    case 'sectionAiDemo': {
      const fields = entry.fields as Record<string, unknown>
      return {
        id: entry.sys.id,
        contentType: 'sectionAiDemo',
        headline: fields.headline as string | undefined,
        description: fields.description as string | undefined,
        demoType: (fields.demoType as string) || '',
        sourceImage: (fields.sourceImage as CloudinaryField) || [],
        aiParameters: fields.aiParameters as Record<string, unknown> | undefined,
        showBeforeAfter: fields.showBeforeAfter as boolean | undefined,
      } satisfies ResolvedSectionAiDemo
    }

    case 'sectionRichText': {
      const fields = entry.fields as Record<string, unknown>
      return {
        id: entry.sys.id,
        contentType: 'sectionRichText',
        headline: fields.headline as string | undefined,
        body: fields.body as ResolvedSectionRichText['body'],
      } satisfies ResolvedSectionRichText
    }

    default:
      return null
  }
}

export const getPageBySlug = unstable_cache(
  async (slug: string, preview = false): Promise<ResolvedPage | null> => {
    if (!isContentfulConfigured()) return null
    const client = getContentfulClient(preview)

    const response = await client.getEntries<PageSkeleton>({
      content_type: 'page',
      'fields.slug': slug,
      include: 3,
      limit: 1,
    })

    const entry = response.items[0]
    if (!entry) return null

    const fields = entry.fields as Record<string, unknown>
    const sectionEntries = (fields.sections as Entry[] | undefined) || []

    const sections: ResolvedSection[] = sectionEntries
      .map(resolveSection)
      .filter((s): s is ResolvedSection => s !== null)

    return {
      title: (fields.title as string) || '',
      slug: (fields.slug as string) || '',
      seoTitle: fields.seoTitle as string | undefined,
      seoDescription: fields.seoDescription as string | undefined,
      ogImage: fields.ogImage as CloudinaryField | undefined,
      sections,
    }
  },
  ['page-by-slug'],
  { revalidate: REVALIDATE, tags: ['contentful', 'pages'] }
)

export const getAllPageSlugs = unstable_cache(
  async (): Promise<string[]> => {
    if (!isContentfulConfigured()) return []
    const client = getContentfulClient()

    const response = await client.getEntries<PageSkeleton>({
      content_type: 'page',
      select: ['fields.slug'],
      limit: 100,
    })

    return response.items
      .map((entry) => {
        const fields = entry.fields as Record<string, unknown>
        return fields.slug as string
      })
      .filter(Boolean)
  },
  ['all-page-slugs'],
  { revalidate: REVALIDATE, tags: ['contentful', 'pages'] }
)

export const getSiteSettings = unstable_cache(
  async (preview = false): Promise<ResolvedSiteSettings | null> => {
    if (!isContentfulConfigured()) return null
    const client = getContentfulClient(preview)

    const response = await client.getEntries<SiteSettingsSkeleton>({
      content_type: 'siteSettings',
      include: 2,
      limit: 1,
    })

    const entry = response.items[0]
    if (!entry) return null

    const fields = entry.fields as Record<string, unknown>
    const navEntries = (fields.navigation as Entry[] | undefined) || []

    const navigation: ResolvedNavigationItem[] = navEntries
      .filter((n) => n?.fields)
      .map((n) => {
        const nf = n.fields as Record<string, unknown>
        return {
          label: (nf.label as string) || '',
          href: (nf.href as string) || '',
          openInNewTab: nf.openInNewTab as boolean | undefined,
          order: nf.order as number | undefined,
        }
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

    return {
      siteName: (fields.siteName as string) || 'DAM Demo',
      logo: fields.logo as CloudinaryField | undefined,
      navigation,
      footerText: fields.footerText as string | undefined,
    }
  },
  ['site-settings'],
  { revalidate: REVALIDATE, tags: ['contentful', 'settings'] }
)
