import React, { useState } from "react"
import { Footer as BaseFooter, Box } from "grommet"
import styled from "styled-components"
import { links } from "contents/social-media"
import QuickMenu from "components/quick-menu"

const FixBottom = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
`

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <FixBottom>
      <BaseFooter pad="small">
        <QuickMenu subMenu={links} isOpen={isOpen} setIsOpen={setIsOpen} />
      </BaseFooter>
    </FixBottom>
  )
}

export default Footer
