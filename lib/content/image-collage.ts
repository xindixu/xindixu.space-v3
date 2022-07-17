import { get } from "lodash"
import { IHtmlFields } from "./types"
import { client } from "./index"

const parseImageCollage = ({ fields }: { fields: IHtmlFields }) => ({
  images: fields.images.map((image) => ({
    src: get(image, "fields.file.url") || "",
    width: get(image, "fields.file.details.image.width") || 0,
    height: get(image, "fields.file.details.image.height") || 0,
  })),
  title: fields.title,
  columns: fields.columns,
})

export async function getImageCollage({ title }: { title: string }) {
  const entries = await client.getEntries<IHtmlFields>({
    content_type: "html",
    limit: 1,
    "fields.title[in]": title,
  })

  // @ts-expect-error contentful
  return parseImageCollage(entries?.items[0])
}
