import { DOMAIN } from '@/constants/domain'
import { NextResponse } from 'next/server'
import { getSitemapData } from '@/services/sitemap/services'

export async function GET() {
  const baseUrl = DOMAIN
  
  try {
    const sitemapData = await getSitemapData()
    const currentDate = new Date().toISOString().split('T')[0]
    
    const urls: Array<{ url: string; lastmod: string }> = []
    
    // إضافة تركيبات category + city من city_category_seos
    if (sitemapData.city_category_seos) {
      Object.values(sitemapData.city_category_seos).forEach((combinations) => {
        combinations.forEach(({ city, category }) => {
          if (city?.slug && category?.slug) {
            urls.push({
              url: `${baseUrl}/courses/${category.slug}/${city.slug}`,
              lastmod: currentDate,
            })
          }
        })
      })
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastmod }) => `    <url>
        <loc>${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.85</priority>
    </url>`).join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating category-city sitemap:', error)
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
