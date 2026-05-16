import React from "react"
import { Briefcase, Workshop } from "grommet-icons"

export type ExperienceSection = {
  title: string
  items: string[]
}

export type Experience = {
  company: string
  jobTitle: string
  date: string
  icon: React.ReactElement
  list?: string[]
  sections?: ExperienceSection[]
}

export const experiences: Experience[] = [
  {
    company: "Instabase",
    jobTitle: "Technical Lead and Software Engineer",
    date: "02/2023 – Present",
    icon: <Briefcase />,
    sections: [
      {
        title: "Full Stack Feature Development",
        items: [
          "Enterprise Communication Suite: Built out core SuperApp messaging features, including a real-time chat engine with hierarchical reply threads, a custom Markdown rendering engine, and a multi-platform push notification service.",
          "Security & Mobile Resilience: Delivered mission-critical security infrastructure (OAuth2, RBAC, and SAML group sync) while engineering offline-first mobile capabilities to ensure a seamless user experience regardless of connectivity.",
        ],
      },
      {
        title: "Frontend Infrastructure",
        items: [
          "Multi-Platform Unified Architecture: Architected the SuperApp unified codebase to support five platforms (Web, iOS, Android, macOS, and Windows) from a single source. Introduced a type-safe feature management system using Protobuf to provide granular, cross-stack control over feature releases.",
          "CI/CD & Developer Experience: Modernized the development lifecycle by migrating to GitHub Actions and containerizing E2E test pipelines, which reduced weekly CI failure rates from 95% to under 2%. Improved long-term maintainability by liquidating 42,000+ lines of deprecated legacy code.",
        ],
      },
      {
        title: "Performance Improvements",
        items: [
          "Advanced Caching & Data Optimization: Engineered application-level caching strategies that reduced redundant network overhead by 50x and optimized batch permission endpoints to achieve a 50% reduction in execution time for large-scale updates.",
          "High-Performance UI & Connectivity: Refactored core UI components using virtualized rendering to handle large datasets and built a robust WebSocket-based messaging engine with custom heartbeat logic to ensure real-time reliability on unstable networks.",
        ],
      },
      {
        title: "Growth & Innovation",
        items: [
          "AI Product Engineering: Architected the Huddle AI agent, implementing complex logic for real-time voice processing and automated meeting summaries.",
          "High-Velocity Delivery: Focused on rapid innovation and customer success by delivering the AIHub App Store and critical data management flows under extreme deadlines (ranging from 24-hour turnarounds to two-week sprints).",
        ],
      },
      {
        title: "Leadership",
        items: [
          "Technical Leadership & Mentorship: Acted as Tech Lead for platform-wide migrations, managing a team of four engineers to implement complex, multi-step state management patterns using modern action-reducer architectures.",
          "Operational Excellence: Scaled the engineering organization by authoring comprehensive technical documentation and onboarding guides, while maintaining a sub-1-hour resolution time for critical production incidents.",
        ],
      },
    ],
  },
  {
    company: "Instabase",
    jobTitle: "Software Engineer Intern",
    date: "05/2022 – 08/2022",
    icon: <Briefcase />,
    list: [
      "Planned, scoped, and designed an Admin Diagnostics App to help site admins troubleshoot their Instabase deployment",
      "Built the entire Admin Diagnostics App from scratch and shipped the beta version in 10 weeks with React, Python Flask, and Go",
      "Collaborated with the designers and engineers to design and build generic components for the company’s design system Pollen",
      "Researched and gradually migrated ESlint and TSlint config to improve the developer experience and code quality",
      "Won 1st place out of 40 teams in the company's hackathon by adding real-time collaboration to enable 100 users to annotate the same document",
    ],
  },
  {
    company: "Columbia University",
    jobTitle: "MSCS - Software System Track",
    date: "08/2021 – Present",
    icon: <Workshop />,
    list: [
      "Took 30 credit hours of CS classes related to Software System and mastered classic and current software systems",
    ],
  },
  {
    company: "BrainHAK",
    jobTitle: "Lead Software Engineer & Project Manager (Volunteer)",
    date: "06/2021 – 08/2021",
    icon: <Briefcase />,
    list: [
      "Research and decide on tech stacks to use based on product features for a static website and a web app",
      "Plan out development cycle and distribute tasks based on engineers' skills and interests",
    ],
  },
  {
    company: "Pingboard",
    jobTitle: "Software Engineer",
    date: "06/2020 – 06/2021",
    icon: <Briefcase />,
    list: [
      "Consistently delivered intricate, accessible, and performant features with thorough tests and documentations for Employees Networking app built with React, JavaScript, Ruby on Rails",
      "Researched and built complex features such as drag-n-drop sortable lists, real-time agenda editing",
      "Boosted initial load speed by 10% via migrating legacy code, building over 10 single-page apps with best-fit design patterns, and outsourcing heavy calculation to web workers",
      "Improved accessibility with keyboard navigation aligned with web accessibility guidelines and create animations for a native-like experience",
      "Investigated and planed development process, contributed ideas to bi-monthly reflection meetings, and researched and presented new technologies to engineers",
    ],
  },
  {
    company: "The University of Texas at Austin",
    jobTitle: "BS in Advertising & Minor in CS",
    date: "08/2016 – 05/2020",
    icon: <Workshop />,
    list: [
      "Took 30 credit hours of CS classes and built various web apps, mobile apps, and games with industry-standard technologies in teams and solo",
      "Conducted dozens of advertising projects and graduated from Texas Media & Analytics, the top 1 advertising program in the U.S.",
      "Graduated with BS in Advertising with Honor, earned CS certificate, Japanese certificate, Business minor, and history minor",
    ],
  },
  {
    company: "Pingboard",
    jobTitle: "Software Engineer Intern",
    date: "06/2019 – 05/2020",
    icon: <Briefcase />,
    list: [
      "Built forms and real-time preview for custom field library, triple the usage in only 2 weeks of release",
      "Created backend APIs with recursive SQL to fetch and filter recruiting data and search services to filter employees based on profile data",
      "Redesigned homepage accentuating hiring roles results in a 57% increase in hiring roles usage",
    ],
  },
  {
    company: "ProMazo",
    jobTitle: "Front-end Software Engineer",
    date: "04/2020 – 08/2020",
    icon: <Briefcase />,
    list: [
      "Led a front-end team of 4 to implement designs and build 20+ components and pages for Job Application Tracking web app with JavaScript, React, Redux, AWS, and GraphQL",
      "Promoted and set up prototyping, code review, and QA process, managed Kanban board to track process, and standardized React component library and style variable settings",
      "Built a scaffolding tool to generate code for React components, style components, Redux integration, and Storybook in the selected directory with Node.js to facilitate development and standardize code practice",
    ],
  },
  {
    company: "Nokia",
    jobTitle: "Front-end Engineer Co-op",
    date: "09/2018 – 05/2019",
    icon: <Briefcase />,
    list: [
      "Designed and implemented features in Nokia’s Demo System built with Django to improve user experience, ease of use, and scalability",
      "Created customer feedback and rating system to collect user comments for future improvements, set up one-to-many model for Postgres database and view-controller logics",
      "Redesigned Demo Center WordPress website based on interview feedback and design thinking methodology, which resulted in 400% increase in visits per month",
      "Promoted website redesign with an emphasis on UX/UI throughout the Digital Experience business unit",
    ],
  },
]
