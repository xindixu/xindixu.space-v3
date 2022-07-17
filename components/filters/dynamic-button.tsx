import React from "react"
import { Button } from "grommet"

type TProps = {
  selected: boolean
  onClick: () => void
  label: string
}

const DynamicButton = ({ selected, onClick, label }: TProps) => {
  const type = selected ? { primary: true } : { default: true }

  return (
    <Button
      {...type}
      label={label}
      onClick={onClick}
      size="medium"
      margin={{ bottom: "small" }}
    />
  )
}

export default DynamicButton
