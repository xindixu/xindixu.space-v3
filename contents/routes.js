import { ContactInfo, Book, Briefcase, Home } from "grommet-icons"
import Experiences from "pages/experiences"
import Projects from "pages/projects"
import Contact from "pages/contact"
import Index from "pages/index"

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
}

export const errorPage = {
  name: "404",
  background: { src: "/img/bg/bg-light-5.jpg", width: 1440, height: 960 },
}
