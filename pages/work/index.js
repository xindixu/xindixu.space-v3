import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Card, CardBody, CardFooter, Grid, Grommet, Text } from "grommet";
import { getAllWorks } from "lib/contentful/work";

const Work = ({ works }) => {
  console.log(works);
  return <div>Work page</div>;
};

export async function getStaticProps() {
  const works = await getAllWorks();

  // Next.js expects the props to be json stringify-able
  // https://dev.to/ryyppy/reason-records-nextjs-undefined-and-getstaticprops-5d46
  return {
    props: JSON.parse(
      JSON.stringify({
        works,
      })
    ),
  };
}

Work.propTypes = {};

export default Work;
