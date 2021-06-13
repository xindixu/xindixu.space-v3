import React from "react"
import styled from "styled-components"
import { kebabCase, get } from "lodash"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Box, Text, Paragraph, Heading as BaseHeading } from "grommet"
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

const Heading = styled(BaseHeading)`
  padding-top: 72px;
  margin-top: -72px;
`

const Description = ({ description }) => (
  <Text color="dark-2" size="small" margin={{ bottom: "small" }}>
    {description}
  </Text>
)

const EmbeddedImage = ({ description, url, title, width, height }) => (
  <Box margin={{ bottom: "medium" }}>
    <Description description={description} />
    <Image
      src={`https:${url}`}
      layout="responsive"
      width={width}
      height={height}
      alt={title}
    />
  </Box>
)

const EmbeddedVideo = ({ url, title, description }) => (
  <Box margin={{ bottom: "medium" }}>
    <Description description={description} />
    <Video controls name={title} playsinline src={`https:${url}`} />
  </Box>
)

const options = {
  renderMark: {
    [MARKS.CODE]: (text) => <Code>{text}</Code>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => <Paragraph fill>{children}</Paragraph>,
    [BLOCKS.HEADING_1]: (_, children) => (
      <Heading level={2} id={kebabCase(children)}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <Heading level={3} id={kebabCase(children)}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <Heading level={4} id={kebabCase(children)}>
        {children}
      </Heading>
    ),
    [BLOCKS.UL_LIST]: (_, children) => <ULList>{children}</ULList>,
    [BLOCKS.LIST_ITEM]: (_, children) => <ListItem>{children}</ListItem>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, file, description } = get(node, "data.target.fields")
      const { url, contentType, details } = file

      if (contentType.startsWith("image")) {
        const { width, height } = details?.image || {}

        return (
          <EmbeddedImage
            description={description}
            height={height}
            title={title}
            url={url}
            width={width}
          />
        )
      }

      if (contentType.startsWith("video")) {
        return (
          <EmbeddedVideo url={url} title={title} description={description} />
        )
      }

      return null
    },
  },
}

const RichText = ({ mainContent }) =>
  documentToReactComponents(mainContent, options)

export default RichText
