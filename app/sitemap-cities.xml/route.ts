import { DOMAIN } from '@/constants/domain'
import { NextResponse } from 'next/server'
import { getCities } from '@/services/cities/cities-services'

export async function GET() {
  const baseUrl = DOMAIN
  
  try {
    const cities = await getCities()
    const currentDate = new Date().toISOString().split('T')[0]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${cities.map(city => {
  const lastmod = city.updated_at 
    ? new Date(city.updated_at).toISOString().split('T')[0]
    : currentDate
  return `    <url>
        <loc>${baseUrl}/training-cities/${city.slug}</loc>
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
    console.error('Error generating cities sitemap:', error)
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
