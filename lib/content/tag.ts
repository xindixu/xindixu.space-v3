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

const AT = "at"
const TYPE = "type"

type TTagNames = keyof typeof TAG_NAMES
type TCategory = typeof AT | typeof TYPE
type TQueryParams = { [key in TCategory]: TTagNames }
type TQuery = { [key in TCategory]: string }

const groupTags = (tags = TAGS) => groupBy(tags, (tag) => tag.split("-")[0])

export const getAllTags = () => groupTags(TAGS)

export const getAllId = (key: string) => `${key}-all`
export const getName = (id: TTagNames) => TAG_NAMES[id]

export const getKey = (id: TTagNames): TCategory =>
  id.split("-")[0] as TCategory
export const getValue = (id: TTagNames) => id.split("-")[1]

export const getQuery = (object: TQueryParams) =>
  Object.entries(object).reduce((memo, [key, value]) => {
    memo[key as TCategory] = getValue(value)
    return memo
  }, {} as TQuery)
