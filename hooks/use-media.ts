import { useContext } from "react"
import { ResponsiveContext } from "grommet"
import { isScreenUp } from "lib/style-settings/utils"

const useMedia = (base) => {
  const current = useContext(ResponsiveContext)
  return isScreenUp({ base, current })
}

export default useMedia
