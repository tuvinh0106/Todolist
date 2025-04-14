import { evolu } from "@/services/evolu/client"
import { cast, type ExtractRow, type NotNull } from "@evolu/react"

export const allTodoQuery = evolu.createQuery((db) =>
  db
    .selectFrom("todo")
    .select([
      "id",
      "title",
      "note",
      "priority",
      "isPin",
      "isComplete",
      "location",
      "remindAt",
      "isDeleted",
      "createdAt",
    ])
    .where("title", "is not", null)
    .where("isDeleted", "is not", cast(true))
    .$narrowType<{ title: NotNull }>()
    .orderBy("createdAt")
)

export const todoQuery = evolu.createQuery((db) =>
  db
    .selectFrom("todo")
    .select([
      "id",
      "title",
      "note",
      "priority",
      "isPin",
      "isComplete",
      "location",
      "remindAt",
      "isDeleted",
      "createdAt",
    ])
    .where("title", "is not", null)
    .where("isComplete", "is not", cast(true))
    .where("isDeleted", "is not", cast(true))
    .$narrowType<{ title: NotNull }>()
    .orderBy("createdAt")
)

export const todoCompletedQuery = evolu.createQuery((db) =>
  db
    .selectFrom("todo")
    .select([
      "id",
      "title",
      "note",
      "priority",
      "isPin",
      "isComplete",
      "location",
      "remindAt",
      "isDeleted",
      "createdAt",
    ])
    .where("title", "is not", null)
    .where("isComplete", "is", cast(true))
    .where("isDeleted", "is not", cast(true))
    .$narrowType<{ title: NotNull }>()
    .orderBy("createdAt")
)

export const todoDeleteQuery = evolu.createQuery((db) =>
  db
    .selectFrom("todo")
    .select([
      "id",
      "title",
      "note",
      "priority",
      "isPin",
      "isComplete",
      "location",
      "remindAt",
      "isDeleted",
      "createdAt",
    ])
    .where("title", "is not", null)
    .where("isDeleted", "is", cast(true))
    .$narrowType<{ title: NotNull }>()
    .orderBy("createdAt")
)

export type TodoRow = ExtractRow<typeof todoQuery>

// SETTINGS QUERY
export const settingsQuery = evolu.createQuery((db) =>
  db.selectFrom("settings").select(["id", "appColor", "checkBoxType"])
)

export type SettingsRow = ExtractRow<typeof settingsQuery>
