import { useContext, useEffect } from "react"
import { useTheme } from "next-themes"

import { TodolistContext } from "@/lib/providers/todolist"
import AppMenu from "@/components/app-menu"
import AppTabs from "@/components/app-tabs"

export default function HomePage() {
  const { theme } = useTheme()
  const { settings } = useContext(TodolistContext)

  useEffect(() => {
    if (settings) {
      document.documentElement.className = `${settings.appColor} ${theme}`
    }
  }, [settings, theme])

  return (
    <div className="relative flex h-dvh items-center justify-center">
      <div className="container pointer-events-none absolute left-1/2 top-0 z-0 h-full -translate-x-1/2">
        <div className="absolute left-0 top-0 z-10 grid size-full grid-cols-2 px-8 md:grid-cols-4 lg:grid-cols-6">
          <div className="size-full border-l border-dashed border-border" />
          <div className="hidden size-full border-l border-dashed border-border lg:block" />
          <div className="hidden size-full border-l border-dashed border-border lg:block" />
          <div className="hidden size-full border-l border-dashed border-border md:block" />
          <div className="hidden size-full border-l border-dashed border-border md:block" />
          <div className="size-full border-x border-dashed border-border" />
        </div>
      </div>
      <div className="z-[1] flex size-full max-w-xl flex-col items-center justify-end gap-1 px-2 sm:justify-center">
        <AppMenu />

        <div className="container flex h-[90dvh] max-w-xl flex-col rounded-t-[30px] bg-background px-5 pt-5 sm:rounded-[30px]">
          <AppTabs />
        </div>
      </div>
    </div>
  )
}
