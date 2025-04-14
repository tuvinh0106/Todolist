import { useState } from "react"
import type { Database } from "@/services/evolu/database"
import { todoCompletedQuery } from "@/services/query"
import { useEvolu, useQuery } from "@evolu/react"
import { TrashIcon } from "lucide-react"

import { iconSize } from "@/lib/constants"
import { toBoolean } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TodoItem } from "@/components/todo-item"

export default function TodoComplete() {
  const { rows } = useQuery(todoCompletedQuery)
  const { create } = useEvolu()
  const { update } = useEvolu<Database>()
  const [todoInput, setTodoInput] = useState<string>("")

  const isEmpty =
    rows.filter((row) => toBoolean(row.isComplete) && !toBoolean(row.isDeleted))
      .length == 0

  const handleAddTodo = () => {
    if (todoInput) {
      create("todo", { title: todoInput })
    }
    return
  }

  const handleClearAll = () => {
    rows.forEach((row) => {
      update("todo", { id: row.id, isDeleted: true })
    })
  }

  return (
    <div className="flex  flex-col">
      <div className="relative flex flex-col">
        <div className="flex h-12 items-center justify-between border-b-2">
          <h1 className="text-lg font-bold">Completed</h1>
          <button
            disabled={isEmpty}
            className="flex h-7 w-20 items-center gap-[6px] rounded-full px-2 transition-all hover:bg-red-400/10 hover:text-red-500 disabled:text-gray-400/80 disabled:hover:bg-transparent"
            onClick={() => handleClearAll()}
          >
            <p className="whitespace-nowrap text-xs">Clear All</p>
            <div>
              <TrashIcon size={iconSize} />
            </div>
          </button>
        </div>
        <ScrollArea className="h-[63dvh] w-full">
          <div className="p-4">
            {rows.map((row) => (
              <TodoItem key={row.title} row={row} />
            ))}
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
        </div>
        <Button className="rounded-full" onClick={handleAddTodo}>
          Add
        </Button>
      </div>
    </div>
  )
}
