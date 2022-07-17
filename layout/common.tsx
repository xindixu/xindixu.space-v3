import React, { ReactNode, useRef } from "react"
import { useInView } from "react-intersection-observer"
import PropTypes from "prop-types"
import usePageConfig from "hooks/use-page-config"
import Title from "components/title"
import Navbar from "components/navbar"
import Header from "components/header"
import Footer from "components/footer"
import useMedia from "hooks/use-media"
import { TPageProps } from "types/types"

type TProps = {
  children: (props: TPageProps) => ReactNode
}
const Common = ({ children }: TProps) => {
  const [setHeaderRef, isHeaderInView] = useInView({ threshold: 0.05 })
  const isXxsUp = useMedia("xxs")

  const contentRef = useRef<HTMLElement>()
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
        setHeaderRef,
        header: isTopLevel ? (
          <Header
            background={{
              alt: "floral background image to decorate the header",
              ...background,
            }}
            full={isTopLevel}
            name={name}
            setHeaderRef={setHeaderRef}
          />
        ) : null,
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
