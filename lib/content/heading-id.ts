import { kebabCase } from "lodash"
import { Block, Inline } from "@contentful/rich-text-types"

type RichTextChild = {
  nodeType?: string
  value?: string
  content?: readonly RichTextChild[]
}

function collectRichTextText(node: RichTextChild | undefined): string {
  if (!node) return ""
  if (node.nodeType === "text" && typeof node.value === "string") {
    return node.value
  }
  if (!node.content?.length) return ""
  return node.content.map(collectRichTextText).join("")
}

function collectInlineText(inlines: readonly Inline[] | undefined): string {
  if (!inlines?.length) return ""
  return inlines
    .map((node) => collectRichTextText(node as RichTextChild))
    .join("")
}

export function headingPlainTextFromBlock(node: Block): string {
  return collectInlineText(node.content as Inline[] | undefined)
}

export function headingIdFromBlock(node: Block): string {
  return kebabCase(headingPlainTextFromBlock(node))
}
