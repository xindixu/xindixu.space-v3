import React from "react"
import PropTypes from "prop-types"
import { Box, Button, Text } from "grommet"
import { capitalize } from "lodash"
import { getAllId } from "./utils"

const DynamicButton = ({ selected, onClick, label }) => {
  const type = selected ? { primary: true } : { default: true }
  return <Button {...type} label={label} onClick={onClick} />
}

const Group = ({ groupName, values, selectedTag, onSelect, onDeselect }) => {
  const allId = getAllId(groupName)
  const selectedAll = selectedTag === allId

  return (
    <Box
      direction="row"
      align="center"
      gap="small"
      margin={{ bottom: "small" }}
    >
      <Text>{capitalize(groupName)}</Text>
      <DynamicButton
        label="All"
        selected={selectedAll}
        onClick={() => (selectedAll ? onDeselect(allId) : onSelect(allId))}
      />
      {values.map(({ id, name }) => {
        const selected = selectedTag === id
        return (
          <DynamicButton
            key={id}
            selected={selected}
            label={capitalize(`${name.split(":")[1]}`)}
            onClick={() => (selected ? onDeselect(id) : onSelect(id))}
          />
        )
      })}
    </Box>
  )
}

Group.propTypes = {}

export default Group
