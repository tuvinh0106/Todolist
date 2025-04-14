"use client"

import { useEffect, useState } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import type { Theme } from "@/lib/types"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleThemeChange = (theme: string) => {
    setTheme(theme as Theme)
  }

  return (
    <div className="flex w-full items-center justify-between">
      <label htmlFor="darkMode">Dark Mode</label>
      <Select
        name="theme"
        value={theme ?? "dark"}
        onValueChange={handleThemeChange}
      >
        <SelectTrigger className="flex h-7 w-fit items-center justify-between rounded-full border-none bg-secondary/70 text-xs font-normal transition-all hover:bg-border/20">
          <div className="mr-2 flex items-center gap-1">
            {theme === "light" ? (
              <Sun size={12} />
            ) : theme === "system" ? (
              <Monitor size={12} />
            ) : (
              <Moon size={12} />
            )}
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent className="flex w-fit flex-col rounded-xl p-1 text-foreground/80">
          <SelectGroup>
            <SelectItem value="light">
              <p>Light</p>
            </SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
