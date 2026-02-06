import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <p className="text-6xl font-bold text-primary-600">404</p>
        <h1 className="mt-4 heading-2">Page not found</h1>
        <p className="mt-4 body-large max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Button href="/">Back to home</Button>
        </div>
      </div>
    </div>
  )
}
