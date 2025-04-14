import * as S from "@effect/schema/Schema"
import {
  id,
  String as NonEmptyString,
  SqliteBoolean,
  table,
} from "@evolu/react"

export const PriorityType = S.Enums({
  none: "none",
  low: "low",
  medium: "medium",
  high: "high",
})

export const TodoId = id("Todo")
export type TodoId = typeof TodoId.Type

export const NonEmptyString100 = NonEmptyString.pipe(
  S.minLength(1),
  S.maxLength(100),
  S.brand("NonEmptyString100")
)
export type NonEmptyString100 = typeof NonEmptyString100.Type

const TemporalString = S.String.pipe(S.brand("TemporalString"))
export const SqliteDateTime = TemporalString.pipe(S.brand("SqliteDateTime"))
export type SqliteDateTime = typeof SqliteDateTime.Type

export const TodoTable = table({
  id: TodoId,
  title: NonEmptyString100,
  note: S.NullOr(S.String.pipe(S.maxLength(1000))),
  priority: S.NullOr(PriorityType),
  location: S.NullOr(S.String.pipe(S.maxLength(100))),
  isComplete: SqliteBoolean,
  isPin: SqliteBoolean,
  deletedAt: S.NullOr(SqliteDateTime),
  remindAt: S.NullOr(SqliteDateTime),
})
export type TodoTable = typeof TodoTable.Type

// SETTINGS SCHEMA
export const AppColorType = S.Enums({
  neutral: "neutral",
  zinc: "zinc",
  stone: "stone",
})

export const CheckBoxType = S.Enums({
  square: "square",
  circle: "circle",
})

export const SettingsId = id("Settings")
export type SettingsId = typeof SettingsId.Type

export const SettingsTable = table({
  id: SettingsId,
  appColor: S.NullOr(AppColorType),
  checkBoxType: S.NullOr(CheckBoxType),
})
export type SettingsTable = typeof SettingsTable.Type
