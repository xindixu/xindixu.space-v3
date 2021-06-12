import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Box, Button, Text, Select, ResponsiveContext } from "grommet"
import { capitalize } from "lodash"
import styled from "styled-components"
import { getAllId, getName } from "./utils"
import styleSettings from "lib/style-settings"

const { spacerLg } = styleSettings

const DynamicButton = ({ selected, onClick, label }) => {
  const type = selected ? { primary: true } : { default: true }
  return <Button {...type} label={label} onClick={onClick} size="medium" />
}

const FixedWidthText = styled.div`
  width: ${spacerLg};
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
  <Box gap="small" direction="row">
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
          label={capitalize(getName(id))}
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
          {capitalize(getName(selectedTagId)) || "Select..."}
        </Box>
      }
      options={[allId, ...ids]}
      onChange={({ option }) => onSelect(option)}
    >
      {(option) => (
        <Box pad={{ vertical: "small", horizontal: "medium" }}>
          {capitalize(getName(option))}
        </Box>
      )}
    </Select>
  </FullWidthSelect>
)

const Group = ({ groupName, ids, selectedTagId, onSelect, onDeselect }) => {
  const allId = getAllId(groupName)
  const selectedAll = selectedTagId === allId

  const size = useContext(ResponsiveContext)

  return (
    <Box
      direction="row"
      align="center"
      margin={{ bottom: "small" }}
      fill="horizontal"
      gap="small"
    >
      <FixedWidthText>
        <Text>{capitalize(groupName)}</Text>
      </FixedWidthText>
      {size === "small" ? (
        <SelectFilter
          allId={allId}
          ids={ids}
          onSelect={onSelect}
          selectedTagId={selectedTagId}
        />
      ) : (
        <ButtonFilter
          allId={allId}
          ids={ids}
          onDeselect={onDeselect}
          onSelect={onSelect}
          selectedAll={selectedAll}
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
