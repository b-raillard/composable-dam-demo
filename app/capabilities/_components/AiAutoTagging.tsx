import { getAutoTags, triggerAutoTagging } from '@/lib/cloudinary/server'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AutoTaggingImage } from './AutoTaggingImage'

const DEMO_IMAGE = 'samples/landscapes/nature-mountains'

export async function AiAutoTagging() {
  let tags: { tag: string; confidence: number }[] = []

  try {
    tags = await getAutoTags(DEMO_IMAGE)

    // If no tags found, trigger analysis and retry
    if (tags.length === 0) {
      const triggered = await triggerAutoTagging(DEMO_IMAGE)
      if (triggered) {
        // Wait a moment for processing, then fetch again
        await new Promise(resolve => setTimeout(resolve, 2000))
        tags = await getAutoTags(DEMO_IMAGE)
      }
    }
  } catch {
    // Tags will remain empty if API call fails
  }

  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="overflow-hidden rounded-xl">
          <AutoTaggingImage publicId={DEMO_IMAGE} />
        </div>
        <div>
          <h3 className="heading-3">AI Auto-Tagging</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Cloudinary&apos;s AI Content Analysis automatically generates descriptive
            tags for your images. Useful for search, categorization, and accessibility.
          </p>

          {tags.length > 0 ? (
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-500 mb-3">
                Detected tags (using Cloudinary's color analysis):
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 15).map((t) => (
                  <span
                    key={t.tag}
                    className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700 border border-primary-200"
                  >
                    {t.tag}
                    <span className="ml-1.5 text-xs text-primary-400">
                      {Math.round(t.confidence * 100)}%
                    </span>
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-400">
                For advanced AI tagging (objects, scenes, activities), enable AWS Rekognition, Google Vision, or Imagga add-ons in your Cloudinary account.
              </p>
            </div>
          ) : (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-500">
              <p>
                Auto-tagging requires categorization add-ons (AWS Rekognition, Google Vision, or Imagga) enabled in
                your Cloudinary account. Tags will appear here once configured.
              </p>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
