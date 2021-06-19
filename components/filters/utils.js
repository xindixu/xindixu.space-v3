const tagNameById = {
  "at-all": "All",
  "at-pingboard": "Pingboard",
  "at-nokia": "Nokia",
  "at-personal": "Personal",
  "at-ut": "UT - Austin",
  "at-daikin": "Daikin",
  "type-all": "All",
  "type-development": "Development",
  "type-advertising": "Advertising",
  "type-crafts": "Crafts",
}

export const getAllId = (key) => `${key}-all`
export const getName = (id) => tagNameById[id]
export const getKey = (id) => id.split("-")[0]
export const getValue = (id) => id.split("-")[1]
export const getQuery = (object) =>
  Object.entries(object).reduce((memo, [key, value]) => {
    memo[key] = getValue(value)
    return memo
  }, {})
