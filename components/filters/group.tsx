import React from "react"
import { Box, Text } from "grommet"
import { capitalize } from "lodash"
import styled from "styled-components"
import useMedia from "hooks/use-media"
import { getAllId } from "lib/content/tag"
import styleSettings from "lib/style-settings"
import ButtonFilter from "./button-filter"
import SelectFilter from "./select-filter"

const { spacerLg } = styleSettings

const FixedWidthText = styled(Box).attrs({
  align: "center",
  direction: "row",
})`
  width: ${spacerLg};
  height: 100%;
`
type TProps = {
  groupName: string
  ids: string[]
  onDeselect: (id: string) => void
  onSelect: (id: string) => void
  selectedTagId: string
}

const Group = ({
  groupName,
  ids,
  onDeselect,
  onSelect,
  selectedTagId,
}: TProps) => {
  const allId = getAllId(groupName)
  const selectedAll = selectedTagId === allId

  const isSmUp = useMedia("sm")

  return (
    <Box direction="row" align="center" fill="horizontal" gap="small">
      <FixedWidthText>
        <Text margin={{ bottom: "small" }}>{capitalize(groupName)}</Text>
      </FixedWidthText>
      {isSmUp ? (
        <ButtonFilter
          allId={allId}
          ids={ids}
          onDeselect={onDeselect}
          onSelect={onSelect}
          selectedAll={selectedAll}
          selectedTagId={selectedTagId}
        />
      ) : (
        <SelectFilter
          allId={allId}
          ids={ids}
          onSelect={onSelect}
          selectedTagId={selectedTagId}
        />
      )}
    </Box>
  )
}

export default Group
