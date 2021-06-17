import React from "react"
import { Main } from "grommet"
import Timeline from "components/timeline"

const Experiences = ({ isXxsUp }) => (
  <Main
    pad={{ horizontal: isXxsUp ? "xlarge" : "medium", vertical: "xlarge" }}
    justify="center"
    direction="row"
    fill={false}
  >
    <Timeline />
  </Main>
)

export default Experiences
