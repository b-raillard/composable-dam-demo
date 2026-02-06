import type { Metadata } from 'next'
import { ImageOptimizationDemo } from './_components/ImageOptimizationDemo'
import { TransformationShowcase } from './_components/TransformationShowcase'
import { VideoPlayerDemo } from './_components/VideoPlayerDemo'
import { AiBackgroundRemoval } from './_components/AiBackgroundRemoval'
import { AiGenerativeFill } from './_components/AiGenerativeFill'
import { AiContentAwareCrop } from './_components/AiContentAwareCrop'
import { AiObjectDetection } from './_components/AiObjectDetection'
import { AiAutoTagging } from './_components/AiAutoTagging'
import { AiGenerativeReplace } from './_components/AiGenerativeReplace'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Cloudinary Capabilities',
  description:
    'Explore the full range of Cloudinary capabilities: image optimization, transformations, video streaming, and AI-powered features.',
}

export default function CapabilitiesPage() {
  return (
    <div>
      {/* Page header */}
      <section className="bg-gradient-to-b from-primary-50 to-white section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-1">Cloudinary Capabilities</h1>
          <p className="mt-6 body-large max-w-3xl mx-auto">
            A comprehensive showcase of Cloudinary&apos;s image and video
            management features - from basic optimization to AI-powered
            transformations.
          </p>
          <nav className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              { label: 'Optimization', href: '#optimization' },
              { label: 'Transforms', href: '#transforms' },
              { label: 'Video', href: '#video' },
              { label: 'AI Features', href: '#ai' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full bg-white border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Image Optimization */}
      <div id="optimization">
        <ImageOptimizationDemo />
      </div>

      {/* Transformations */}
      <div id="transforms">
        <TransformationShowcase />
      </div>

      {/* Video Player */}
      <div id="video">
        <VideoPlayerDemo />
      </div>

      {/* AI Features */}
      <div id="ai">
        <section className="bg-gradient-to-b from-white to-primary-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="heading-2">AI-Powered Features</h2>
            <p className="mt-4 body-large max-w-2xl mx-auto">
              Cloudinary&apos;s AI capabilities transform how you manage and
              deliver media assets.
            </p>
          </div>
        </section>

        <AiBackgroundRemoval />
        <AiGenerativeFill />
        <AiContentAwareCrop />
        <AiObjectDetection />
        <AiAutoTagging />
        <AiGenerativeReplace />
      </div>
    </div>
  )
}
