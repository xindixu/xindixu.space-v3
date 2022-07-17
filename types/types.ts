import { ReactNode } from "react"

export type TPageProps = {
  header?: ReactNode
  isXxsUp: boolean
  setContentRef: (node: HTMLElement) => void
  setHeaderRef: (node: HTMLElement) => void
}
