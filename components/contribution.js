import React, { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import styled from "styled-components"
import { groupBy } from "lodash"
import { format } from "date-fns"
import { getRecentCommits } from "lib/github"
import styleSettings from "lib/style-settings/index"

const { pink } = styleSettings

const getDate = (isoStr) => isoStr.split("T")[0]

const FullWidthDiv = styled.div`
  width: 100%;
  display: block;
  position: relative;
`

const parseData = (commits) => {
  const commitsByDate = groupBy(commits, (commit) => getDate(commit))

  const keys = Object.keys(commitsByDate)
  const data = keys.map((date) => commitsByDate[date].length)
  const labels = keys.map((key) => format(new Date(key), "MMM d"))
  return {
    labels,
    datasets: [
      {
        label: "# of Commits",
        data,
        fill: false,
        stepped: true,
        borderColor: pink,
        backgroundColor: `${pink}50`,
      },
    ],
  }
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const Contribution = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    getRecentCommits().then((commits) => setData(parseData(commits)))
  }, [])

  return (
    <FullWidthDiv>
      <Line data={data} options={options} />
    </FullWidthDiv>
  )
}

export default Contribution
