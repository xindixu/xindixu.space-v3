import * as CFRichTextTypes from "@contentful/rich-text-types"
import * as Contentful from "contentful"

export interface IHtmlFields {
  columns: Contentful.EntryFields.Integer
  images: Contentful.Asset[]
  title: Contentful.EntryFields.Symbol
}

export type THtml = Contentful.Entry<IHtmlFields>

export type TParsedHtml = Omit<IHtmlFields, "images"> & {
  images: {
    src: string
    width: number
    height: number
  }[]
}

export interface IPdfFields {
  height: Contentful.EntryFields.Number
  media: Contentful.Asset
  title: Contentful.EntryFields.Symbol
  width: Contentful.EntryFields.Number
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
