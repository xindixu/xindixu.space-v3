import { ContactInfo, Book, Briefcase, Home } from "grommet-icons"
import CasperIcon from "components/casper-icon"

export const links = [
  { icon: <Home />, name: "Home", link: "/" },
  {
    icon: <Book />,
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
  {
    icon: <CasperIcon />,
    name: "Casper",
    link: "/casper",
  },
]

export const linksByPathname = {
  "/": {
    icon: <Home />,
    name: "Home",
    link: "/",
    background: {
      lightSrc: "/img/bg/bg-light-2.jpg",
      darkSrc: "/img/bg/bg-dark-2.jpg",
      width: 1440,
      height: 960,
    },
  },
  "/experiences": {
    icon: <Book />,
    name: "Experiences",
    link: "/experiences",
    background: {
      lightSrc: "/img/bg/bg-light-3.jpg",
      darkSrc: "/img/bg/bg-dark-3.jpg",
      width: 1440,
      height: 960,
    },
  },
  "/projects": {
    icon: <Briefcase />,
    name: "Projects",
    link: "/projects",
    background: {
      lightSrc: "/img/bg/bg-light-6.jpg",
      darkSrc: "/img/bg/bg-dark-1.jpg",
      width: 1440,
      height: 960,
    },
  },
  "/contact": {
    icon: <ContactInfo />,
    name: "Contact",
    link: "/contact",
    background: {
      lightSrc: "/img/bg/bg-light-1.jpg",
      darkSrc: "/img/bg/bg-dark-4.jpg",
      width: 1440,
      height: 960,
    },
  },
  "/casper": {
    icon: <CasperIcon />,
    name: "Casper",
    link: "/casper",
    background: {
      lightSrc: "/img/bg/bg-light-4.jpg",
      darkSrc: "/img/bg/bg-dark-4.jpg",
      width: 1440,
      height: 960,
    },
  },
}

export const errorPage = {
  icon: null,
  name: "404",
  link: "/error",
  background: {
    lightSrc: "/img/bg/bg-light-5.jpg",
    darkSrc: "/img/bg/bg-light-5.jpg",
    width: 1440,
    height: 960,
  },
}
