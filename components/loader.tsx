import React, { ReactNode } from "react"
import styled, { keyframes } from "styled-components"
import styleSettings from "lib/style-settings/index"
import { color } from "lib/style-settings/utils"
import { PINK } from "lib/style-settings/color-names"

const { fontRoot, borderSize: { small } = {} } = styleSettings

const spin = keyframes`
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(360deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(720deg);
  }
`

const Wrapper = styled.div`
  position: relative;
`
const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
`

const ContentWrapper = styled.div<{ loading: boolean }>`
  ${({ loading }) => `
    opacity: ${loading ? 0 : 1};
    transition: opacity 0.3s ease-in;
  `}
`

const LoadingIndicator = styled.div<{ loading: boolean }>`
  border: ${small} solid ${color("light-1")};
  border-top: ${small} solid ${color(PINK)};
  border-radius: 50%;

  animation: ${spin} 2s infinite;
  width: ${fontRoot};
  height: ${fontRoot};

  ${({ loading }) => `
    opacity: ${loading ? 1 : 0};
    transition: opacity 0.3s ease-in;
  `}
`

type TProps = {
  loading: boolean
  children: ReactNode
}

const Loader = ({ loading, children }: TProps) => (
  <Wrapper>
    <ContentWrapper loading={loading}>{children}</ContentWrapper>
    <LoadingWrapper>
      <LoadingIndicator loading={loading} />
    </LoadingWrapper>
  </Wrapper>
)

export default Loader
