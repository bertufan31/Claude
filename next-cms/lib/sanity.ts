import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = '2024-01-01'

/**
 * Sanity client — only created when NEXT_PUBLIC_SANITY_PROJECT_ID is set.
 * If not set, all fetch functions return null and static fallback data is used.
 */
export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null

const builder = projectId
  ? imageUrlBuilder({ projectId, dataset })
  : null

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder?.image(source)
}

/** Fetch all published projects from Sanity */
export async function fetchProjects() {
  if (!sanityClient) return null
  return sanityClient.fetch(`
    *[_type == "project"] | order(year desc) {
      _id, title, "slug": slug.current,
      category, year, tagline, description, featured,
      "colorAccent": colorAccent
    }
  `)
}

/** Fetch all published posts */
export async function fetchPosts() {
  if (!sanityClient) return null
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id, title, "slug": slug.current,
      excerpt, publishedAt, readTime
    }
  `)
}

/** Fetch all founders */
export async function fetchFounders() {
  if (!sanityClient) return null
  return sanityClient.fetch(`
    *[_type == "founder"] | order(order asc) {
      _id, name, role, bio, image, order
    }
  `)
}
