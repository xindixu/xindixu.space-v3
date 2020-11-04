import { ContactInfo, Organization, Briefcase, Home } from "grommet-icons"

export const links = [
  { icon: <Home />, name: "Home", link: "/" },
  {
    icon: <Organization />,
    name: "Work",
    link: "/work",
  },
  {
    icon: <Briefcase />,
    name: "Projects",
    link: "/projects",
  },
  {
    icon: <ContactInfo />,
    name: "Contact",
    link: "/contact",
  },
]

export const linksByPathname = {
  "/": {
    icon: <Home />,
    name: "Home",
    link: "/",
    background: { url: "/img/bg/bg-light-2.jpg" },
  },
  "/work": {
    icon: <Organization />,
    name: "Work",
    link: "/work",
    background: { url: "/img/bg/bg-light-3.jpg" },
  },
  "/projects": {
    icon: <Briefcase />,
    name: "Projects",
    link: "/projects",
    background: { url: "/img/bg/bg-light-6.jpg" },
  },
  "/contact": {
    icon: <ContactInfo />,
    name: "Contact",
    link: "/contact",
    background: { url: "/img/bg/bg-light-7.jpg" },
  },
}

export const errorPage = {
  name: "Error",
  background: { url: "/img/bg/bg-light-1.jpg" },
}
