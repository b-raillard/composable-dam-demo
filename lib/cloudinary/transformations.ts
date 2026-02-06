/** Preset transformation configs for common use cases */

export const heroTransform = {
  width: 1920,
  height: 1080,
  crop: 'fill' as const,
  gravity: 'auto' as const,
  quality: 'auto' as const,
  format: 'auto' as const,
  sizes: '100vw',
}

export const galleryTransform = {
  width: 800,
  height: 600,
  crop: 'fill' as const,
  gravity: 'auto' as const,
  quality: 'auto' as const,
  format: 'auto' as const,
  sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}

export const featureIconTransform = {
  width: 400,
  height: 400,
  crop: 'fill' as const,
  gravity: 'auto' as const,
  quality: 'auto' as const,
  format: 'auto' as const,
  sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
}

export const thumbnailTransform = {
  width: 300,
  height: 300,
  crop: 'thumb' as const,
  gravity: 'auto' as const,
  quality: 'auto' as const,
  format: 'auto' as const,
  sizes: '300px',
}

export const ogImageTransform = {
  width: 1200,
  height: 630,
  crop: 'fill' as const,
  gravity: 'auto' as const,
  quality: 80,
  format: 'jpg' as const,
}

export const aiDemoTransform = {
  width: 800,
  height: 600,
  crop: 'fill' as const,
  quality: 'auto' as const,
  format: 'auto' as const,
  sizes: '(max-width: 768px) 100vw, 50vw',
}

export const videoPlayerDefaults = {
  width: 1920,
  height: 1080,
  colors: {
    accent: '#3b82f6',
    base: '#1e293b',
    text: '#ffffff',
  },
  fontFace: 'Inter',
}
