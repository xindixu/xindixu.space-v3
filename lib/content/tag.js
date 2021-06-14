import { groupBy } from "lodash"

const TAGS = [
  "at-pingboard",
  "at-nokia",
  "at-personal",
  "at-ut",
  "type-development",
  "type-advertising",
]

const groupTags = (tags) => groupBy(tags, (tag) => tag.split("-")[0])

export const getAllTags = () => groupTags(TAGS)
