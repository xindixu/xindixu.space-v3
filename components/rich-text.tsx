import React, { ReactNode } from "react"
import styled, { css } from "styled-components"
import { kebabCase, get, random } from "lodash"
import { Grid, Box, Text, Paragraph, Heading as BaseHeading } from "grommet"
import {
  Block,
  BLOCKS,
  Document,
  Inline,
  MARKS,
} from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import BaseImage from "next/image"
import { IHtmlFields, IPdfFields, IYoutubeFields } from "../lib/content/types"
import styleSettings from "lib/style-settings"
import { color } from "lib/style-settings/utils"

const { PINK, spacerBase, spacerLg } = styleSettings

const embeddedContentCss = css`
  position: absolute;
  border: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Code = styled.code`
  color: ${color(PINK)};
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

const EmbedWrapper = styled(Box)<{ ratio: number }>`
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

type TExtra = {
  description: string
  title: string
}

type TImageFile = {
  url: string
  details: {
    image?: {
      width?: number
      height?: number
    }
  }
}

type TEmbedded = {
  height: number
  url: string
  width: number
} & TExtra

const Image = ({ alt, file }: { alt: string; file: TImageFile }) => {
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
const Description = ({ description }: { description: string }) => (
  <Text color="text-weak" size="small" margin={{ bottom: "small" }}>
    {description}
  </Text>
)

const EmbeddedImage = ({
  description,
  title,
  file,
}: {
  file: TImageFile
} & TExtra) => (
  <Box margin={{ bottom: "medium" }}>
    <Description description={description} />
    <Image file={file} alt={title} />
  </Box>
)

const EmbeddedVideo = ({
  description,
  title,
  url,
}: {
  url: string
} & TExtra) => (
  <Box margin={{ bottom: "medium" }}>
    <Description description={description} />
    <Video title={title} controls src={`https:${url}`} />
  </Box>
)

const EmbeddedEmbed = ({
  description,
  height,
  title,
  url,
  width,
}: TEmbedded) => (
  <Box margin={{ bottom: "medium" }}>
    <Description description={description} />
    <EmbedWrapper ratio={Math.round((height / width) * 100)}>
      <Embed title={title} type="application/pdf" src={url} />
    </EmbedWrapper>
  </Box>
)

const EmbeddedIFrame = ({
  description,
  height,
  title,
  url,
  width,
}: TEmbedded) => (
  <Box margin={{ bottom: "medium" }}>
    <Description description={description} />
    <EmbedWrapper ratio={Math.round((height / width) * 100)}>
      <IFrame name={title} src={url} />
    </EmbedWrapper>
  </Box>
)

const EmbeddedImages = ({
  columns,
  images,
  title,
}: {
  columns: number
  images: {
    fields: {
      title?: string
      file?: TImageFile
    }
  }[]
  title: string
}) => (
  <Box margin={{ bottom: "medium" }}>
    <Grid
      gap="small"
      columns={{
        count: columns,
        size: "auto",
      }}
    >
      {images
        .filter(
          ({ fields: { title: fieldTitle, file } }) => !!fieldTitle && !!file
        )
        .map(({ fields: { title: fieldTitle, file } }) => (
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          <Image key={fieldTitle!} file={file!} alt={title} />
        ))}
    </Grid>
  </Box>
)

const getId = (node: ReactNode) =>
  typeof node === "string" ? kebabCase(node) : `text-id-${random(false)}`

const options = {
  renderMark: {
    [MARKS.CODE]: (text: ReactNode) => <Code>{text}</Code>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: unknown, children: ReactNode) => (
      <Paragraph fill>{children}</Paragraph>
    ),
    [BLOCKS.HEADING_1]: (_: unknown, children: ReactNode) => (
      <Heading level={2} id={getId(children)}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_2]: (_: unknown, children: ReactNode) => (
      <Heading level={3} id={getId(children)}>
        {children}
      </Heading>
    ),
    [BLOCKS.HEADING_3]: (_: unknown, children: ReactNode) => (
      <Heading level={4} id={getId(children)}>
        {children}
      </Heading>
    ),
    [BLOCKS.UL_LIST]: (_: unknown, children: ReactNode) => (
      <List>{children}</List>
    ),
    [BLOCKS.LIST_ITEM]: (_: unknown, children: ReactNode) => (
      <ListItem>{children}</ListItem>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
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
    [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
      const { fields, sys } = get(node, "data.target")
      const type = get(sys, "contentType.sys.id")

      if (type === "pdf") {
        const { media, height, width, title } = fields as IPdfFields
        const { file, description } = media.fields
        const { url } = file || {}
        return (
          <EmbeddedEmbed
            url={url ? `https:${url}` : ""}
            title={title}
            description={description || ""}
            height={height}
            width={width}
          />
        )
      }

      if (type === "youtube") {
        const { title, url, description } = fields as IYoutubeFields
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
        const { title, images, columns } = fields as IHtmlFields
        return (
          <EmbeddedImages title={title} images={images} columns={columns} />
        )
      }

      return null
    },
  },
}

type TProps = {
  mainContent: Document
}

const RichText = ({ mainContent }: TProps) => (
  <>{documentToReactComponents(mainContent, options)}</>
)

export default RichText
