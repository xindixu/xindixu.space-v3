import * as CFRichTextTypes from "@contentful/rich-text-types"
import * as Contentful from "contentful"

export interface IHtmlFields {
  title: Contentful.EntryFields.Symbol
  images: Contentful.Asset[]
  columns: Contentful.EntryFields.Integer
}

export type THtml = Contentful.Entry<IHtmlFields>

export interface IPdfFields {
  title: Contentful.EntryFields.Symbol
  media: Contentful.Asset
  width: Contentful.EntryFields.Number
  height: Contentful.EntryFields.Number
}

export type TPdf = Contentful.Entry<IPdfFields>

export interface IProjectFields {
  created: Contentful.EntryFields.Date
  demoLink?: Contentful.EntryFields.Symbol
  description: CFRichTextTypes.Document
  devices: Contentful.Asset
  end: Contentful.EntryFields.Date
  labels: Contentful.EntryFields.Symbol[]
  name: Contentful.EntryFields.Symbol
  repoLink?: Contentful.EntryFields.Symbol
  slug: Contentful.EntryFields.Symbol
  start: Contentful.EntryFields.Date
  thumbnail?: Contentful.Asset
}

export type TProject = Contentful.Entry<IProjectFields>

export type TParsedProject = Omit<IProjectFields, "devices" | "thumbnail"> & {
  devices: {
    src: string
    width: number
    height: number
  }
  thumbnail: {
    src: string
    width: number
    height: number
  }
  tags: string[]
}

export interface IYoutubeFields {
  title: Contentful.EntryFields.Symbol
  url: Contentful.EntryFields.Symbol
  description: Contentful.EntryFields.Text
}

export type TYoutube = Contentful.Entry<IYoutubeFields>
