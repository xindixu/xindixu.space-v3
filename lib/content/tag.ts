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

export type TTagId = `${string}-${string}`
export type TTags = { [key: string]: TTagId }
export type TTagQueries = { [key: string]: string }

type TTagGroup = { [key: string]: string[] }
type TTagNameKey = keyof typeof TAG_NAMES

const groupTags = (tags = TAGS): TTagGroup =>
  groupBy(tags, (tag) => tag.split("-")[0])
export const getAllTags = () => groupTags(TAGS)

export const getAllId = (key: string): TTagId => `${key}-all`
export const getName = (id: string) => {
  if (TAG_NAMES.hasOwnProperty(id)) {
    return TAG_NAMES[id as TTagNameKey]
  }
  return ""
}

export const getKey = (id: TTagId) => id.split("-")[0]
export const getValue = (id: TTagId) => id.split("-")[1]

export const getQuery = (object: TTags) =>
  Object.entries(object).reduce((memo, [key, value]) => {
    memo[key] = getValue(value)
    return memo
  }, {} as TTagQueries)

export const getTags = (query: TTagQueries) =>
  Object.entries(query).reduce((memo, [key, value]) => {
    memo[key as string] = `${key}-${value}`
    return memo
  }, {} as TTags)

export const getInitialSelectedTags = () => {
  const tagGroups = getAllTags()
  return Object.keys(tagGroups).reduce((memo, key) => {
    memo[key as string] = getAllId(key)
    return memo
  }, {} as TTags)
}

export const getSelectedTags = (tags: TTags) =>
  Object.entries(tags).reduce((memo, [key, value]) => {
    memo[key] = value
    return memo
  }, getInitialSelectedTags())

export const getTagParams = (tags: TTags) =>
  Object.values(tags).filter((tag) => !tag.endsWith("all"))
