import { format } from "date-fns"

export const MONTH_DAY_FORMAT = "MMM d"
export const YEAR_FORMAT = "yyyy"
export const MONTH_DAY_YEAR_FORMAT = `${MONTH_DAY_FORMAT}, ${YEAR_FORMAT}`

export const formatDuration = ({
  start,
  end,
}: {
  start: string
  end: string
}) => {
  const [startYear] = start.split("-")
  const [endYear] = end.split("-")

  const startDate = new Date(start)
  const endDate = new Date(end)
  if (startYear === endYear) {
    return `${format(startDate, MONTH_DAY_FORMAT)} - ${format(
      endDate,
      MONTH_DAY_FORMAT
    )}, ${format(startDate, YEAR_FORMAT)}`
  }

  return `${format(startDate, MONTH_DAY_YEAR_FORMAT)} - ${format(
    endDate,
    MONTH_DAY_YEAR_FORMAT
  )}`
}
