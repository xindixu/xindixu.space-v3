import { get } from "lodash"
import { client } from "./index"

const PAGE_SIZE = 20

const parseProjectEntry = ({ fields, metadata }) => ({
  created: fields.created,
  description: fields.description || {},
  demoLink: fields.demoLink,
  repoLink: fields.repoLink,
  thumbnail: {
    src: get(fields.thumbnail, "fields.file.url") || "",
    width: get(fields.thumbnail, "fields.file.details.image.width") || 0,
    height: get(fields.thumbnail, "fields.file.details.image.height") || 0,
  },
  devices: {
    src: get(fields.devices, "fields.file.url") || "",
    width: get(fields.devices, "fields.file.details.image.width") || 0,
    height: get(fields.devices, "fields.file.details.image.height") || 0,
  },
  name: fields.name,
  slug: fields.slug,
  start: fields.start,
  end: fields.end,
  labels: fields.labels || [],
  tags: metadata.tags.map(({ sys }) => sys.id),
})

const parseProjectEntries = (entries) => entries?.items?.map(parseProjectEntry)

export async function getAllProjects({
  page: queryPage,
  query,
  type,
  tags = [],
} = {}) {
  const page = queryPage ? parseInt(queryPage, 10) : 1

  const params = {
    content_type: "work",
    "fields.types": type,
    limit: PAGE_SIZE,
    order: "-fields.start",
    skip: PAGE_SIZE * (page - 1),
    query,
  }

  if (tags.length > 0) {
    params["metadata.tags.sys.id[all]"] = tags.join(",")
  }

  const entries = await client.getEntries(params)

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
