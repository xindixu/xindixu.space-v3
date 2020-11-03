import { ContactInfo, Briefcase, Home, UserFemale } from "grommet-icons"

export const links = [
  { icon: <Home />, name: "Home", link: "/" },

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
  "/projects": {
    icon: <Briefcase />,
    name: "Projects",
    link: "/projects",
    background: { url: "/img/bg/bg-light-3.jpg" },
  },
  "/contact": {
    icon: <ContactInfo />,
    name: "Contact",
    link: "/contact",
    background: { url: "/img/bg/bg-light-7.jpg" },
  },
}
