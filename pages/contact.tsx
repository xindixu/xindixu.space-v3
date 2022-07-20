import React, { useContext, Suspense } from "react"
import dynamic from "next/dynamic"
import { Main, Box, ResponsiveContext } from "grommet"
import { links } from "contents/social-media"

import { TPageProps } from "types/types"

const ContactForm = dynamic(() => import("components/contact"), {
  suspense: true,
})

const Contact = ({ isXxsUp }: TPageProps) => {
  const size = useContext(ResponsiveContext)

  return (
    <Main
      pad={{ horizontal: isXxsUp ? "xlarge" : "medium", vertical: "xlarge" }}
      gap="large"
      justify="center"
    >
      <Box direction="row" justify="center" a11yTitle="social media links">
        <Box pad={{ right: "large" }} align="end">
          {links.map(({ name }) => (
            <p key={name}>{name}</p>
          ))}
        </Box>
        <Box
          border={{ side: "left", size: "small", color: "brand" }}
          pad={{ left: "large" }}
        >
          {links.map(({ text, link }) => (
            <p key={link}>
              <a href={link} target="_blank" rel="noreferrer">
                {text}
              </a>
            </p>
          ))}
        </Box>
      </Box>

      <Box pad={{ horizontal: size === "large" ? "xlarge" : "none" }}>
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </Box>
    </Main>
  )
}

export default Contact
