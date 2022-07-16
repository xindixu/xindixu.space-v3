import { useRouter } from "next/router"
import { linksByPathname, errorPage } from "contents/routes"

const usePageConfig = () => {
  const { pathname } = useRouter()
  const paths = pathname.match(/\/(\w+)?/g) || []

  return {
    isTopLevel: paths.length === 1,
    // @ts-expect-error
    config: linksByPathname[paths[0]] || errorPage,
  }
}

export default usePageConfig
