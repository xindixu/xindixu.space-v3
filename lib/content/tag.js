import { groupBy } from "lodash"

const PAGE_SIZE = 20

const TAGS = ["at-pingboard", "at-nokia", "at-personal", "type-development"]

const groupTags = (tags) => groupBy(tags, (tag) => tag.split("-")[0])

export const getAllTags = () => groupTags(TAGS)
