import React from "react"
import styled, { css } from "styled-components"
import { kebabCase, get } from "lodash"
import { Grid, Box, Text, Paragraph, Heading as BaseHeading } from "grommet"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import BaseImage from "next/image"
import styleSettings from "lib/style-settings"
import { color } from "lib/style-settings/utils"

const { PINK, GREEN, spacerBase, spacerLg } = styleSettings

const embeddedContentCss = css`
  position: absolute;
  border: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Code = styled.code`
  font-size: 87.5%;
  color: ${color(GREEN)};
  word-break: break-word;
`
const List = styled.ul``
const ListItem = styled.li`
  &::marker {
    color: ${color(PINK)};
  }
`
const Video = styled.video`
  display: block;
  visibility: visible;
  width: 100%;
  height: auto;
`

const EmbedWrapper = styled(Box)`
  ${({ ratio }) => `
    padding-bottom: ${ratio}%;
  `}
  position: relative;
  max-width: 100%;
`

const IFrame = styled.iframe`
  ${embeddedContentCss}
`
const Embed = styled.embed`
  ${embeddedContentCss}
`

const Heading = styled(BaseHeading)`
  padding-top: calc(${spacerBase} + ${spacerLg});
  margin-top: calc(-${spacerBase} - ${spacerLg});
  pointer-events: none;
`

const Image = ({ file, alt }) => {
  const { url, details } = file
  const { width, height } = details?.image || {}

  return (
    <BaseImage
      src={`https:${url}`}
      layout="responsive"
      width={width}
      height={height}
      alt={alt}
    />
  )
}
const Description = ({ description }) => (
  <Text color="dark-2" size="small" margin={{ bottom: "small" }}>
    {description}
  </Text>
)

const EmbeddedImage = ({ description, title, file }) => (
  <Box margin={{ bottom: "medium" }}>
    <Description description={description} />
    <Image file={file} alt={title} />
  </Box>
)

const EmbeddedVideo = ({ url, title, description }) => (
  <Box margin={{ bottom: "medium" }}>
    <Description description={description} />
    <Video controls name={title} playsinline src={`https:${url}`} />
  </Box>
)

const EmbeddedEmbed = ({ description, title, url, width, height }) => (
  <Box margin={{ bottom: "medium" }}>
    <Description description={description} />
    <EmbedWrapper ratio={Math.round((height / width) * 100)}>
      <Embed name={title} type="application/pdf" src={url} />
    </EmbedWrapper>
  </Box>
)

const EmbeddedIFrame = ({ description, title, url, width, height }) => (
  <Box margin={{ bottom: "medium" }}>
    <Description description={description} />
    <EmbedWrapper ratio={Math.round((height / width) * 100)}>
      <IFrame name={title} type="application/pdf" src={url} />
    </EmbedWrapper>
  </Box>
)

const EmbeddedImages = ({ title, columns, images }) => (
  <Box margin={{ bottom: "medium" }}>
    <Grid
      gap="small"
      columns={{
        count: columns,
        size: "auto",
      }}
    >
      {images.map(({ fields }) => (
        <Image key={fields.title} file={fields.file} alt={title} />
      ))}
    </Grid>
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
    [BLOCKS.UL_LIST]: (_, children) => <List>{children}</List>,
    [BLOCKS.LIST_ITEM]: (_, children) => <ListItem>{children}</ListItem>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, file, description } = get(node, "data.target.fields")
      const { url, contentType } = file
      if (contentType.startsWith("image")) {
        return (
          <EmbeddedImage description={description} title={title} file={file} />
        )
      }

      if (contentType.startsWith("video")) {
        return (
          <EmbeddedVideo url={url} title={title} description={description} />
        )
      }

      return null
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const { fields, sys } = get(node, "data.target")
      const type = get(sys, "contentType.sys.id")

      if (type === "pdf") {
        const { media, height, width, title } = fields
        const { file, description } = media.fields
        const { url } = file
        return (
          <EmbeddedEmbed
            url={`https:${url}`}
            title={title}
            description={description}
            height={height}
            width={width}
          />
        )
      }

      if (type === "youtube") {
        const { title, url, description } = fields
        return (
          <EmbeddedIFrame
            title={title}
            url={url}
            description={description}
            height={9}
            width={16}
          />
        )
      }

      if (type === "html") {
        const { title, images, columns } = fields
        return (
          <EmbeddedImages title={title} images={images} columns={columns} />
        )
      }

      return null
    },
  },
}

const RichText = ({ mainContent }) =>
  documentToReactComponents(mainContent, options)

export default RichText
