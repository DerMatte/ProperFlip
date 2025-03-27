"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    views: 400,
    inquiries: 24,
  },
  {
    name: "Feb",
    views: 300,
    inquiries: 13,
  },
  {
    name: "Mar",
    views: 520,
    inquiries: 32,
  },
  {
    name: "Apr",
    views: 450,
    inquiries: 27,
  },
  {
    name: "May",
    views: 380,
    inquiries: 22,
  },
  {
    name: "Jun",
    views: 600,
    inquiries: 38,
  },
]

export function PropertyListingChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="views" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Bar dataKey="inquiries" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary/50" />
      </BarChart>
    </ResponsiveContainer>
  )
}

