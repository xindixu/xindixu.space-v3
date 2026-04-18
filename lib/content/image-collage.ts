import { get } from "lodash"
import { IHtmlFields, TParsedHtml } from "./types"
import { client } from "./index"

type HtmlEntry = {
  fields: IHtmlFields
}

const parseImageCollage = ({ fields }: HtmlEntry): TParsedHtml => ({
  images: fields.images.map((image) => ({
    src: String(get(image, "fields.file.url") ?? ""),
    width: Number(get(image, "fields.file.details.image.width")) || 0,
    height: Number(get(image, "fields.file.details.image.height")) || 0,
  })),
  title: fields.title,
  columns: fields.columns,
})

export async function getImageCollage({ title }: { title: string }) {
  const entries = (await client.getEntries({
    content_type: "html",
    limit: 1,
    "fields.title[in]": title,
  })) as unknown as { items: HtmlEntry[] }

  const first = entries?.items?.[0]
  if (!first) {
    throw new Error(`No image collage found for title: ${title}`)
  }
  return parseImageCollage(first)
}
