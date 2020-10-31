import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"
import { getWork, getAllWorkSlugs } from "lib/contentful/work"

const Work = ({ slug, work }) => {
  console.log(work)
  return <div>Work page {slug}</div>
}

export async function getStaticProps({ params: { slug } }) {
  const work = await getWork(slug)
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
    paths: paths.map((slug) => `/work/${slug}`),
    fallback: true,
  }
}

Work.propTypes = {}

export default Work
