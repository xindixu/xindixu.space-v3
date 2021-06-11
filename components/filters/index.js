import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Group from "./group"
import { getAllId } from "./utils"
import { getAllTags } from "lib/content/tag"

const Filters = ({ onChange }) => {
  const tagGroups = getAllTags()
  const [selectedTags, setSelectedTags] = useState(() =>
    Object.keys(tagGroups).reduce((memo, key) => {
      memo[key] = getAllId(key)
      return memo
    }, {})
  )

  useEffect(() => {
    onChange(selectedTags)
  }, [selectedTags])

  return Object.entries(tagGroups).map(([key, values]) => {
    const allId = getAllId(key)

    return (
      <Group
        key={key}
        groupName={key}
        selectedTag={selectedTags[key]}
        values={values}
        onDeselect={() =>
          setSelectedTags((prevSelectedTags) => ({
            ...prevSelectedTags,
            [key]: allId,
          }))
        }
        onSelect={(id) =>
          setSelectedTags((prevSelectedTags) => ({
            ...prevSelectedTags,
            [key]: id,
          }))
        }
      />
    )
  })
}

Filters.propTypes = {}

export default Filters
