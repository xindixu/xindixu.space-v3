import { get } from "lodash"
import { client } from "./index"

const PAGE_SIZE = 20

const parseProjectEntry = ({ fields }) => ({
  created: fields.created,
  description: fields.description || {},
  demoLink: fields.demoLink,
  repoLink: fields.repoLink,
  thumbnail: {
    src: get(fields.thumbnail, "fields.file.url") || "",
    width: get(fields.thumbnail, "fields.file.details.image.width") || 0,
    height: get(fields.thumbnail, "fields.file.details.image.height") || 0,
  },
  name: fields.name,
  slug: fields.slug,
  start: fields.start,
  end: fields.end,
  labels: fields.labels || [],
})

const parseProjectEntries = (entries) => entries?.items?.map(parseProjectEntry)

export async function getAllProjects({ page: queryPage, query, type } = {}) {
  const page = queryPage ? parseInt(queryPage, 10) : 1

  const entries = await client.getEntries({
    content_type: "work",
    "fields.types": type,
    limit: PAGE_SIZE,
    order: "-fields.created",
    skip: PAGE_SIZE * (page - 1),
    query,
  })

  return {
    entries: parseProjectEntries(entries),
    page,
    totalPages: Math.ceil(entries.total / PAGE_SIZE),
  }
}

export async function getProject({ slug }) {
  const entries = await client.getEntries({
    content_type: "work",
    limit: 1,
    "fields.slug[in]": slug,
  })

  return parseProjectEntries(entries)[0]
}

export async function getAllProjectSlugs() {
  const entries = await client.getEntries({
    content_type: "work",
    select: "fields.slug",
  })
  return entries.items.map(({ fields: { slug } }) => slug)
}
