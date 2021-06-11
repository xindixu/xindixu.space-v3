import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Group from "./group"
import { getAllId } from "./utils"
import { getAllTags } from "lib/content/tag"

const Filters = ({ onChange }) => {
  const tagGroups = getAllTags()
  const [selectedTagIds, setSelectedTagIds] = useState(() =>
    Object.keys(tagGroups).reduce((memo, key) => {
      memo[key] = getAllId(key)
      return memo
    }, {})
  )

  useEffect(() => {
    onChange(Object.values(selectedTagIds).filter((id) => !id.endsWith("all")))
    // setState callback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTagIds])

  return Object.entries(tagGroups).map(([key, ids]) => {
    const allId = getAllId(key)

    return (
      <Group
        key={key}
        groupName={key}
        selectedTagId={selectedTagIds[key]}
        ids={ids}
        onDeselect={() =>
          setSelectedTagIds((prevSelectedTagIds) => ({
            ...prevSelectedTagIds,
            [key]: allId,
          }))
        }
        onSelect={(id) =>
          setSelectedTagIds((prevSelectedTagIds) => ({
            ...prevSelectedTagIds,
            [key]: id,
          }))
        }
      />
    )
  })
}

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default Filters
