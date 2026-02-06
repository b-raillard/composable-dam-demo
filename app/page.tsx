import type { Metadata } from 'next'
import { getPageBySlug } from '@/lib/contentful/queries'
import { getPublicId } from '@/lib/cloudinary/helpers'
import { SectionRenderer } from '@/components/sections/SectionRenderer'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('home')
  if (!page) return {}

  const ogPublicId = getPublicId(page.ogImage)
  const ogImageUrl = ogPublicId
    ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_1200,h_630,c_fill,q_80,f_jpg/${ogPublicId}`
    : undefined

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription,
    openGraph: ogImageUrl ? { images: [{ url: ogImageUrl }] } : undefined,
  }
}

export default async function HomePage() {
  const page = await getPageBySlug('home')

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="heading-2 mb-4">Welcome to Composable DAM Demo</h1>
          <p className="body-large max-w-xl mx-auto">
            Create a &quot;home&quot; page in Contentful to get started, or visit{' '}
            <a href="/capabilities" className="text-primary-600 hover:underline">
              /capabilities
            </a>{' '}
            to see Cloudinary features in action.
          </p>
        </div>
      </div>
    )
  }

  return <SectionRenderer sections={page.sections} />
}
