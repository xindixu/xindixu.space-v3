import { ContactInfo, Book, Briefcase, Home } from "grommet-icons"
import CasperIcon from "components/casper-icon"
import Casper from "pages/casper"
import Contact from "pages/contact"
import Experiences from "pages/experiences"
import Index from "pages/index"
import Projects from "pages/projects"

export const links = [
  { icon: <Home />, name: "Home", link: "/", component: <Index /> },
  {
    icon: <Book />,
    name: "Life Story",
    link: "/experiences",
    component: <Experiences />,
  },
  {
    icon: <Briefcase />,
    name: "Projects",
    link: "/projects",
    component: <Projects />,
  },
  {
    icon: <ContactInfo />,
    name: "Contact",
    link: "/contact",
    component: <Contact />,
  },
  {
    icon: <CasperIcon />,
    name: "Casper",
    link: "/casper",
    component: <Casper />,
  },
]

export const linksByPathname = {
  "/": {
    icon: <Home />,
    name: "Home",
    link: "/",
    background: { src: "/img/bg/bg-light-2.jpg", width: 1440, height: 960 },
  },
  "/experiences": {
    icon: <Book />,
    name: "Life Story",
    link: "/experiences",
    background: { src: "/img/bg/bg-light-3.jpg", width: 1440, height: 960 },
  },
  "/projects": {
    icon: <Briefcase />,
    name: "Projects",
    link: "/projects",
    background: { src: "/img/bg/bg-light-6.jpg", width: 1440, height: 960 },
  },
  "/contact": {
    icon: <ContactInfo />,
    name: "Contact",
    link: "/contact",
    background: { src: "/img/bg/bg-light-1.jpg", width: 1440, height: 960 },
  },
  "/casper": {
    icon: <CasperIcon />,
    name: "Casper",
    link: "/casper",
    background: { src: "/img/bg/bg-light-4.jpg", width: 1440, height: 960 },
  },
}

export const errorPage = {
  name: "404",
  background: { src: "/img/bg/bg-light-5.jpg", width: 1440, height: 960 },
}
