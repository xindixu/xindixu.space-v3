import { useRouter } from "next/router"
import { linksByPathname } from "contents/routes"

const usePageConfig = () => {
  const { pathname } = useRouter()
  const [topLevelLink] = pathname.match(/\/(\w+)?/g)
  return linksByPathname[topLevelLink] || {}
}

export default usePageConfig
