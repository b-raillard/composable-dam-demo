import { getSiteSettings } from '@/lib/contentful/queries'
import { Container } from '@/components/ui/Container'

export async function Footer() {
  const settings = await getSiteSettings()

  return (
    <footer className="bg-gray-900 text-gray-400">
      <Container>
        <div className="py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white text-lg">
                {settings?.siteName || 'DAM Demo'}
              </p>
              {settings?.footerText && (
                <p className="mt-1 text-sm">{settings.footerText}</p>
              )}
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span>Powered by</span>
              <a
                href="https://cloudinary.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary-400 transition-colors"
              >
                Cloudinary
              </a>
              <a
                href="https://contentful.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary-400 transition-colors"
              >
                Contentful
              </a>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary-400 transition-colors"
              >
                Vercel
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Composable DAM Demo. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
