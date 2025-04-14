import { useState } from "react"
import * as React from "react"
import { useEvolu } from "@evolu/react"
import { format } from "date-fns"
import {
  ArrowUpWideNarrow,
  Calendar as CalendarIcon,
  CheckSquare,
  MapPin,
  Maximize2Icon,
  PencilLine,
} from "lucide-react"

import { iconSize } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  TodoListClose,
  TodoListContent,
  TodoListFooter,
  TodoListHeader,
  TodoListModal,
  TodoListTitle,
  TodoListTrigger,
} from "@/components/ui/custom/modal"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/text-area"

import { Calendar } from "./ui/calendar"

const NewTodoModal = () => {
  const { create } = useEvolu()
  const [todoInput, setTodoInput] = useState<string>("")
  const [noteInput, setNoteInput] = useState<string>("")
  const [date, setDate] = useState<Date | null>(null)
  const [priority, setPriority] = useState("none")
  const [location, setLocation] = useState<string>("")

  const handleAddTodo = () => {
    console.log(todoInput)
    if (todoInput) {
      create("todo", {
        title: todoInput,
        note: noteInput,
        priority: priority,
        location: location,
        remindAt: date ? date.toISOString() : undefined,
      })
    }
    return
  }

  const handleResetForm = () => {
    setTodoInput("")
    setNoteInput("")
    setPriority("none")
    setDate(null)
    setLocation("")
    return
  }

  return (
    <TodoListModal onOpenChange={() => handleResetForm}>
      <TodoListTrigger asChild>
        <div className="absolute right-1 flex cursor-pointer items-center justify-center rounded-full p-2 backdrop-blur-md transition-colors hover:text-foreground">
          <Maximize2Icon size={iconSize} />
        </div>
      </TodoListTrigger>
      <TodoListContent className="p-4 sm:rounded-3xl">
        <TodoListHeader className="max-md:self-center">
          <TodoListTitle>New Todo</TodoListTitle>
        </TodoListHeader>
        <div className="mt-3 flex flex-col gap-5">
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="title"
              className="flex items-center gap-2 font-medium"
            >
              <CheckSquare size={17} />
              <p>Title</p>
            </label>
            <Input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              placeholder="I want to..."
              className="rounded-xl border-[0.7px]"
              id="title"
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="note"
              className="flex items-center gap-2 font-medium"
            >
              <PencilLine size={17} />
              <p>Note</p>
            </label>
            <Textarea
              placeholder="Add note"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="resize-none rounded-xl border-[0.7px] text-xs text-foreground/60 "
              id="note"
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="location"
              className="flex items-center gap-2 font-medium"
            >
              <MapPin size={17} />
              <p>Location</p>
            </label>
            <Input
              type="text"
              value={location || ""}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-xl border-[0.7px]"
              id="location"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex w-full items-center justify-start rounded-xl px-3 text-left text-sm font-normal hover:bg-transparent hover:text-muted-foreground",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon size={iconSize} className="mr-2" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date ?? new Date()}
                    fromDate={new Date()}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate ?? null)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col">
              <Select
                defaultValue="none"
                onValueChange={(value) => setPriority(value)}
              >
                <SelectTrigger
                  className={cn(
                    "flex w-full rounded-xl text-left text-sm font-normal"
                  )}
                >
                  <div
                    className={cn(
                      "flex w-32 items-center rounded-xl px-3 text-left font-normal",
                      priority === "none" && "text-muted-foreground"
                    )}
                  >
                    <ArrowUpWideNarrow size={iconSize} className="mr-2" />
                    {priority !== "none" ? (
                      <SelectValue />
                    ) : (
                      <span>Set priority</span>
                    )}
                  </div>
                </SelectTrigger>
                <SelectContent className="flex w-fit flex-col rounded-xl text-foreground/80">
                  <SelectGroup>
                    <SelectItem value="high">high</SelectItem>
                    <SelectItem value="medium">medium</SelectItem>
                    <SelectItem value="low">low</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="none">none</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <TodoListFooter>
          <TodoListClose asChild>
            <div className="flex flex-col items-center gap-1 sm:flex-row">
              <Button
                className="w-full flex-auto rounded-full sm:order-2"
                onClick={handleAddTodo}
              >
                Add
              </Button>
              <Button className="w-24 rounded-full bg-transparent text-foreground hover:bg-foreground/5  sm:order-1  ">
                Close
              </Button>
            </div>
          </TodoListClose>
        </TodoListFooter>
      </TodoListContent>
    </TodoListModal>
  )
}

export default NewTodoModal
