import React from "react"
import { TagCloud } from "react-tagcloud"

const words = [
  { count: 15, value: "C" },
  { count: 16, value: "SQL" },
  { count: 17, value: "Java" },
  { count: 18, value: "PostgreSQL" },
  { count: 19, value: "MongoDB" },
  { count: 21, value: "Express.js" },
  { count: 22, value: "Flask" },
  { count: 24, value: "TypeScript" },
  { count: 25, value: "Go" },
  { count: 26, value: "Vue.js" },
  { count: 27, value: "AWS" },
  { count: 27, value: "Node.js" },
  { count: 29, value: "React" },
  { count: 30, value: "JavaScript" },
  { count: 30, value: "Python3" },
]

const customRenderer = (tag, size, color) => {
  return (
    <span
      key={tag.value}
      style={{
        color,
        fontSize: size,
        display: "inline-block",
        margin: "3px 5px",
      }}
    >
      {tag.value}
    </span>
  )
}

const options = {
  luminosity: "light",
  hue: "purple",
}

const TechCloud = () => {
  return (
    <TagCloud
      style={{ height: 300, width: 600 }}
      minSize={20}
      maxSize={45}
      tags={words}
      colorOptions={options}
      renderer={customRenderer}
    />
  )
}

export default TechCloud
