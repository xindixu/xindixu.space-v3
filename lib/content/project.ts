import { get } from "lodash"
import {
  EntryCollectionWithLinkResolutionAndWithUnresolvableLinks,
  EntryWithLinkResolutionAndWithUnresolvableLinks,
} from "contentful"

import { IProjectFields, TParsedProject } from "./types"
import { client } from "./index"

const PAGE_SIZE = 10

const parseProjectEntry = ({
  fields,
  metadata,
}: EntryWithLinkResolutionAndWithUnresolvableLinks<IProjectFields>): TParsedProject => ({
  created: fields.created,
  demoLink: fields.demoLink,
  description: fields.description || {},
  devices: {
    src: get(fields.devices, "fields.file.url", ""),
    width: get(fields.devices, "fields.file.details.image.width", 0),
    height: get(fields.devices, "fields.file.details.image.height", 0),
  },
  end: fields.end,
  labels: fields.labels || [],
  name: fields.name,
  repoLink: fields.repoLink,
  slug: fields.slug,
  start: fields.start,
  tags: metadata.tags.map(({ sys }) => sys.id),
  thumbnail: {
    src: get(fields.devices, "fields.file.url", ""),
    width: get(fields.devices, "fields.file.details.image.width", 0),
    height: get(fields.devices, "fields.file.details.image.height", 0),
  },
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
