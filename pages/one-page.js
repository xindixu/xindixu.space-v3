import React from "react"
import PropTypes from "prop-types"
import Header from "components/header"
import { links, linksByPathname } from "contents/routes"

const OnePage = (props) => {
  return (
    <div>
      {links.map(({ component, link }) => {
        const { name, background } = linksByPathname[link]
        return (
          <>
            <Header name={name} background={background} />
            {component}
          </>
        )
      })}
    </div>
  )
}

OnePage.propTypes = {}

export default OnePage
