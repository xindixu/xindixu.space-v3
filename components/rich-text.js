import React from "react"
import styled from "styled-components"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Paragraph, Heading } from "grommet"
import styleSettings from "lib/style-settings"

const { pink, focus } = styleSettings

const Code = styled.code`
  font-size: 87.5%;
  color: ${focus};
  word-break: break-word;
`
const ULList = styled.ul``
const ListItem = styled.li`
  &::marker {
    color: ${pink};
  }
`

const options = {
  renderMark: {
    [MARKS.CODE]: (text) => <Code>{text}</Code>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => <Paragraph fill>{children}</Paragraph>,
    [BLOCKS.HEADING_1]: (_, children) => (
      <Heading level={2}>{children}</Heading>
    ),
    [BLOCKS.UL_LIST]: (_, children) => <ULList>{children}</ULList>,
    [BLOCKS.LIST_ITEM]: (_, children) => <ListItem>{children}</ListItem>,
  },
}

const RichText = ({ document }) => documentToReactComponents(document, options)

export default RichText
