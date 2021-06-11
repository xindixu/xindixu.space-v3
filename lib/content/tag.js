import { groupBy } from "lodash"

const PAGE_SIZE = 20

const TAGS = [
  { name: "at:pingboard", id: "at-pingboard" },
  { name: "at:nokia", id: "at-nokia" },
  { name: "at:personal", id: "at-personal" },
  { name: "type:development", id: "type-development" },
]

const groupTags = (tags) => groupBy(tags, (tag) => tag.id.split("-")[0])

export const getAllTags = () => groupTags(TAGS)
