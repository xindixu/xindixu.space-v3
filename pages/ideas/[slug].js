import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

const Blog = (props) => {
  const { query } = useRouter();
  const { slug } = query;
  return <div>Blog page {slug}</div>;
};

Blog.propTypes = {};

export default Blog;
