import { useEffect, useState } from "react"

const MOUSEDOWN = "mousedown"
const TOUCHSTART = "touchstart"

const useClick = ({ node }: { node: HTMLElement }) => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const getCoordinates = (e: MouseEvent) => {
      setCoordinates({ x: e.clientX, y: e.clientY })
    }
    if (node) {
      node.addEventListener(MOUSEDOWN, getCoordinates)
    }

    return () => {
      if (node) {
        node.removeEventListener(MOUSEDOWN, getCoordinates)
      }
    }
  }, [node])

  useEffect(() => {
    const getCoordinates = (e: TouchEvent) => {
      setCoordinates({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }
    if (node) {
      node.addEventListener(TOUCHSTART, getCoordinates)
    }

    return () => {
      if (node) {
        node.removeEventListener(TOUCHSTART, getCoordinates)
      }
    }
  }, [node])

  return { coordinates }
}

export default useClick
