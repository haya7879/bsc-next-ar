import { MetadataRoute } from 'next'
import { DOMAIN } from '@/constants/domain'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
    //   userAgent: '*',
    //   allow: '/',
    },
    sitemap: `${DOMAIN}/sitemap_index.xml`,
  } 
}
