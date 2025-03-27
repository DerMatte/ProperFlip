"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    views: 2500,
    inquiries: 120,
  },
  {
    name: "Feb",
    views: 3000,
    inquiries: 150,
  },
  {
    name: "Mar",
    views: 4000,
    inquiries: 200,
  },
  {
    name: "Apr",
    views: 2780,
    inquiries: 140,
  },
  {
    name: "May",
    views: 1890,
    inquiries: 90,
  },
  {
    name: "Jun",
    views: 2390,
    inquiries: 120,
  },
  {
    name: "Jul",
    views: 3490,
    inquiries: 180,
  },
]

export function PropertyPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="inquiries" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

