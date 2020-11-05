import React, { useContext } from "react"
import PropTypes from "prop-types"
import { format, parseISO } from "date-fns"
import { Main, Box, ResponsiveContext } from "grommet"

import { getWork, getAllWorkSlugs } from "lib/contentful/work"
import Header from "components/header"
import RichText from "components/rich-text"
import InfoBox from "components/info-box"

const Work = ({ setHeaderRef, work = {} }) => {
  const { name, thumbnail, labels, description, demoLink, repoLink } = work

  const size = useContext(ResponsiveContext)

  return (
    <>
      <Header
        ref={setHeaderRef}
        name={name}
        labels={labels}
        background={{ url: thumbnail }}
        full={false}
      />

      <Box pad="xlarge" gap="large" direction="row" justify="center">
        {size === "large" && (
          <Box responsive={false}>
            <InfoBox demoLink={demoLink} repoLink={repoLink} />
          </Box>
        )}
        <Main width="xlarge" flex={false}>
          <RichText document={description} />
        </Main>
      </Box>
    </>
  )
}

export async function getStaticProps({ params: { slug } }) {
  const work = await getWork({ slug })
  return {
    props: JSON.parse(
      JSON.stringify({
        work,
        slug,
      })
    ),
  }
}

export async function getStaticPaths() {
  const paths = await getAllWorkSlugs()

  return {
    paths: paths.map((slug) => `/projects/${slug}`),
    fallback: true,
  }
}

Work.propTypes = {}

export default Work
