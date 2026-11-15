import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context: APIContext) {
  const allEntries = await getCollection('entries');

  // RSS includes polished entries
  const polishedEntries = allEntries
    .filter((entry) => entry.data.stage === 'polished')
    .sort((a, b) => {
      const dateA = a.data.published ?? a.data.created;
      const dateB = b.data.published ?? b.data.created;
      return dateB.getTime() - dateA.getTime();
    });

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site || 'https://not-by-design.github.io',
    items: polishedEntries.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.published ?? entry.data.created,
      description: `Domain: ${entry.data.domain} | Type: ${entry.data.type}`,
      link: `/entries/${entry.id}`,
    })),
  });
}
