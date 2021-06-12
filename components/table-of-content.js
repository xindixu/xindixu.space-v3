import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { kebabCase } from "lodash"
import { Card, Anchor } from "grommet"
import styleSettings from "lib/style-settings"

const { spacerBase } = styleSettings

const List = styled.ul`
  list-style: none;
  padding: 0;
`

const ListItem = styled.li`
  ${({ level }) =>
    `
    margin-left: calc(${level - 1} * ${spacerBase});
    `}
`
const parseContent = (mainContent) =>
  mainContent
    .filter(({ nodeType }) => nodeType.startsWith("heading"))
    .map(({ content, nodeType }) => ({
      title: content[0]?.value,
      level: parseInt(nodeType.split("-")[1] || 0, 10),
    }))

const TableOfContent = ({ mainContent }) => {
  const headings = parseContent(mainContent.content)

  return (
    <Card width="small" height="min-content" pad={{ horizontal: "small" }}>
      <nav aria-label="Table of contents">
        <List>
          {headings.map(({ title, level }) => {
            const id = `#${kebabCase(title)}`
            return (
              <ListItem key={title} level={level}>
                <Anchor
                  href={id}
                  label={title}
                  size="small"
                  onClick={(e) => {
                    e.preventDefault()

                    if (document !== undefined) {
                      document.querySelector(id).scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                  }}
                />
              </ListItem>
            )
          })}
        </List>
      </nav>
    </Card>
  )
}

TableOfContent.propTypes = {
  mainContent: PropTypes.shape({
    content: PropTypes.arrayOf(
      PropTypes.shape({
        nodeType: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
}

export default TableOfContent
