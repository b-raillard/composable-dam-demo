import { CloudinaryVideo } from '@/components/media/CloudinaryVideo'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

const DEMO_VIDEO = 'samples/sea-turtle'

export function VideoPlayerDemo() {
  return (
    <SectionWrapper background="dark">
      <div className="text-center mb-12">
        <h2 className="heading-2">Adaptive Video Streaming</h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          HLS adaptive bitrate streaming with automatic quality adjustment.
          The video player adapts to the viewer&apos;s bandwidth for a smooth experience.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <CloudinaryVideo
            publicId={DEMO_VIDEO}
            width={1920}
            height={1080}
            sourceTypes={['mp4']}
            colors={{
              accent: '#3b82f6',
              base: '#1e293b',
              text: '#ffffff',
            }}
            fontFace="Inter"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-primary-400 font-semibold text-lg">Smart Delivery</p>
            <p className="mt-2 text-gray-400 text-sm">
              Automatic format and quality optimization
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-primary-400 font-semibold text-lg">Auto Transcoding</p>
            <p className="mt-2 text-gray-400 text-sm">
              Upload once, deliver in any format
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-primary-400 font-semibold text-lg">Video Transforms</p>
            <p className="mt-2 text-gray-400 text-sm">
              Crop, trim, overlay, and effects on the fly
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
