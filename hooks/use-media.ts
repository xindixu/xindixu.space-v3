import { useContext } from "react"
import { ResponsiveContext } from "grommet"
import { isScreenUp } from "lib/style-settings/utils"
import { TBreakpointsKeys } from "lib/style-settings/media-query"

const useMedia = (base: TBreakpointsKeys) => {
  const current = useContext(ResponsiveContext)
  return isScreenUp({ base, current })
}

export default useMedia
