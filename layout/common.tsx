import React, { ReactNode, useRef, Suspense } from "react"
import { useInView } from "react-intersection-observer"
import PropTypes from "prop-types"
import dynamic from "next/dynamic"

import usePageConfig from "hooks/use-page-config"
import Title from "components/title"
import Header from "components/header"

import useMedia from "hooks/use-media"
import { TPageProps } from "types/types"

const Navbar = dynamic(() => import("components/navbar"), {
  suspense: true,
})

const Footer = dynamic(() => import("components/footer"), {
  suspense: true,
})

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
      <Suspense fallback={null}>
        <Navbar isHeaderInView={isHeaderInView} />
      </Suspense>
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
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      )
    </>
  )
}

Common.propTypes = {
  children: PropTypes.func.isRequired,
}

export default Common
