import { groupBy } from "lodash"

const TAGS = [
  "at-columbia",
  "at-pingboard",
  "at-personal",
  "at-ut",
  "at-nokia",
  "at-daikin",
  "type-development",
  "type-advertising",
  "type-crafts",
]

const groupTags = (tags = TAGS) => groupBy(tags, (tag) => tag.split("-")[0])

export const getAllTags = () => groupTags(TAGS)
