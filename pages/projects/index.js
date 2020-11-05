import React, { useContext } from "react"
import PropTypes from "prop-types"
import { get } from "lodash"
import Link from "next/link"
import {
  Main,
  Card,
  CardBody,
  CardFooter,
  Grid,
  ResponsiveContext,
  Text,
  Image,
} from "grommet"
import { getAllProjects } from "lib/contentful/project"

const Project = ({ name, slug, thumbnail }) => (
  <Link href={`/projects/${slug}`}>
    <Card>
      <CardBody height="medium">
        <Image
          fit="cover"
          // TODO: fallback url
          src={thumbnail}
        />
      </CardBody>
      <CardFooter pad={{ horizontal: "medium", vertical: "small" }}>
        <Text>{name}</Text>
      </CardFooter>
    </Card>
  </Link>
)

const Projects = ({ projects = [] }) => {
  const size = useContext(ResponsiveContext)

  return (
    <Main pad="xlarge">
      <Grid
        gap="medium"
        rows="small"
        columns={{
          count: "fit",
          size: size === "small" ? "100%" : "medium",
        }}
      >
        {projects.map(({ name, slug, thumbnail }) => (
          <Project key={slug} name={name} slug={slug} thumbnail={thumbnail} />
        ))}
      </Grid>
    </Main>
  )
}

const FAKE = () => ({
  name: "fake",
  slug: `fake-${Math.random()}`,
  thumbnail:
    "//images.ctfassets.net/erckh4cqp51i/3M2MNu9R6E5lmp3kTJUhLG/a43833c68f570e4a13dec1603c0d25b1/bg-dark-2.jpg",
})

export async function getStaticProps() {
  const { entries } = await getAllProjects()

  // Next.js expects the props to be json stringify-able
  // https://dev.to/ryyppy/reason-records-nextjs-undefined-and-getstaticprops-5d46
  return {
    props: JSON.parse(
      JSON.stringify({
        projects: [...entries],
      })
    ),
  }
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default Projects
