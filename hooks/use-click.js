import { useEffect, useState } from "react"

const useClick = ({ node }) => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const getCoordinates = (e) => {
      if (e.type === "mousedown") {
        return setCoordinates({ x: e.pageX, y: e.pageY })
      }
      return setCoordinates({ x: e.touches[0].pageX, y: e.touches[0].pageY })
    }

    if (node) {
      node.addEventListener("mousedown", getCoordinates)
      node.addEventListener("touchstart", getCoordinates)
    }

    return () => {
      if (node) {
        node.removeEventListener("mousedown", getCoordinates)
        node.removeEventListener("touchstart", getCoordinates)
      }
    }
  }, [node])

  return { coordinates }
}

export default useClick
