import { DOMAIN } from '@/constants/domain'
import { NextResponse } from 'next/server'
import { getBlogs } from '@/services/blogs/blogs-services'

export async function GET() {
  const baseUrl = DOMAIN
  
  try {
    const allBlogs: Blog[] = []
    let currentPage = 1
    let hasMorePages = true
    const currentDate = new Date().toISOString().split('T')[0]

    // جلب جميع المدونات عبر pagination
    while (hasMorePages) {
      const blogsData = await getBlogs(currentPage)
      if (blogsData?.blogs?.data) {
        allBlogs.push(...blogsData.blogs.data)
        
        // التحقق من وجود صفحات أخرى
        if (blogsData.blogs.last_page && currentPage < blogsData.blogs.last_page) {
          currentPage++
        } else {
          hasMorePages = false
        }
      } else {
        hasMorePages = false
      }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allBlogs.map(blog => {
  const lastmod = blog.created_at 
    ? new Date(blog.created_at).toISOString().split('T')[0]
    : currentDate
  return `    <url>
        <loc>${baseUrl}/blogs/${blog.slug}</loc>
        <lastmod>${lastmod}</lastmod>
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
    console.error('Error generating blogs sitemap:', error)
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
