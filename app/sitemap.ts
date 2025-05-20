import { getAllLinks } from '@/lib/contentstack'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_CONTENTSTACK_SITE_URL || 'https://veda-the-revival-collection-production.eu-contentstackapps.com'
  const sitemapEntries = await getAllLinks()

  return sitemapEntries.map((entry: string) => {
    return {
      url: `${baseUrl}${entry}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  })

}