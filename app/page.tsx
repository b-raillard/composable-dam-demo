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

  const [heroSection, ...remainingSections] = page.sections

  return (
    <>
      <SectionRenderer sections={[heroSection]} />

      {/* Built with Claude — injected between hero and capabilities */}
      <section className="relative bg-[#0d0d0d] text-white overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.08)_0%,_transparent_70%)] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-5">
            Built with AI
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-white">
            This entire POC was crafted with Claude
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed">
            Every line of code — from the Contentful content model and Cloudinary
            integrations to the Next.js components and this very page — was
            written collaboratively with{' '}
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 font-semibold hover:text-amber-300 transition-colors"
            >
              Claude by Anthropic
            </a>
            . No boilerplate was copy-pasted; each feature was designed and
            implemented through a real back-and-forth conversation.
          </p>
          <p className="text-sm text-gray-600">
            Proof that a composable DAM demo can go from idea to production in a single session.
          </p>
        </div>
      </section>

      <SectionRenderer sections={remainingSections} />
    </>
  )
}
