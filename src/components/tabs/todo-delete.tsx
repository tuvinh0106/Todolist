import { useState } from "react"
import { todoDeleteQuery } from "@/services/query"
import { useEvolu, useQuery } from "@evolu/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TodoItem } from "@/components/todo-item"

export default function TodoDelete() {
  const { rows } = useQuery(todoDeleteQuery)
  const { create } = useEvolu()
  const [todoInput, setTodoInput] = useState<string>("")

  const handleAddTodo = () => {
    if (todoInput) {
      create("todo", { title: todoInput })
    }
    return
  }

  console.log(rows)

  return (
    <div className="flex  flex-col">
      <div className="relative flex flex-col">
        <div className="flex h-12 items-center justify-between border-b-2">
          <h1 className="text-lg font-bold">Deleted</h1>
        </div>
        <ScrollArea className="flex h-[63dvh] flex-col">
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
