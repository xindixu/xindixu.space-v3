import type { Document } from "@contentful/rich-text-types"
import type { Asset } from "contentful"

export interface IHtmlFields {
  columns: number
  images: Asset[]
  title: string
}

export type TParsedHtml = Omit<IHtmlFields, "images"> & {
  images: {
    src: string
    width: number
    height: number
  }[]
}

export interface IPdfFields {
  height: number
  media: Asset
  title: string
  width: number
}

export interface IProjectFields {
  created: string
  demoLink?: string
  description: Document
  devices: Asset
  end: string
  labels: string[]
  name: string
  repoLink?: string
  slug: string
  start: string
  thumbnail?: Asset
}

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
  title: string
  url: string
  description: string
}
