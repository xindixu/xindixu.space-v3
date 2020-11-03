import { ContactInfo, Organization, Briefcase, Home } from "grommet-icons"

export const links = [
  { icon: <Home />, name: "Home", link: "/" },
  {
    icon: <Organization />,
    name: "Experiences",
    link: "/experiences",
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
  "/experiences": {
    icon: <Organization />,
    name: "Experiences",
    link: "/experiences",
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
