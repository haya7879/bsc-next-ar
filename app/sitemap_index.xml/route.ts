import { DOMAIN } from '@/constants/domain'
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = DOMAIN
  const currentDate = new Date().toISOString().split('T')[0]

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>${baseUrl}/sitemap-static.xml</loc>
        <lastmod>${currentDate}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${baseUrl}/sitemap-categories.xml</loc>
        <lastmod>${currentDate}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${baseUrl}/sitemap-cities.xml</loc>
        <lastmod>${currentDate}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${baseUrl}/sitemap-blogs.xml</loc>
        <lastmod>${currentDate}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${baseUrl}/sitemap-courses.xml</loc>
        <lastmod>${currentDate}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${baseUrl}/sitemap-category-city.xml</loc>
        <lastmod>${currentDate}</lastmod>
    </sitemap>
</sitemapindex>`

  return new NextResponse(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
