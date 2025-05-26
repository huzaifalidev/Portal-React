"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { week: "Week 1", reports: 25 },
  { week: "Week 2", reports: 32 },
  { week: "Week 3", reports: 28 },
  { week: "Week 4", reports: 45 },
  { week: "Week 5", reports: 38 },
  { week: "Week 6", reports: 52 },
  { week: "Week 7", reports: 48 },
  { week: "Week 8", reports: 65 },
]

const chartConfig = {
  reports: {
    label: "Reports Generated",
    color: "hsl(var(--chart-1))",
  },
}

export function ReportsGeneratedChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports Generated</CardTitle>
        <CardDescription>Weekly report generation trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-reports)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-reports)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="reports"
                stroke="var(--color-reports)"
                fillOpacity={1}
                fill="url(#colorReports)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
