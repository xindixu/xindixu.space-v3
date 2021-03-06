import React, { useRef } from "react"
import { useInView } from "react-intersection-observer"
import PropTypes from "prop-types"
import usePageConfig from "hooks/use-page-config"
import Title from "components/title"
import Navbar from "components/navbar"
import Header from "components/header"
import Footer from "components/footer"
import useMedia from "hooks/use-media"

const Common = ({ children }) => {
  const [headerRef, isHeaderInView] = useInView({ threshold: 0.05 })
  const isXxsUp = useMedia("xxs")

  const contentRef = useRef(null)
  const {
    config: { name, background },
    isTopLevel,
  } = usePageConfig()

  return (
    <>
      <Title name={name} />
      <Navbar isHeaderInView={isHeaderInView} />

      {children({
        setContentRef: (node) => {
          contentRef.current = node
        },
        setHeaderRef: headerRef,
        header: isTopLevel && (
          <Header
            ref={headerRef}
            name={name}
            background={background}
            full={isTopLevel}
            alt="floral background image to decorate the header"
          />
        ),
        isXxsUp,
      })}
      <Footer />
    </>
  )
}

Common.propTypes = {
  children: PropTypes.func.isRequired,
}

export default Common
