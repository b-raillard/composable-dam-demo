import Link from 'next/link'
import { getSiteSettings } from '@/lib/contentful/queries'
import { getPublicId } from '@/lib/cloudinary/helpers'
import { CloudinaryImage } from '@/components/media/CloudinaryImage'
import { Navigation } from './Navigation'
import { Container } from '@/components/ui/Container'

const defaultNavItems = [
  { label: 'Home', href: '/', order: 0 },
  { label: 'Capabilities', href: '/capabilities', order: 1 },
]

export async function Header() {
  const settings = await getSiteSettings()

  const logoPublicId = settings?.logo ? getPublicId(settings.logo) : null
  const navItems = settings?.navigation?.length ? settings.navigation : defaultNavItems

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            {logoPublicId ? (
              <CloudinaryImage
                publicId={logoPublicId}
                alt={settings?.siteName || 'Logo'}
                width={40}
                height={40}
                crop="fit"
                className="h-10 w-auto"
              />
            ) : null}
            <span className="font-bold text-xl text-gray-900">
              {settings?.siteName || 'DAM Demo'}
            </span>
          </Link>

          <Navigation items={navItems} />
        </div>
      </Container>
    </header>
  )
}
