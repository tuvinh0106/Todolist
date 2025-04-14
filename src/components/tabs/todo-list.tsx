import { useState } from "react"
import { todoQuery } from "@/services/query"
import { useEvolu, useQuery } from "@evolu/react"
import { ArrowUpDownIcon, CircleAlertIcon } from "lucide-react"

import { iconSize } from "@/lib/constants"
import type { Priority } from "@/lib/types"
import { toBoolean } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { TodoItem } from "@/components/todo-item"

import NewTodoModal from "../new-todo-modal"

export default function TodoList() {
  const { rows } = useQuery(todoQuery)
  const { create } = useEvolu()
  const [todoInput, setTodoInput] = useState<string>("")

  const handleAddTodo = () => {
    if (todoInput) {
      create("todo", { title: todoInput })
    }
    return
  }

  const [sortByValue, setSortByValue] = useState<string>("dateCreated")

  const isEmpty =
    rows.filter(
      (row) => !toBoolean(row.isComplete) && !toBoolean(row.isDeleted)
    ).length == 0

  return (
    <div className="flex  flex-col">
      <div className="relative flex flex-col">
        <div className="flex h-12 items-center justify-between border-b-2">
          <h1 className="text-lg font-bold">Todos</h1>
          <Select
            defaultValue="dateCreated"
            onValueChange={(value) => setSortByValue(value)}
          >
            <SelectTrigger
              disabled={isEmpty}
              className="flex h-7 w-20 items-center gap-[6px] rounded-full border-none px-2  transition-all hover:bg-border/50 disabled:cursor-default disabled:hover:bg-transparent"
            >
              <p className="whitespace-nowrap text-xs">Sort By</p>
              <div>
                <ArrowUpDownIcon size={iconSize} />
              </div>
            </SelectTrigger>
            <SelectContent className="flex w-fit flex-col rounded-xl text-foreground/80">
              <SelectGroup>
                <SelectItem value="dateCreated">Date Created</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ScrollArea className="h-[63dvh] w-full">
          <div className="p-4">
            {rows
              .filter(
                (row) => !toBoolean(row.isComplete) && !toBoolean(row.isDeleted)
              )
              .sort((a, b) => {
                if (toBoolean(a.isPin) && !toBoolean(b.isPin)) {
                  return -1
                } else if (!toBoolean(a.isPin) && toBoolean(b.isPin)) {
                  return 1
                }

                if (toBoolean(a.isPin) || toBoolean(b.isPin)) return 0

                if (sortByValue === "dateCreated") {
                  return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                  )
                } else if (sortByValue === "priority") {
                  const priorityOrder = { high: 3, medium: 2, low: 1, none: 0 }
                  return (
                    priorityOrder[(b.priority ?? "none") as Priority] -
                    priorityOrder[(b.priority ?? "none") as Priority]
                  )
                } else {
                  return a.title.localeCompare(b.title)
                }
              })
              .map((todo) => (
                <TodoItem key={todo.title} row={todo} />
              ))}

            {rows.filter(
              (row) => !toBoolean(row.isComplete) && !toBoolean(row.isDeleted)
            ).length == 0 && (
              <div className="flex h-[50dvh] w-full flex-col items-center justify-center gap-3">
                <CircleAlertIcon size={100} strokeWidth={0.7} />
                <p>No todos</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="mt-3 flex gap-2">
        <div className="relative flex w-full items-center">
          <Input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="I want to..."
            className="rounded-full text-foreground"
          />
          <NewTodoModal />
        </div>
        <Button className="rounded-full" onClick={handleAddTodo}>
          Add
        </Button>
      </div>
    </div>
  )
}
