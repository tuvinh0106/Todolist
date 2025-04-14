import { database } from "@evolu/react"

import { SettingsTable, TodoTable } from "./schema"

export const Database = database({
  todo: TodoTable,
  settings: SettingsTable,
})
export type Database = typeof Database.Type
