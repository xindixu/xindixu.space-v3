import { Article, Briefcase, Home, UserFemale } from "grommet-icons"

export const links = [
  { icon: <Home />, name: "Home", link: "/" },
  {
    icon: <UserFemale />,
    name: "About",
    link: "/about",
  },
  {
    icon: <Briefcase />,
    name: "Work",
    link: "/work",
  },
  {
    icon: <Article />,
    name: "Ideas",
    link: "/ideas",
  },
]

export const linksByPathname = {
  "/": {
    icon: <Home />,
    name: "Home",
    link: "/",
    background: { url: "/img/bg/bg-light-6.jpg" },
  },
  "/about": {
    icon: <UserFemale />,
    name: "About",
    link: "/about",
    background: { url: "/img/bg/bg-light-2.jpg" },
  },
  "/work": {
    icon: <Briefcase />,
    name: "Work",
    link: "/work",
    background: { url: "/img/bg/bg-light-3.jpg" },
  },
  "/ideas": {
    icon: <Article />,
    name: "Ideas",
    link: "/ideas",
    background: { url: "/img/bg/bg-light-7.jpg" },
  },
}
