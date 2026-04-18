import { useRouter } from "next/router"
import { linksByPathname, errorPage } from "contents/routes"

export type TPath = keyof typeof linksByPathname

const usePageConfig = () => {
  const { pathname } = useRouter()
  const paths = pathname.match(/\/(\w+)?/g) || []
  const [path] = paths

  return {
    isTopLevel: paths.length === 1,
    config:
      path !== undefined && Object.hasOwn(linksByPathname, path)
        ? linksByPathname[path as TPath]
        : errorPage,
  }
}

export default usePageConfig
