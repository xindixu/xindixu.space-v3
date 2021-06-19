import { groupBy } from "lodash"

const TAGS = [
  "at-pingboard",
  "at-nokia",
  "at-ut",
  "at-personal",
  "at-daikin",
  "type-development",
  "type-advertising",
  "type-crafts",
]

const groupTags = (tags) => groupBy(tags, (tag) => tag.split("-")[0])

export const getAllTags = () => groupTags(TAGS)
