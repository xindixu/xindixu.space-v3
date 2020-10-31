import { useRouter } from "next/router"
import { linksByPathname } from "contents/routes"

const usePageConfig = () => {
  const { pathname } = useRouter()
  const paths = pathname.match(/\/(\w+)?/g)

  return {
    isTopLevel: paths.length === 1,
    config: linksByPathname[paths[0]] || {},
  }
}

export default usePageConfig
