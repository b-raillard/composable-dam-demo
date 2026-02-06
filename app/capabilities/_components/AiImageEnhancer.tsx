import { BeforeAfterSlider } from '@/components/media/BeforeAfterSlider'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const ORIGINAL_IMAGE = 'underexposed-1_1_e3qzmz'
const ENHANCED_IMAGE = 'underexposed-1_2_sk4ph5'

export function AiImageEnhancer() {
  return (
    <SectionWrapper background="gray">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="heading-3">AI Image Enhancement</h3>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Automatically enhance underexposed or low-quality images using AI.
            The enhancement algorithm adjusts exposure, contrast, and colors
            to produce a visually improved result.
          </p>
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-primary-500" />
              Single URL parameter: <code className="bg-gray-100 px-2 py-0.5 rounded">e_enhance</code>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-primary-500" />
              Fixes underexposed images automatically
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-primary-500" />
              Improves contrast and color balance
            </div>
          </div>
        </div>
        <div>
          <BeforeAfterSlider
            publicId={ORIGINAL_IMAGE}
            afterPublicId={ENHANCED_IMAGE}
            alt="AI Enhancement"
            width={800}
            height={600}
            beforeLabel="Original"
            afterLabel="Enhanced"
          />
        </div>
      </div>
    </SectionWrapper>
  )
}
