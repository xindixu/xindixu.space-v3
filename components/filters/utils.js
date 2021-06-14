const tagNameById = {
  "at-all": "All",
  "at-pingboard": "Pingboard",
  "at-nokia": "Nokia",
  "at-personal": "Personal",
  "at-ut": "UT - Austin",
  "type-all": "All",
  "type-development": "Development",
  "type-advertising": "Advertising",
}

export const getAllId = (key) => `${key}-all`
export const getName = (id) => tagNameById[id]
export const getKey = (id) => id.split("-")[0]
