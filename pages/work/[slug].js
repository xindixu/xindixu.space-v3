import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

const Project = (props) => {
  const { query } = useRouter();
  const { slug } = query;
  return <div>Project page {slug}</div>;
};

Project.propTypes = {};

export default Project;
