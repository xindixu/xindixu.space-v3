import React from "react"
import PropTypes from "prop-types"
import { identity, pickBy } from "lodash"
import Group from "./group"
import { getAllId } from "./utils"
import { getAllTags } from "lib/content/tag"

const Filters = ({ tags, setTags }) => {
  const tagGroups = getAllTags()

  const initialSelectedTags = Object.keys(tagGroups).reduce((memo, key) => {
    memo[key] = getAllId(key)
    return memo
  }, {})

  const selectedTags = Object.entries(tags).reduce((memo, [key, value]) => {
    memo[key] = value
    return memo
  }, initialSelectedTags)

  return Object.entries(tagGroups).map(([key, ids]) => {
    const allId = getAllId(key)

    return (
      <Group
        key={key}
        groupName={key}
        selectedTagId={selectedTags[key]}
        ids={ids}
        onDeselect={() =>
          setTags((prevTags) =>
            pickBy(
              {
                ...prevTags,
                [key]: undefined,
              },
              identity
            )
          )
        }
        onSelect={(id) =>
          setTags((prevTags) =>
            pickBy(
              {
                ...prevTags,
                [key]: id === allId ? undefined : id,
              },
              identity
            )
          )
        }
      />
    )
  })
}

Filters.propTypes = {
  tags: PropTypes.object.isRequired,
  setTags: PropTypes.func.isRequired,
}

export default Filters
