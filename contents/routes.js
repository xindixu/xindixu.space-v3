import { Article, Briefcase, Diamond, Home, UserFemale } from "grommet-icons";

export const links = [
  { icon: <Home />, name: "Home", link: "/" },
  {
    icon: <UserFemale />,
    name: "About",
    link: "/about",
  },
  {
    icon: <Briefcase />,
    name: "Projects",
    link: "/project",
  },
  {
    icon: <Diamond />,
    name: "Life",
    link: "/life",
  },
  {
    icon: <Article />,
    name: "Blog",
    link: "/blog",
  },
];

export const linksByPathname = {
  "/": { icon: <Home />, name: "Home", link: "/", background: "/bg/bg1.jpg" },
  "/about": {
    icon: <UserFemale />,
    name: "About",
    link: "/about",
    background: "/bg/bg2.jpg",
  },
  "/project": {
    icon: <Briefcase />,
    name: "Projects",
    link: "/project",
    background: "/bg/bg3.jpg",
  },
  "/life": {
    icon: <Diamond />,
    name: "Life",
    link: "/life",
  },
  "/blog": {
    icon: <Article />,
    name: "Blog",
    link: "/blog",
  },
};
