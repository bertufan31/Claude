/**
 * Sanity Studio Schema Definitions
 *
 * To use: create a Sanity project at https://sanity.io
 * and paste these schemas into your studio's schema.ts
 *
 * Free tier: 100k API req/month, 5GB storage, 2 users — enough for an agency site.
 */

export const projectSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title',       type: 'string',  title: 'Title',         validation: (r: any) => r.required() },
    { name: 'slug',        type: 'slug',    title: 'Slug',          options: { source: 'title' }, validation: (r: any) => r.required() },
    { name: 'tagline',     type: 'string',  title: 'Tagline'        },
    { name: 'description', type: 'text',    title: 'Description'    },
    { name: 'year',        type: 'string',  title: 'Year'           },
    { name: 'featured',    type: 'boolean', title: 'Featured?',     initialValue: false },
    {
      name: 'category',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'UI/UX',    value: 'UI/UX'    },
          { title: 'Research', value: 'Research'  },
          { title: 'AI',       value: 'AI'        },
          { title: 'Intent',   value: 'Intent'    },
        ],
      },
    },
    {
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: { hotspot: true },
    },
    { name: 'colorAccent', type: 'string', title: 'CSS Accent Color (optional)', description: 'e.g. rgba(200,255,0,0.15)' },
  ],
  orderings: [
    { title: 'Year (newest)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
}

export const postSchema = {
  name: 'post',
  title: 'Journal Post',
  type: 'document',
  fields: [
    { name: 'title',       type: 'string',   title: 'Title',           validation: (r: any) => r.required() },
    { name: 'slug',        type: 'slug',     title: 'Slug',            options: { source: 'title' }, validation: (r: any) => r.required() },
    { name: 'excerpt',     type: 'text',     title: 'Excerpt'          },
    { name: 'publishedAt', type: 'datetime', title: 'Published At'     },
    { name: 'readTime',    type: 'string',   title: 'Read Time',       description: 'e.g. "6 min"' },
    {
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    },
  ],
}

export const founderSchema = {
  name: 'founder',
  title: 'Founder',
  type: 'document',
  fields: [
    { name: 'name',  type: 'string', title: 'Name',          validation: (r: any) => r.required() },
    { name: 'role',  type: 'string', title: 'Role / Title'   },
    { name: 'bio',   type: 'text',   title: 'Bio'            },
    { name: 'order', type: 'number', title: 'Display Order'  },
    {
      name: 'image',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
    },
  ],
}

export const serviceSchema = {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'num',         type: 'string', title: 'Number (e.g. 01)' },
    { name: 'name',        type: 'string', title: 'Name'             },
    { name: 'tag',         type: 'string', title: 'Tag / Category'   },
    { name: 'description', type: 'text',   title: 'Description'      },
    { name: 'order',       type: 'number', title: 'Display Order'    },
  ],
}

// Export all schemas as an array for Sanity Studio
export default [projectSchema, postSchema, founderSchema, serviceSchema]
