import { memo, useContext, useState } from "react"
import type { Database } from "@/services/evolu/database"
import type { TodoRow } from "@/services/query"
import { useEvolu } from "@evolu/react"
import {
  format,
  formatDistanceToNow,
  isThisWeek,
  isToday,
  isTomorrow,
} from "date-fns"
import { motion } from "framer-motion"
import {
  ArrowUpWideNarrowIcon,
  CalendarIcon,
  EditIcon,
  MapPinIcon,
  MoreHorizontalIcon,
  PencilLineIcon,
  PinIcon,
  TrashIcon,
  Undo2Icon,
} from "lucide-react"

import { iconSize } from "@/lib/constants"
import { TodolistContext } from "@/lib/providers/todolist"
import { cn, toBoolean } from "@/lib/utils"
import { Checkbox } from "@/components/ui/custom/checkbox"

import { Badge } from "./ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

export const TodoItem = memo<{
  row: TodoRow
}>(function TodoItem({
  row: {
    id,
    title,
    note,
    priority,
    isComplete,
    isDeleted,
    isPin,
    remindAt,
    location,
  },
}) {
  const { update } = useEvolu<Database>()
  const [isPinned, setIsPinned] = useState<boolean>(toBoolean(isPin))
  const [isChecked, setIsChecked] = useState<boolean>(toBoolean(isComplete))
  const { settings } = useContext(TodolistContext)
  const delayTime = 500

  const isRemindDatePassed =
    remindAt !== null &&
    new Date(remindAt) < new Date() &&
    !isToday(new Date(remindAt))

  const formatRemindDate = (remindDate: Date) => {
    if (isToday(remindDate)) {
      return "today"
    } else if (isRemindDatePassed) {
      return formatDistanceToNow(new Date(remindAt), {
        addSuffix: true,
      })
    } else if (isTomorrow(remindDate)) {
      return "tomorrow"
    } else if (isThisWeek(remindDate)) {
      return format(remindDate, "EEEE")
    } else {
      return format(remindDate, "dd/MM/yyyy")
    }
  }

  const handleToggleCompletedClick = () => {
    setIsChecked(!isChecked)

    setTimeout(() => {
      update("todo", { id, isComplete: !isComplete })
    }, delayTime)
  }

  const handleDeletedClick = () => update("todo", { id, isDeleted: !isDeleted })

  const handleRestoreClick = () => update("todo", { id, isDeleted: !isDeleted })

  const handlePinnedClick = () => {
    setIsPinned(!isPinned)
    update("todo", { id, isPin: !isPin })
  }

  return (
    <motion.div
      key={id}
      layout
      className={cn(
        "mb-2 flex shrink-0 flex-col justify-between text-clip rounded-xl border p-2",
        isPinned && !toBoolean(isComplete) && "bg-secondary"
      )}
      initial={{ opacity: 0, x: 0 }}
      animate={{
        opacity: isChecked && !toBoolean(isComplete) ? 0.5 : 1,
        x: isChecked && !toBoolean(isComplete) ? 200 : 0,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: delayTime / 1000 }}
    >
      <div className="flex flex-auto items-start gap-2 rounded-lg bg-secondary/40 p-2">
        <Checkbox
          className={cn("size-6", toBoolean(isDeleted) && "hidden")}
          checked={isChecked}
          onCheckedChange={() => handleToggleCompletedClick()}
          checkBoxType={
            settings.checkBoxType === "circle" ? "circle" : "square"
          }
          name="todo"
        />

        <div className={cn("my-auto flex flex-auto flex-col", note && "gap-2")}>
          <p
            className={cn(
              "flex-auto leading-none text-foreground",
              isChecked && "text-foreground/80 line-through",
              toBoolean(isDeleted) && "text-foreground/50"
            )}
            key={id}
          >
            {title}
          </p>

          {!toBoolean(isComplete) && !toBoolean(isDeleted) && title && (
            <div className="text-[10px] leading-none text-foreground/70">
              {note && note.length < 20
                ? note
                : note && note.slice(0, 20) + "..."}
            </div>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex-initial self-start">
            <div className="px-2">
              <MoreHorizontalIcon size={iconSize} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex w-fit flex-col rounded-xl">
            <DropdownMenuItem
              className={cn(
                "flex gap-2",
                (isChecked || toBoolean(isDeleted)) && "hidden"
              )}
              onClick={() => handlePinnedClick()}
            >
              <PinIcon
                size={iconSize}
                className={cn(isPinned && "fill-current")}
              />
              <p>{isPinned ? "Unpin" : "Pin"}</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                "flex gap-2",
                (isChecked || toBoolean(isDeleted)) && "hidden"
              )}
              onClick={() => {}}
            >
              <EditIcon size={iconSize} />
              <p>Edit</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn("hidden", toBoolean(isDeleted) && "flex gap-2")}
              onClick={() => handleRestoreClick()}
            >
              <Undo2Icon size={iconSize} />
              <p>Restore</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn("flex gap-2", toBoolean(isDeleted) && "hidden")}
              onClick={() => handleDeletedClick()}
            >
              <TrashIcon size={iconSize} />
              <p>Move to trash</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn("flex gap-2", !toBoolean(isDeleted) && "hidden")}
              onClick={() => {}}
            >
              <TrashIcon size={iconSize} />
              <p>Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {(note ||
        toBoolean(isPin) ||
        location ||
        remindAt ||
        priority !== "none") &&
        !toBoolean(isComplete) &&
        !toBoolean(isDeleted) && (
          <div className="px-2 pt-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                {remindAt && (
                  <div
                    className={cn(
                      "flex items-center gap-1 text-xs leading-none text-foreground/70",
                      isRemindDatePassed && "text-red-500"
                    )}
                  >
                    <CalendarIcon size={iconSize} />
                    <p className="text-[10px]">
                      {formatRemindDate(new Date(remindAt))}
                    </p>
                  </div>
                )}
                {toBoolean(isPin) && (
                  <div className="flex items-center gap-1 text-xs leading-none text-foreground/70">
                    <PinIcon size={iconSize} />
                  </div>
                )}
                {note && (
                  <div className="flex items-center gap-1 text-xs leading-none text-foreground/70">
                    <PencilLineIcon size={iconSize} />
                  </div>
                )}
                {location && (
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center gap-1 text-xs leading-none text-foreground/70">
                        <MapPinIcon size={iconSize} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{location}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {priority !== "none" && (
                  <div className="flex items-center gap-1 text-xs leading-none text-foreground/70">
                    <ArrowUpWideNarrowIcon size={iconSize} />
                  </div>
                )}
              </div>
              {priority && priority !== "none" && (
                <Badge
                  className={cn(
                    "rounded-full px-2 py-1 text-[10px] font-semibold",
                    priority === "low" &&
                      "bg-yellow-400/20 text-yellow-500 hover:bg-yellow-400/10",
                    priority === "medium" &&
                      "bg-orange-400/20 text-orange-500 hover:bg-orange-400/10",
                    priority === "high" &&
                      "bg-red-400/20 text-red-500 hover:bg-red-400/10"
                  )}
                >
                  {priority}
                </Badge>
              )}
            </div>
          </div>
        )}
    </motion.div>
  )
})
