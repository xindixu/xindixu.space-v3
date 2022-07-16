import { get } from "lodash"
import { client } from "./index"
import { THtml } from "./types"

const parseImageCollage = ({ fields }) => ({
  images: fields.images.map((image) => ({
    src: get(image, "fields.file.url") || "",
    width: get(image, "fields.file.details.image.width") || 0,
    height: get(image, "fields.file.details.image.height") || 0,
  })),
  title: fields.title,
  columns: fields.columns,
})

const parseImageCollages = (entries) => entries?.items?.map(parseImageCollage)

export async function getImageCollage({ title }) {
  const entries = await client.getEntries<THtml>({
    content_type: "html",
    limit: 1,
    "fields.title[in]": title,
  })

  return parseImageCollages(entries)[0]
}
