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
    background: { url: "/img/bg/bg-light-2.jpg" },
  },
  "/experiences": {
    icon: <Book />,
    name: "Life Story",
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

export const errorPage = {
  name: "Error",
  background: { url: "/img/bg/bg-light-1.jpg" },
}
