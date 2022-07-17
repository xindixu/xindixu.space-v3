// @ts-nocheck FIXME
import React from "react"
import styled from "styled-components"
import { identity, pickBy } from "lodash"
import Group from "./group"

import { getAllTags, getAllId, TTagQuery } from "lib/content/tag"
import styleSettings from "lib/style-settings"

const { spacerSm } = styleSettings
const Wrapper = styled.div`
  margin-bottom: -${spacerSm};
`

type TProps = {
  tags: TTagQuery
  setTags: React.Dispatch<React.SetStateAction<TTagQuery>>
}

const tagGroups = getAllTags()

const initialSelectedTags = Object.keys(tagGroups).reduce((memo, key) => {
  memo[key] = getAllId(key)
  return memo
}, {})

const Filters = ({ tags, setTags }: TProps) => {
  const selectedTags = Object.entries(tags).reduce((memo, [key, value]) => {
    memo[key] = value
    return memo
  }, initialSelectedTags)

  return (
    <Wrapper>
      {Object.entries(tagGroups).map(([key, ids]) => {
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
      })}
    </Wrapper>
  )
}

export default Filters
