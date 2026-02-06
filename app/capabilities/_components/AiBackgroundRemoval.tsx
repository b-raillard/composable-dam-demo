import { BeforeAfterSlider } from '@/components/media/BeforeAfterSlider'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const DEMO_IMAGE = 'samples/people/smiling-man'

export function AiBackgroundRemoval() {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="heading-3">AI Background Removal</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Automatically detect and remove image backgrounds using AI.
            Powered by Cloudinary&apos;s AI Background Removal add-on, it works
            with any image - no manual masking required.
          </p>
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-primary-500" />
              Single URL parameter: <code className="bg-gray-100 px-2 py-0.5 rounded">e_background_removal</code>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-primary-500" />
              Works with complex backgrounds
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-primary-500" />
              Combine with other transformations
            </div>
          </div>
        </div>
        <div>
          <BeforeAfterSlider
            publicId={DEMO_IMAGE}
            alt="Background removal"
            width={800}
            height={800}
            beforeLabel="Original"
            afterLabel="Background Removed"
            removeBackground
          />
        </div>
      </div>
    </SectionWrapper>
  )
}
