import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-contentful-webhook-secret')
  const expectedSecret = process.env.CONTENTFUL_REVALIDATE_SECRET

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const contentType = body?.sys?.contentType?.sys?.id

    // Revalidate based on content type
    if (contentType === 'siteSettings' || contentType === 'navigationItem') {
      revalidateTag('settings')
    }

    // Always revalidate pages and contentful tags
    revalidateTag('pages')
    revalidateTag('contentful')

    return NextResponse.json({
      revalidated: true,
      contentType,
      timestamp: Date.now(),
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}
