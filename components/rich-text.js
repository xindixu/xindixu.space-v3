import React from "react"
import styled from "styled-components"
import { get } from "lodash"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Paragraph, Heading } from "grommet"
import Image from "next/image"
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
const Video = styled.video`
  display: block;
  visibility: visible;
  width: 100%;
  height: auto;
`

const EmbeddedImage = ({ url, title, width, height }) => (
  <Image
    src={`https:${url}`}
    layout="responsive"
    width={width}
    height={height}
    alt={title}
  />
)

const EmbeddedVideo = ({ url, title }) => (
  <Video controls name={title} playsinline src={`https:${url}`} />
)

const options = {
  renderMark: {
    [MARKS.CODE]: (text) => <Code>{text}</Code>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => <Paragraph fill>{children}</Paragraph>,
    [BLOCKS.HEADING_1]: (_, children) => (
      <Heading level={2}>{children}</Heading>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <Heading level={3}>{children}</Heading>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <Heading level={4}>{children}</Heading>
    ),
    [BLOCKS.UL_LIST]: (_, children) => <ULList>{children}</ULList>,
    [BLOCKS.LIST_ITEM]: (_, children) => <ListItem>{children}</ListItem>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, file } = get(node, "data.target.fields")
      const { url, contentType, details } = file

      if (contentType.startsWith("image")) {
        const { width, height } = details?.image || {}

        return (
          <EmbeddedImage
            url={url}
            width={width}
            height={height}
            title={title}
          />
        )
      }

      if (contentType.startsWith("video")) {
        return <EmbeddedVideo url={url} title={title} />
      }

      return null
    },
  },
}

const RichText = ({ document }) => documentToReactComponents(document, options)

export default RichText
