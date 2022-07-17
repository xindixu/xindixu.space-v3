import React from "react"
import styled from "styled-components"
import { identity, pickBy } from "lodash"
import Group from "./group"

import { getAllTags, getAllId, getSelectedTags, TTags } from "lib/content/tag"
import styleSettings from "lib/style-settings"

const { spacerSm } = styleSettings
const Wrapper = styled.div`
  margin-bottom: -${spacerSm};
`

type TProps = {
  tags: TTags
  setTags: React.Dispatch<React.SetStateAction<TTags>>
}

const tagGroups = getAllTags()

const Filters = ({ tags, setTags }: TProps) => {
  const selectedTags = getSelectedTags(tags)

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
              setTags(
                (prevTags) =>
                  pickBy(
                    {
                      ...prevTags,
                      [key]: undefined,
                    },
                    identity
                  ) as TTags
              )
            }
            onSelect={(id) =>
              setTags(
                (prevTags) =>
                  pickBy(
                    {
                      ...prevTags,
                      [key]: id === allId ? undefined : id,
                    },
                    identity
                  ) as TTags
              )
            }
          />
        )
      })}
    </Wrapper>
  )
}

export default Filters
