import { Database } from "@/services/evolu/database"
import { NonEmptyString100, SqliteDateTime } from "@/services/evolu/schema"
import * as S from "@effect/schema/Schema"
import { createEvolu, createIndexes, SqliteBoolean } from "@evolu/react"

const indexes = createIndexes((create) => [
  create("indexTodoCreatedAt").on("todo").column("createdAt"),
  create("indexSettingsCreatedAt").on("settings").column("createdAt"),
])

export const evolu = createEvolu(Database, {
  indexes,
  initialData: (evolu) => {
    evolu.create("todo", {
      title: S.decodeSync(NonEmptyString100)("Here is Title"),
      note: S.decodeSync(S.String.pipe(S.maxLength(1000)))("Here is Note"),
      priority: S.decodeSync(
        S.NullOr(
          S.Enums({
            none: "none",
            low: "low",
            medium: "medium",
            high: "high",
          })
        )
      )("medium"),
      location: S.decodeSync(S.NullOr(S.String.pipe(S.maxLength(100))))(
        "Vietnam"
      ),
      isComplete: S.decodeSync(SqliteBoolean)(0),
      isPin: S.decodeSync(SqliteBoolean)(0),
      deletedAt: S.decodeSync(S.NullOr(SqliteDateTime))(null),
      remindAt: S.decodeSync(S.NullOr(SqliteDateTime))(null),
    })

    evolu.create("settings", {
      appColor: S.decodeSync(NonEmptyString100)("neutral"),
      checkBoxType: S.decodeSync(NonEmptyString100)("square"),
    })
  },
})
