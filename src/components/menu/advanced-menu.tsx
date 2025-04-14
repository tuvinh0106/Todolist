import { useState } from "react"
import type { Database } from "@/services/evolu/database"
import type { SettingsRow } from "@/services/query"
import { useEvolu } from "@evolu/react"
import {
  ArrowUpWideNarrowIcon,
  CalendarIcon,
  CheckIcon,
  CircleIcon,
  MoreHorizontalIcon,
  PinIcon,
} from "lucide-react"

import type { CheckBoxType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/custom/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const AdvancedMenu = ({ settings }: { settings: SettingsRow }) => {
  const [isChecked, setIsChecked] = useState(false)

  console.log("checkBoxType", settings.checkBoxType)
  return (
    <div className="flex flex-col items-center space-y-6 px-5 py-1">
      <div className="flex flex-col space-y-1">
        <div className="flex h-fit w-[65vw] flex-col justify-between rounded-t-2xl border bg-background px-3 py-2 sm:w-96">
          <div
            className={cn(
              "flex items-start space-x-2 rounded-xl border-[0.7px] px-3 py-2",
              !isChecked && "bg-secondary"
            )}
          >
            <Checkbox
              checked={isChecked}
              onCheckedChange={() => setIsChecked(!isChecked)}
              checkBoxType={settings.checkBoxType as CheckBoxType | null}
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
        </div>
        <ScrollArea className="w-[65vw] rounded-b-2xl border sm:w-96">
          <div className="flex items-center justify-around p-2">
            <div className="flex items-center justify-center gap-2">
              <Label>Square</Label>
              <CheckBoxSelectButton type="square" settings={settings} />
            </div>
            <div className="flex items-center justify-center gap-2">
              <Label>Circle</Label>
              <CheckBoxSelectButton type="circle" settings={settings} />
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}

const CheckBoxSelectButton = ({
  type,
  settings,
}: {
  type: CheckBoxType
  settings: SettingsRow
}) => {
  const { update } = useEvolu<Database>()

  const handleCheckBoxSelect = (selectedTheme: CheckBoxType) => {
    update("settings", { id: settings.id, checkBoxType: selectedTheme })
  }

  const getCheckBoxType = (type: string) => {
    switch (type) {
      case "square":
        return "rounded-sm"
      case "circle":
        return "rounded-full"
    }
  }

  const getCheckBoxTypeIcon = (type: string) => {
    switch (type) {
      case "square":
        return <CheckIcon strokeWidth={3} className="size-5" />
      case "circle":
        return <CircleIcon className="size-4 fill-primary stroke-primary" />
    }
  }

  return (
    <div
      className={cn(
        "peer size-7 shrink-0 border border-muted-foreground/50 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "flex items-center justify-center",
        getCheckBoxType(type),
        settings?.checkBoxType?.includes(type) &&
          "outline outline-1 outline-offset-2 outline-ring"
      )}
      onClick={() => handleCheckBoxSelect(type as CheckBoxType)}
    >
      <div className="flex items-center justify-center text-current [&>:first-child]:data-[state=indeterminate]:hidden [&>:last-child]:data-[state=checked]:hidden">
        {getCheckBoxTypeIcon(type)}
      </div>
    </div>
  )
}
export default AdvancedMenu
