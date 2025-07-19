import { z, defineCollection } from 'astro:content';

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string(),
    role: z.string(),
    duration: z.string(),
    year: z.string(),
    tags: z.array(z.string()),
    team: z.string().optional(),
    technologies: z.array(z.string()),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    // Case study specific metadata
    problemStatement: z.string(),
    outcome: z.string(),
    keyMetrics: z.array(z.object({
      metric: z.string(),
      value: z.string(),
      description: z.string().optional()
    })).optional(),
    // Optional sections
    research: z.boolean().default(false),
    userTesting: z.boolean().default(false),
    visualDesign: z.boolean().default(false),
    implementation: z.boolean().default(false),
  })
});

export const collections = {
  'case-studies': caseStudies,
};