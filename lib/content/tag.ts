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

const TAG_NAMES = {
  "at-columbia": "Columbia",
  "at-all": "All",
  "at-pingboard": "Pingboard",
  "at-nokia": "Nokia",
  "at-personal": "Personal",
  "at-ut": "UT - Austin",
  "at-daikin": "Daikin",
  "type-all": "All",
  "type-development": "Software",
  "type-advertising": "Advertising",
  "type-crafts": "Crafts",
}

type TTag = keyof typeof TAG_NAMES

export type TTagQuery = { [key: string]: string }
type TGroup = { [key: string]: string[] }

const groupTags = (tags = TAGS): TGroup =>
  groupBy(tags, (tag) => tag.split("-")[0])
export const getAllTags = () => groupTags(TAGS)

export const getAllId = (key: string) => `${key}-all`
export const getName = (id: string) => {
  if (TAG_NAMES.hasOwnProperty(id)) {
    return TAG_NAMES[id as TTag]
  }
  return ""
}

export const getKey = (id: string) => id.split("-")[0]
export const getValue = (id: string) => id.split("-")[1]

export const getQuery = (object: TTagQuery) =>
  Object.entries(object).reduce((memo, [key, value]) => {
    memo[key] = getValue(value)
    return memo
  }, {} as TTagQuery)
