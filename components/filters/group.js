import React from "react"
import PropTypes from "prop-types"
import { Box, Button, Text, Select } from "grommet"
import { capitalize } from "lodash"
import { useMedia } from "react-use"
import styled from "styled-components"
import { getAllId, getName } from "./utils"
import { mediaQuery } from "lib/style-settings/media-query"
import styleSettings from "lib/style-settings"

const { spacerLg } = styleSettings

const DynamicButton = ({ selected, onClick, label }) => {
  const isSmUp = useMedia(mediaQuery.screenSmAndUp)

  const type = selected ? { primary: true } : { default: true }
  return (
    <Button
      {...type}
      label={label}
      onClick={onClick}
      size={isSmUp ? "medium" : "small"}
    />
  )
}

const FixedWidthText = styled(Text)`
  width: ${spacerLg};
`

const FullWidthSelect = styled.div`
  width: 100%;
  &&& {
    button {
      width: 100%;
    }
  }
`

const Group = ({ groupName, ids, selectedTagId, onSelect, onDeselect }) => {
  const allId = getAllId(groupName)
  const selectedAll = selectedTagId === allId

  const isSmUp = useMedia(mediaQuery.screenSmAndUp)

  return (
    <Box
      direction="row"
      align="center"
      margin={{ bottom: "small" }}
      fill="horizontal"
    >
      <FixedWidthText margin={{ right: "small" }}>
        {capitalize(groupName)}
      </FixedWidthText>
      {isSmUp ? (
        <Box gap="small" direction="row">
          <DynamicButton
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
      ) : (
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
            options={ids}
            onChange={({ option }) => onSelect(option)}
          >
            {(option) => (
              <Box pad={{ vertical: "small", horizontal: "medium" }}>
                {capitalize(getName(option))}
              </Box>
            )}
          </Select>
        </FullWidthSelect>
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
