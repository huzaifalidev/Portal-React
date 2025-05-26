"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const data = [
  { name: "Completed", value: 45, color: "hsl(var(--chart-1))" },
  { name: "In Progress", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Pending", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Overdue", value: 10, color: "hsl(var(--chart-4))" },
]

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  inProgress: {
    label: "In Progress",
    color: "hsl(var(--chart-2))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-3))",
  },
  overdue: {
    label: "Overdue",
    color: "hsl(var(--chart-4))",
  },
}

export function TaskStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Status Distribution</CardTitle>
        <CardDescription>Current breakdown of task statuses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-gray-600">
                {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
