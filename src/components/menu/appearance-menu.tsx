import { useState } from "react"
import type { Database } from "@/services/evolu/database"
import type { SettingsRow } from "@/services/query"
import { useEvolu } from "@evolu/react"
import {
  ArrowUpWideNarrowIcon,
  CalendarIcon,
  CheckIcon,
  MoreHorizontalIcon,
  PinIcon,
} from "lucide-react"

import type { ColorTheme } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ToggleTheme from "@/components/theme-toggle"

const AppearanceMenu = ({ settings }: { settings: SettingsRow }) => {
  const [isChecked, setIsChecked] = useState(false)

  console.log("settings", settings)
  return (
    <div className="flex flex-col items-center space-y-6 px-5 py-1">
      <div className="flex flex-col space-y-1">
        <div className="flex h-24 w-[65vw] flex-col justify-between rounded-t-2xl border bg-background px-3 py-2 sm:w-96">
          <div
            className={cn(
              "flex items-start space-x-2 rounded-xl border-[0.7px] px-3 py-2",
              !isChecked && "bg-secondary"
            )}
          >
            <Checkbox
              checked={isChecked}
              onCheckedChange={() => setIsChecked(!isChecked)}
              className="flex size-[10px] items-center justify-center accent-primary"
            />
            <div className="flex-auto space-y-3">
              <div
                className={cn(
                  "h-2 w-11/12 text-[10px] leading-none",
                  isChecked && "line-through"
                )}
              >
                Here is Title
              </div>
              {!isChecked && (
                <div className="flex h-[6px] w-full items-center justify-between gap-[3px] text-[8px]">
                  <div className="flex items-center gap-1">
                    <CalendarIcon size={8} />
                    <p>right now</p>
                    <PinIcon size={8} />
                    <ArrowUpWideNarrowIcon size={8} />
                  </div>
                  <div className="flex items-center gap-1 text-xs leading-none">
                    <div className="rounded-full bg-red-400/20 px-1 py-[1.5px] text-[6px] font-semibold text-red-500">
                      high
                    </div>
                  </div>
                </div>
              )}
            </div>
            <MoreHorizontalIcon size={10} />
          </div>
          <div className="flex h-6 space-x-1">
            <div className="flex w-full items-center rounded-full border p-2 text-[9px]">
              I want to...
            </div>
            <Button className="h-6 w-10 cursor-default rounded-full text-[9px]">
              Add
            </Button>
          </div>
        </div>
        <ScrollArea className="w-[65vw] rounded-b-2xl border sm:w-96">
          <div className="flex space-x-3 p-2">
            <ColorThemeButton color="neutral" settings={settings} />
            <ColorThemeButton color="zinc" settings={settings} />
            <ColorThemeButton color="stone" settings={settings} />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="w-[65vw] sm:w-96">
        <ToggleTheme />
      </div>
    </div>
  )
}

const ColorThemeButton = ({
  color,
  settings,
}: {
  color: ColorTheme
  settings: SettingsRow
}) => {
  const { update } = useEvolu<Database>()

  const handleThemeChange = (selectedTheme: ColorTheme) => {
    update("settings", { id: settings.id, appColor: selectedTheme })
  }

  const getButtonColor = (color: string) => {
    switch (color) {
      case "neutral":
        return "bg-neutral-600"
      case "zinc":
        return "bg-zinc-500"
      case "stone":
        return "bg-stone-500"
    }
  }

  return (
    <button
      className={cn(
        "flex size-10 items-center justify-center rounded-full p-2",
        getButtonColor(color)
      )}
      onClick={() => handleThemeChange(color as ColorTheme)}
    >
      {settings?.appColor?.includes(color) && (
        <div className="size-5 rounded-full bg-white">
          <CheckIcon className="size-full p-1 text-black" />
        </div>
      )}
    </button>
  )
}
export default AppearanceMenu
