import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import Link from "next/link";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Grid,
  ResponsiveContext,
  Text,
  Image,
} from "grommet";
import { getAllWorks } from "lib/contentful/work";

const Work = ({ name, slug, thumbnail }) => (
  <Link href={`/work/${slug}`}>
    <Card>
      <CardBody height="medium">
        <Image
          fit="cover"
          // TODO: fallback url
          src={get(thumbnail, "fields.file.url") || ""}
        />
      </CardBody>
      <CardFooter pad={{ horizontal: "medium", vertical: "small" }}>
        <Text>{name}</Text>
      </CardFooter>
    </Card>
  </Link>
);

const Works = ({ works = [] }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Grid
      gap="medium"
      rows="small"
      columns={{
        count: "fit",
        size: size === "small" ? "100%" : "medium",
      }}
    >
      {works.map(({ name, slug, thumbnail }) => (
        <Work key={slug} name={name} slug={slug} thumbnail={thumbnail} />
      ))}
    </Grid>
  );
};

const FAKE = () => ({
  name: "fake",
  slug: `fake-${Math.random()}`,
  thumbnail: {
    fields: {
      file: {
        url:
          "//images.ctfassets.net/erckh4cqp51i/3M2MNu9R6E5lmp3kTJUhLG/a43833c68f570e4a13dec1603c0d25b1/bg-dark-2.jpg",
      },
    },
  },
});
export async function getStaticProps() {
  const { entries } = await getAllWorks();

  // Next.js expects the props to be json stringify-able
  // https://dev.to/ryyppy/reason-records-nextjs-undefined-and-getstaticprops-5d46
  return {
    props: JSON.parse(
      JSON.stringify({
        works: [...entries, FAKE(), FAKE()],
      })
    ),
  };
}

Works.propTypes = {};

export default Works;
