'use client'

import { useState, useEffect } from 'react'
import { CldImage } from 'next-cloudinary'

const DEMO_IMAGE = 'samples/people/smiling-man'

interface Props {
  onClose: () => void
}

function LockIcon({ locked }: { locked: boolean }) {
  return locked ? (
    // Closed padlock
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ) : (
    // Open padlock
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  )
}

export function TransformationDemoModal({ onClose }: Props) {
  const [width, setWidth] = useState('640')
  const [height, setHeight] = useState('425')
  const [locked, setLocked] = useState(true)
  const [ratio, setRatio] = useState<number>(640 / 425)
  const [isFill, setIsFill] = useState(true)
  const [rounded, setRounded] = useState(false)
  const [rotate, setRotate] = useState(false)
  const [removeBg, setRemoveBg] = useState(false)
  const [bgPrompt, setBgPrompt] = useState('')
  const [debouncedBgPrompt, setDebouncedBgPrompt] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedBgPrompt(bgPrompt), 2000)
    return () => clearTimeout(timer)
  }, [bgPrompt])

  const parsedWidth = Math.max(50, Math.min(2000, parseInt(width) || 640))
  const parsedHeight = Math.max(50, Math.min(2000, parseInt(height) || 425))

  const cropMode = isFill ? 'fill' : 'scale'

  const trimmedBgPrompt = debouncedBgPrompt.trim()

  const rawTransformations: string[] = []
  if (rounded) rawTransformations.push('r_max')
  if (rotate) rawTransformations.push('a_20')
  if (trimmedBgPrompt) rawTransformations.push(`e_gen_background_replace:prompt_${trimmedBgPrompt}`)

  const previewKey = `${parsedWidth}-${parsedHeight}-${cropMode}-${removeBg}-${rawTransformations.join('_')}`

  const handleWidthChange = (val: string) => {
    setWidth(val)
    if (locked) {
      const newW = Math.max(50, Math.min(2000, parseInt(val) || 640))
      setHeight(String(Math.round(newW / ratio)))
    }
  }

  const handleToggleLock = () => {
    if (!locked) {
      setRatio(parsedWidth / parsedHeight)
    }
    setLocked((v) => !v)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="text-xl font-semibold text-gray-900">Transformation Demo</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row overflow-auto">

          {/* ── Form (left) ───────────────────────────────── */}
          <aside className="lg:w-80 shrink-0 p-6 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
              Parameters
            </p>

            {/* Dimensions + mode toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">
                  {isFill ? 'Crop — fill mode' : 'Resize — scale mode'}
                </p>
                {/* Fill / Scale toggle */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={!isFill}
                  onClick={() => setIsFill((v) => !v)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    isFill ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                  title={isFill ? 'Switch to resize (scale)' : 'Switch to crop (fill)'}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      isFill ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-3">
                {/* Width */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1" htmlFor="tf-width">
                    Width (px)
                  </label>
                  <input
                    id="tf-width"
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    min={50}
                    max={2000}
                    placeholder="640"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Height + lock */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-gray-500" htmlFor="tf-height">
                      Height (px)
                    </label>
                    <button
                      type="button"
                      onClick={handleToggleLock}
                      title={locked ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
                      className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                        locked
                          ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <LockIcon locked={locked} />
                      <span>{locked ? 'Locked' : 'Lock ratio'}</span>
                    </button>
                  </div>
                  <input
                    id="tf-height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    min={50}
                    max={2000}
                    placeholder="425"
                    disabled={locked}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      locked
                        ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300'
                    }`}
                  />
                  {locked && (
                    <p className="mt-1 text-xs text-primary-600">
                      Ratio {parsedWidth}:{parsedHeight} locked
                    </p>
                  )}
                </div>
              </div>

              {/* Mode hint */}
              <p className="mt-2 text-xs text-gray-400">
                {isFill
                  ? 'Fills the exact dimensions — may crop edges.'
                  : 'Fits within dimensions — preserves aspect ratio.'}
              </p>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 mb-5" />

            {/* Effects */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Effects</p>
              <div className="space-y-4">

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rounded}
                    onChange={(e) => setRounded(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-primary-600 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Round image
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">Circular crop (r_max)</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rotate}
                    onChange={(e) => setRotate(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-primary-600 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Rotate 20°
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">Counter-clockwise rotation</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={removeBg}
                    onChange={(e) => setRemoveBg(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-primary-600 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      Remove background
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">AI-powered background removal</p>
                  </div>
                </label>

              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 mb-5" />

            {/* Generative background */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-gray-700">Generative background</p>
                <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">AI</span>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                Describe a background to generate behind the subject.
              </p>
              <textarea
                value={bgPrompt}
                onChange={(e) => setBgPrompt(e.target.value)}
                placeholder="e.g. space with moon in background"
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
              />
              {bgPrompt.trim() !== debouncedBgPrompt.trim() && (
                <p className="mt-1 text-xs text-gray-400 animate-pulse">Waiting for you to stop typing…</p>
              )}
            </div>

            {/* Applied transformations summary */}
            <div className="mt-5 p-3 bg-primary-50 rounded-lg border border-primary-100">
              <p className="text-xs font-medium text-primary-700 mb-1">Applied</p>
              <code className="text-xs text-primary-600 break-all">
                c_{cropMode}, w_{parsedWidth}, h_{parsedHeight}
                {removeBg ? ', e_background_removal' : ''}
                {rawTransformations.length > 0 ? `, ${rawTransformations.join(', ')}` : ''}
              </code>

            </div>
          </aside>

          {/* ── Preview (right) ───────────────────────────── */}
          <div className="flex-1 p-6 flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
              Preview
            </p>

            <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-xl min-h-64 p-4">
              <CldImage
                key={previewKey}
                src={DEMO_IMAGE}
                alt="Transformation preview"
                width={parsedWidth}
                height={parsedHeight}
                crop={cropMode}
                gravity="auto"
                quality="auto"
                format="auto"
                removeBackground={removeBg}
                rawTransformations={rawTransformations.length > 0 ? rawTransformations : undefined}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>

            <p className="mt-3 text-sm text-gray-500 text-center">
              {parsedWidth} × {parsedHeight} px · {isFill ? 'crop/fill' : 'resize/scale'}
              {rounded ? ' · rounded' : ''}
              {rotate ? ' · rotated 20°' : ''}
              {removeBg ? ' · bg removed' : ''}
              {trimmedBgPrompt ? ` · gen bg: "${trimmedBgPrompt}"` : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
