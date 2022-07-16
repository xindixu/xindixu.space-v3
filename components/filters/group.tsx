import React from "react"
import PropTypes from "prop-types"
import { Box, Button, Text, Select } from "grommet"
import { capitalize } from "lodash"
import styled from "styled-components"
import { getAllId, getName } from "./utils"
import useMedia from "hooks/use-media"
import styleSettings from "lib/style-settings"

const { spacerLg } = styleSettings

const DynamicButton = ({ selected, onClick, label }) => {
  const type = selected ? { primary: true } : { default: true }
  return (
    <Button
      {...type}
      label={label}
      onClick={onClick}
      size="medium"
      margin={{ bottom: "small" }}
    />
  )
}

const FixedWidthText = styled(Box).attrs({
  align: "center",
  direction: "row",
})`
  width: ${spacerLg};
  height: 100%;
`

const FullWidthSelect = styled.div`
  width: 100%;
  &&& {
    & > button {
      width: 100%;
    }
  }
`

const ButtonFilter = ({
  allId,
  ids,
  onDeselect,
  onSelect,
  selectedAll,
  selectedTagId,
}) => (
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

const SelectFilter = ({ allId, ids, onSelect, selectedTagId }) => (
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

const Group = ({ groupName, ids, selectedTagId, onSelect, onDeselect }) => {
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

Group.propTypes = {
  groupName: PropTypes.string.isRequired,
  ids: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  selectedTagId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
}

export default Group
