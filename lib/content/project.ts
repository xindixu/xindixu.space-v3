import { get } from "lodash"
import {
  EntryCollectionWithLinkResolutionAndWithUnresolvableLinks,
  EntryWithLinkResolutionAndWithUnresolvableLinks,
} from "contentful"
import { IProjectFields } from "./types"
import { client } from "./index"

const PAGE_SIZE = 10

const parseProjectEntry = ({
  fields,
  metadata,
}: EntryWithLinkResolutionAndWithUnresolvableLinks<IProjectFields>) => ({
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

const parseProjectEntries = (
  entries: EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<IProjectFields>
) => entries?.items?.map(parseProjectEntry)

export async function getAllProjects({
  page: queryPage = "1",
  tags = [],
}: {
  page?: string
  tags?: string[]
}) {
  const page = parseInt(queryPage, 10)

  const params = {
    content_type: "work",
    limit: PAGE_SIZE,
    order: "-fields.created",
    skip: PAGE_SIZE * (page - 1),
  }

  if (tags.length > 0) {
    // @ts-expect-error contentful
    params["metadata.tags.sys.id[all]"] = tags.join(",")
  }

  const entries = await client.getEntries<IProjectFields>(params)

  return {
    entries: parseProjectEntries(entries),
    page,
    totalPages: Math.ceil(entries.total / PAGE_SIZE),
  }
}

export async function getProject({ slug }: { slug: string }) {
  const entries = await client.getEntries<IProjectFields>({
    content_type: "work",
    limit: 1,
    "fields.slug[in]": slug,
  })

  return parseProjectEntries(entries)[0]
}

export async function getAllProjectSlugs() {
  const entries = await client.getEntries<IProjectFields>({
    content_type: "work",
    // @ts-expect-error contentful
    select: "fields.slug",
  })

  return entries.items.map(({ fields: { slug } }) => slug)
}
