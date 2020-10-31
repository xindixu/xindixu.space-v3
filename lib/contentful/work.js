import { format, parseISO } from "date-fns";
import { client } from "./index";

const PAGE_SIZE = 20;

const parseWorkEntry = ({ fields }) => ({
  created: fields.created,
  description: fields.description || {},
  demoLink: fields.demoLink,
  repoLink: fields.repoLink,
  thumbnail: fields.thumbnail,
  name: fields.name,
  slug: fields.slug,
  start: fields.start,
  end: fields.end,
  labels: fields.labels || [],
});

const parseWorkEntries = (entries) => entries?.items?.map(parseWorkEntry);

export async function getAllWorks({ page: queryPage, query, type } = {}) {
  const page = queryPage ? parseInt(queryPage) : 1;

  const entries = await client.getEntries({
    content_type: "work",
    "fields.types": type,
    limit: PAGE_SIZE,
    order: "-fields.created",
    skip: PAGE_SIZE * (page - 1),
    query,
  });

  return {
    entries: parseWorkEntries(entries),
    page,
    totalPages: Math.ceil(entries.total / PAGE_SIZE),
  };
}
