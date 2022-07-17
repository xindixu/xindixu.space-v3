import React from "react"
import styled from "styled-components"
import { Box, Select } from "grommet"
import { getName } from "lib/content/tag"

type TProps = {
  allId: string
  ids: string[]
  onSelect: (id: string) => void
  selectedTagId: string
}

const FullWidthSelect = styled.div`
  width: 100%;
  &&& {
    & > button {
      width: 100%;
    }
  }
`

const SelectFilter = ({ allId, ids, onSelect, selectedTagId }: TProps) => (
  <FullWidthSelect>
    <Select
      size="medium"
      name="select"
      placeholder="Select"
      value={selectedTagId}
      valueLabel={
        <Box
          fill
          margin={{ vertical: "small", horizontal: "medium" }}
          round="large"
        >
          {getName(selectedTagId) || "Select..."}
        </Box>
      }
      options={[allId, ...ids]}
      onChange={({ option }) => onSelect(option)}
      margin={{ bottom: "small" }}
    >
      {(option) => (
        <Box pad={{ vertical: "small", horizontal: "medium" }}>
          {getName(option)}
        </Box>
      )}
    </Select>
  </FullWidthSelect>
)

export default SelectFilter
