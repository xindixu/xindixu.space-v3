import path from "path"

import { reactShapePlugin } from "ts-migrate-plugins"
import { migrate, MigrateConfig } from "ts-migrate-server"

// create new migration config and add ts-ignore plugin with empty options
const config = new MigrateConfig().addPlugin(reactShapePlugin, {})

// run migration
const exitCode = await migrate({
  rootDir: ".",
  config,
  sources: [
    "components/*.js",
    "*.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "node_modules/**/*.d.ts",
  ],
  tsConfigDir: "./",
})

process.exit(exitCode)
