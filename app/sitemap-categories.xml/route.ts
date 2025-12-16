import { DOMAIN } from '@/constants/domain'
import { NextResponse } from 'next/server'
import { getCategories } from '@/services/categories/categories-services'

export async function GET() {
  const baseUrl = DOMAIN
  
  try {
    const categories = await getCategories()
    const currentDate = new Date().toISOString().split('T')[0]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${categories.map(category => {
  const lastmod = category.updated_at 
    ? new Date(category.updated_at).toISOString().split('T')[0]
    : currentDate
  return `    <url>
        <loc>${baseUrl}/training-courses/${category.slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.85</priority>
    </url>`
}).join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating categories sitemap:', error)
    // إرجاع sitemap فارغ في حالة الخطأ
    return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`, {
      headers: { 
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  }
}
