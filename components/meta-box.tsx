import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { Box, Text, Anchor } from "grommet"
import { formatDuration } from "utils/datetime"
import { getName } from "lib/content/tag"

const MetaBox = ({ tags, start, end }) => (
  <Box>
    <Box direction="row" gap="small">
      {tags.map((id) => {
        const [key, value] = id.split("-")
        return (
          <Link
            key={id}
            href={{ pathname: "/projects", query: { [key]: value } }}
            passHref
          >
            <Anchor label={getName(id)} color="brand" />
          </Link>
        )
      })}
    </Box>
    <Text size="small" color="text-weak">
      {formatDuration({ start, end })}
    </Text>
  </Box>
)

MetaBox.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
}

export default MetaBox
