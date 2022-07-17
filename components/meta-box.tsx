import React from "react"
import Link from "next/link"
import { Box, Text, Anchor } from "grommet"
import { formatDuration } from "utils/datetime"
import { getName } from "lib/content/tag"

type TProps = {
  tags: string[]
  start: string
  end: string
}

const MetaBox = ({ tags, start, end }: TProps) => (
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

export default MetaBox
