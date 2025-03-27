"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Single Family", value: 40 },
  { name: "Condo", value: 30 },
  { name: "Townhouse", value: 15 },
  { name: "Multi-Family", value: 10 },
  { name: "Land", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function PropertyTypeDistribution() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

