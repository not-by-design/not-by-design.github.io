export const SITE_TITLE = 'Not by Design';
export const SITE_DESCRIPTION = 'An independent publication covering Technology, PPE, and Arts & Letters.';
export const SITE_URL = 'https://not-by-design.github.io';

export const DOMAINS = {
  technology: {
    label: 'Technology',
    slug: 'technology',
    category: 'technology',
    description: 'Software architecture, systems, code, and demos',
  },
  'econ-philosophy': {
    label: 'PPE',
    slug: 'econ-philosophy',
    category: 'ppe',
    description: 'PPE',
  },
  ppe: {
    label: 'PPE',
    slug: 'ppe',
    category: 'ppe',
    description: 'PPE',
  },
  commentary: {
    label: 'Commentary',
    slug: 'commentary',
    category: 'arts-letters',
    description: 'Appraisals and criticism on film, television, and media',
  },
  creative: {
    label: 'Creative',
    slug: 'creative',
    category: 'arts-letters',
    description: 'Creative writing, fiction, poetry, and character studies',
  },
} as const;

export const DOMAIN_CATEGORIES = {
  technology: {
    label: 'Technology',
    slug: 'technology',
  },
  ppe: {
    label: 'PPE',
    slug: 'ppe',
  },
  'arts-letters': {
    label: 'Arts & Letters',
    slug: 'arts-letters',
  },
} as const;

export const STAGES = {
  polished: {
    label: 'Release',
    pluralLabel: 'Releases',
    filterLabel: 'Releases',
    slug: 'polished',
  },
  draft: {
    label: 'Rough cut',
    pluralLabel: 'Rough cuts',
    filterLabel: 'Rough cuts',
    slug: 'draft',
  },
} as const;
