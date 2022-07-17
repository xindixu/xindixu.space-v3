declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CONTENTFUL_SPACE_ID: string
      NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: string
      NEXT_PUBLIC_EMAIL_USER_ID: string
      NEXT_PUBLIC_EMAIL_SERVICE_ID: string
      NEXT_PUBLIC_GITHUB_ACCESS_TOKEN: string
      NODE_ENV: "development" | "production"
      PORT?: string
      PWD: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
