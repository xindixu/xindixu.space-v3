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
  name: Contentful.EntryFields.Symbol
  slug: Contentful.EntryFields.Symbol
  description: CFRichTextTypes.Block | CFRichTextTypes.Inline
  start: Contentful.EntryFields.Date
  end: Contentful.EntryFields.Date
  demoLink?: Contentful.EntryFields.Symbol
  repoLink?: Contentful.EntryFields.Symbol
  labels: Contentful.EntryFields.Symbol[]
  devices: Contentful.Asset
  thumbnail?: Contentful.Asset
  created: Contentful.EntryFields.Date
}

export type TProject = Contentful.Entry<IProjectFields>

export interface IYoutubeFields {
  title: Contentful.EntryFields.Symbol
  url: Contentful.EntryFields.Symbol
  description: Contentful.EntryFields.Text
}

export type TYoutube = Contentful.Entry<IYoutubeFields>
