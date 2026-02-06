'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import 'next-cloudinary/dist/cld-video-player.css'

const CldVideoPlayer = dynamic(
  () => import('next-cloudinary').then((mod) => mod.CldVideoPlayer),
  { ssr: false }
)

const DEMO_VIDEO = 'samples/sea-turtle'

const qualityLevels = [
  { label: 'Auto', quality: 'auto', resolution: 'Adaptive', description: 'Cloudinary selects optimal quality' },
  { label: '1080p', quality: 100, resolution: '1920×1080', description: 'Full HD - High bandwidth' },
  { label: '720p', quality: 70, resolution: '1280×720', description: 'HD - Medium bandwidth' },
  { label: '480p', quality: 50, resolution: '854×480', description: 'SD - Low bandwidth' },
  { label: '240p', quality: 30, resolution: '426×240', description: 'Very Low - Minimal bandwidth' },
]

export function VideoPlayerDemo() {
  const [selectedQuality, setSelectedQuality] = useState(qualityLevels[0])
  const [playerKey, setPlayerKey] = useState(0)
  const [actualResolution, setActualResolution] = useState<{ width: number; height: number } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleQualityChange = (quality: typeof qualityLevels[0]) => {
    setSelectedQuality(quality)
    setIsLoading(true)
    setActualResolution(null)
    setPlayerKey(prev => prev + 1)
  }

  // Detect actual video resolution from the video element
  useEffect(() => {
    const checkVideoResolution = () => {
      const videoElement = document.querySelector('.video-player-container video') as HTMLVideoElement
      if (videoElement && videoElement.videoWidth > 0) {
        setActualResolution({
          width: videoElement.videoWidth,
          height: videoElement.videoHeight
        })
        setIsLoading(false)
        return true
      }
      return false
    }

    // Poll for video element and resolution
    const interval = setInterval(() => {
      if (checkVideoResolution()) {
        clearInterval(interval)
      }
    }, 200)

    // Also listen for loadedmetadata event
    const handleMetadata = () => {
      checkVideoResolution()
    }

    const videoElement = document.querySelector('.video-player-container video') as HTMLVideoElement
    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', handleMetadata)
    }

    return () => {
      clearInterval(interval)
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', handleMetadata)
      }
    }
  }, [playerKey])

  const getQualityLabel = useCallback(() => {
    if (!actualResolution) return null
    const { height } = actualResolution
    if (height >= 1080) return '1080p'
    if (height >= 720) return '720p'
    if (height >= 480) return '480p'
    if (height >= 360) return '360p'
    return '240p'
  }, [actualResolution])

  return (
    <SectionWrapper background="dark">
      <div className="text-center mb-12">
        <h2 className="heading-2">Adaptive Video Streaming</h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Cloudinary delivers video at different quality levels based on bandwidth.
          Use the buttons below to simulate different network conditions.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Quality selector buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {qualityLevels.map((level) => (
            <button
              key={level.label}
              onClick={() => handleQualityChange(level)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedQuality.label === level.label
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>

        {/* Real-time quality indicator */}
        <div className="flex justify-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-gray-800/80 backdrop-blur rounded-2xl px-6 py-4">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${isLoading ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></span>
              <span className="text-gray-300 text-sm">Requested:</span>
              <span className="text-white font-semibold">{selectedQuality.label}</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
            <div className="flex items-center gap-3">
              <span className="text-gray-300 text-sm">Actual Resolution:</span>
              {isLoading ? (
                <span className="text-yellow-400 font-semibold animate-pulse">Loading...</span>
              ) : actualResolution ? (
                <span className="text-green-400 font-semibold">
                  {actualResolution.width} × {actualResolution.height}
                  <span className="ml-2 text-xs text-gray-400">({getQualityLabel()})</span>
                </span>
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </div>
          </div>
        </div>

        {/* Video player */}
        <div className="rounded-xl overflow-hidden shadow-2xl video-player-container">
          <CldVideoPlayer
            key={playerKey}
            src={DEMO_VIDEO}
            width={1920}
            height={1080}
            sourceTypes={['mp4']}
            transformation={{
              quality: selectedQuality.quality,
            }}
            colors={{
              accent: '#3b82f6',
              base: '#1e293b',
              text: '#ffffff',
            }}
            fontFace="Inter"
            muted
            controls
          />
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-primary-400 font-semibold text-lg">On-the-fly Transcoding</p>
            <p className="mt-2 text-gray-400 text-sm">
              Quality changes are applied instantly via URL parameters
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-primary-400 font-semibold text-lg">Bandwidth Optimization</p>
            <p className="mt-2 text-gray-400 text-sm">
              Lower quality = smaller file = faster loading on slow connections
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-primary-400 font-semibold text-lg">Single Source</p>
            <p className="mt-2 text-gray-400 text-sm">
              Upload once, Cloudinary generates all quality variants
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
