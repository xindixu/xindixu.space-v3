import type { Document } from "@contentful/rich-text-types"
import { get } from "lodash"
import { IProjectFields, TParsedProject } from "./types"
import { client } from "./index"

const PAGE_SIZE = 10

type ProjectEntry = {
  fields: IProjectFields
  metadata: { tags: ReadonlyArray<{ sys: { id: string } }> }
}

type ProjectCollection = {
  items: ProjectEntry[]
  total: number
}

const parseProjectEntry = ({
  fields,
  metadata,
}: ProjectEntry): TParsedProject => ({
  created: fields.created,
  demoLink: fields.demoLink,
  description: (fields.description || {}) as Document,
  devices: {
    src: String(get(fields.devices, "fields.file.url") ?? ""),
    width: Number(get(fields.devices, "fields.file.details.image.width")) || 0,
    height:
      Number(get(fields.devices, "fields.file.details.image.height")) || 0,
  },
  end: fields.end,
  labels: fields.labels || [],
  name: fields.name,
  repoLink: fields.repoLink,
  slug: fields.slug,
  start: fields.start,
  tags: metadata.tags.map(({ sys }) => sys.id),
  thumbnail: {
    src: String(get(fields.devices, "fields.file.url") ?? ""),
    width: Number(get(fields.devices, "fields.file.details.image.width")) || 0,
    height:
      Number(get(fields.devices, "fields.file.details.image.height")) || 0,
  },
})

const parseProjectEntries = (entries: ProjectCollection | undefined) =>
  entries?.items?.map(parseProjectEntry)

export async function getAllProjects({
  page: queryPage = "1",
  tags = [],
}: {
  page?: string
  tags?: string[]
}) {
  const page = parseInt(queryPage, 10)

  const params: Record<string, string | number> = {
    content_type: "work",
    limit: PAGE_SIZE,
    order: "-fields.created",
    skip: PAGE_SIZE * (page - 1),
  }

  if (tags.length > 0) {
    params["metadata.tags.sys.id[all]"] = tags.join(",")
  }

  const entries = (await client.getEntries(
    params
  )) as unknown as ProjectCollection

  return {
    entries: parseProjectEntries(entries) ?? [],
    page,
    totalPages: Math.ceil(entries.total / PAGE_SIZE),
  }
}

export async function getProject({ slug }: { slug: string }) {
  const entries = (await client.getEntries({
    content_type: "work",
    limit: 1,
    "fields.slug[in]": slug,
  })) as unknown as ProjectCollection

  return parseProjectEntries(entries)?.[0]
}

export async function getAllProjectSlugs() {
  const entries = (await client.getEntries({
    content_type: "work",
    select: ["fields.slug"],
  })) as unknown as { items: { fields: { slug: string } }[] }

  return entries.items.map(({ fields: { slug } }) => slug)
}
