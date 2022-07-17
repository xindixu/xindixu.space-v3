import React, { useState, useEffect } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import styled, { useTheme } from "styled-components"
import { groupBy } from "lodash"
import { format } from "date-fns"
import { getRecentCommits } from "lib/github"
import styleSettings from "lib/style-settings/index"
import { MONTH_DAY_FORMAT } from "utils/datetime"
import { color } from "lib/style-settings/utils"

const { PINK } = styleSettings

const FullWidthDiv = styled.div`
  width: 100%;
  display: block;
  position: relative;
`

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const getDate = (isoStr: string) => isoStr.split("T")[0]

const parseData = (commits: string[], pink: string) => {
  const commitsByDate = groupBy(commits, (commit) => getDate(commit))
  const keys = Object.keys(commitsByDate)
  const data = keys.map((date) => commitsByDate[date].length)
  const labels = keys.map((key) => format(new Date(key), MONTH_DAY_FORMAT))

  return {
    labels,
    datasets: [
      {
        label: "# of Commits",
        data,
        fill: false,
        stepped: true,
        borderColor: pink,
        backgroundColor: `${pink}20`,
      },
    ],
  }
}

const Contribution = () => {
  const theme = useTheme()
  const pink = color(PINK)({ theme })

  const [data, setData] = useState<string[]>([])

  useEffect(() => {
    getRecentCommits().then(setData)
  }, [])

  return (
    <FullWidthDiv>
      <Line
        data={parseData(data, pink)}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        }}
      />
    </FullWidthDiv>
  )
}

export default Contribution
