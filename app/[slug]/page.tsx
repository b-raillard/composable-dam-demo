import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageBySlug, getAllPageSlugs } from '@/lib/contentful/queries'
import { getPublicId } from '@/lib/cloudinary/helpers'
import { SectionRenderer } from '@/components/sections/SectionRenderer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPageSlugs()
    return slugs
      .filter((slug) => slug !== 'home')
      .map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
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

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return <SectionRenderer sections={page.sections} />
}
