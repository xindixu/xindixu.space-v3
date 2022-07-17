import React from "react"
import { Box } from "grommet"
import DynamicButton from "./dynamic-button"
import { getName } from "lib/content/tag"

type TProps = {
  allId: string
  ids: string[]
  onDeselect: (id: string) => void
  onSelect: (id: string) => void
  selectedAll: boolean
  selectedTagId: string
}

const ButtonFilter = ({
  allId,
  ids,
  onDeselect,
  onSelect,
  selectedAll,
  selectedTagId,
}: TProps) => (
  <Box gap="small" direction="row" wrap>
    <DynamicButton
      key="all-button"
      label="All"
      onClick={() => (selectedAll ? onDeselect(allId) : onSelect(allId))}
      selected={selectedAll}
    />
    {ids.map((id) => {
      const selected = selectedTagId === id
      return (
        <DynamicButton
          key={id}
          selected={selected}
          label={getName(id)}
          onClick={() => (selected ? onDeselect(id) : onSelect(id))}
        />
      )
    })}
  </Box>
)

export default ButtonFilter
