import { allTodoQuery } from "@/services/query"
import { useQuery } from "@evolu/react"
import {
  CheckCheckIcon,
  DumbbellIcon,
  FlameIcon,
  PieChartIcon,
} from "lucide-react"
import { Cell, Pie, PieChart } from "recharts"

import { toBoolean } from "@/lib/utils"

const ProgressTab = () => {
  const { rows } = useQuery(allTodoQuery)

  const notCompletedTodos = rows.filter((row) => !toBoolean(row.isComplete))
  const completedTodos = rows.filter((row) => toBoolean(row.isComplete))

  console.log("notCompletedTodos", notCompletedTodos)
  function getProgressIcon() {
    if (completedTodos.length == rows.length) {
      return (
        <div className="flex flex-col items-center">
          <CheckCheckIcon size={40} strokeWidth={1.5} />
          <p className="text-xs">All Done!</p>
        </div>
      )
    } else if (completedTodos.length >= rows.length / 2) {
      return (
        <div className="flex flex-col items-center gap-1">
          <FlameIcon size={30} strokeWidth={1.5} />
          <p className="text-xs">Great Job!</p>
        </div>
      )
    } else if (completedTodos.length <= rows.length / 2) {
      return (
        <div className="flex flex-col items-center gap-1">
          <DumbbellIcon size={30} strokeWidth={1.5} />
          <p className="text-xs">On The Way!</p>
        </div>
      )
    }
  }

  const data = [
    { name: "todos", value: notCompletedTodos.length },
    { name: "completed", value: completedTodos.length },
  ]

  return (
    <div className="flex flex-col gap-2">
      <h1 className="flex h-12 items-center border-b-2 text-lg font-bold">
        Progress
      </h1>
      {rows.length == 0 && (
        <div className="flex h-[63dvh] w-full flex-col items-center justify-center gap-3">
          <PieChartIcon size={100} strokeWidth={0.7} />
          <p>No Data to Analysis</p>
        </div>
      )}
      {rows.length > 0 && (
        <div className="flex flex-col items-center justify-center self-center justify-self-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute">{getProgressIcon()}</div>
            <PieChart width={250} height={350}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                label
                startAngle={90}
                endAngle={450}
              >
                {data.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    strokeWidth={0}
                    fill={
                      index === 1
                        ? "hsl(var(--primary))"
                        : "hsl(var(--secondary))"
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-primary"></div>
              <p>Completed</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-secondary"></div>
              <p>Not completed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgressTab
