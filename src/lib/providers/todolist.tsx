import { createContext, useState, type ReactNode } from "react"
import type { SettingsId } from "@/services/evolu/schema"
import { settingsQuery, type SettingsRow } from "@/services/query"
import { useQuery } from "@evolu/react"

export type TodolistProviderData = {
  focusMode: boolean
  setFocusMode: (state: boolean) => void
  settings: SettingsRow
}

export const TodolistContext = createContext<TodolistProviderData>({
  focusMode: false,
  setFocusMode: () => {},
  settings: {
    id: "" as SettingsId,
    appColor: null,
    checkBoxType: null,
  },
})

type TodolistProviderProps = {
  children: ReactNode
}

const TodolistProvider = ({ children }: TodolistProviderProps) => {
  const { rows } = useQuery(settingsQuery)
  const settings = rows[0]

  const [focusMode, setFocusMode] = useState(false)

  const data: TodolistProviderData = {
    focusMode,
    setFocusMode,
    settings,
  }

  return (
    <TodolistContext.Provider value={data}>{children}</TodolistContext.Provider>
  )
}

export default TodolistProvider
