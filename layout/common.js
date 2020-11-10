import React, { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import PropTypes from "prop-types"
import usePageConfig from "hooks/usePageConfig"
import Title from "components/title"
import Navbar from "components/navbar"
import Header from "components/header"
import Footer from "components/footer"

const Common = ({ children }) => {
  const [headerRef, isHeaderInView] = useInView({ threshold: 0.05 })

  const contentRef = useRef(null)
  const {
    config: { name, background },
    isTopLevel,
  } = usePageConfig()

  useEffect(() => {
    if (headerRef) {
      console.log(headerRef.current)
    }
  }, [headerRef])

  return (
    <>
      <Title name={name} />
      <Navbar isHeaderInView={isHeaderInView} />
      {isTopLevel && (
        <Header
          ref={headerRef}
          name={name}
          background={background}
          full={isTopLevel}
        />
      )}
      {children({ setContentRef: contentRef, setHeaderRef: headerRef })}
      <Footer />
    </>
  )
}

Common.propTypes = {
  children: PropTypes.func.isRequired,
}

export default Common
