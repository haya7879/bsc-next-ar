import { DOMAIN } from '@/constants/domain'
import { NextResponse } from 'next/server'
import { getSitemapData } from '@/services/sitemap/services'

export async function GET() {
  const baseUrl = DOMAIN
  
  try {
    const sitemapData = await getSitemapData()
    const currentDate = new Date().toISOString().split('T')[0]
    
    // جمع جميع الكورسات من city_course_seos
    const coursesMap = new Map<string, Course>()
    
    if (sitemapData.city_course_seos) {
      Object.values(sitemapData.city_course_seos).forEach((combinations) => {
        combinations.forEach(({ course }) => {
          if (course && course.slug) {
            coursesMap.set(course.slug, course)
          }
        })
      })
    }

    const courses = Array.from(coursesMap.values())

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${courses.map(course => {
  return `    <url>
        <loc>${baseUrl}/training-course/${course.slug}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
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
    console.error('Error generating courses sitemap:', error)
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
