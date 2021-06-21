import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { kebabCase } from "lodash"
import { Card, Anchor } from "grommet"
import { AnimatePresence, motion } from "framer-motion"
import styleSettings from "lib/style-settings"

const { spacerBase } = styleSettings

const List = styled.ul`
  list-style: none;
  padding: 0;
`

const ListItem = styled.li`
  ${({ level }) => `
    margin-left: calc(${level - 1} * ${spacerBase});
  `}
`

const variants = {
  hidden: {
    y: -50,
    opacity: 0,
    transition: { duration: 0.5 },
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.5, duration: 0.5 },
  },
}

const parseContent = (mainContent) =>
  mainContent
    .filter(
      ({ nodeType }) => nodeType === "heading-1" || nodeType === "heading-2"
    )
    .map(({ content, nodeType }) => ({
      title: content[0]?.value,
      level: parseInt(nodeType.split("-")[1] || 0, 10),
    }))

const TableOfContent = ({ mainContent, show, activeHeader }) => {
  if (!mainContent) {
    return null
  }
  const headings = parseContent(mainContent.content)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          animate="enter"
          initial="hidden"
          exit="hidden"
          variants={variants}
          style={{ height: "min-content" }}
        >
          <Card
            width="small"
            height="min-content"
            pad={{ horizontal: "small" }}
            background="white"
          >
            <nav aria-label="Table of contents">
              <List>
                {headings.map(({ title, level }) => {
                  const id = kebabCase(title)
                  const href = `#${kebabCase(title)}`
                  const active = activeHeader === id

                  return (
                    <ListItem key={title} level={level}>
                      <Anchor
                        color={active ? "pinkDark" : "beigeDark"}
                        size="small"
                        href={href}
                        label={title}
                        onClick={(e) => {
                          e.preventDefault()

                          if (document !== undefined) {
                            document.querySelector(href).scrollIntoView({
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}

TableOfContent.defaultProps = {
  activeHeader: "",
}

TableOfContent.propTypes = {
  mainContent: PropTypes.shape({
    content: PropTypes.arrayOf(
      PropTypes.shape({
        nodeType: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  activeHeader: PropTypes.string,
  show: PropTypes.bool.isRequired,
}

export default TableOfContent
