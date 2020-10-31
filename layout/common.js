import React from "react"
import { useInView } from "react-intersection-observer"
import PropTypes from "prop-types"
import { Main } from "grommet"
import usePageConfig from "hooks/usePageConfig"

import Title from "components/title"
import Navbar from "components/navbar"
import Header from "components/header"
import Footer from "components/footer"

const Common = ({ children }) => {
  const [ref, isHeaderInView] = useInView({ threshold: 0.05 })
  const {
    config: { name, background },
    isTopLevel,
  } = usePageConfig()

  return (
    <>
      <Title name={name} />
      <Navbar isHeaderInView={isHeaderInView} />
      <Header ref={ref} name={name} background={background} full={isTopLevel} />
      <Main pad="xlarge">{children}</Main>
      <Footer />
    </>
  )
}

Common.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Common
