"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "Jan",
    inquiries: 100,
    viewings: 45,
    offers: 20,
    sales: 12,
  },
  {
    name: "Feb",
    inquiries: 120,
    viewings: 60,
    offers: 25,
    sales: 15,
  },
  {
    name: "Mar",
    inquiries: 140,
    viewings: 70,
    offers: 30,
    sales: 18,
  },
  {
    name: "Apr",
    inquiries: 110,
    viewings: 55,
    offers: 22,
    sales: 14,
  },
  {
    name: "May",
    inquiries: 130,
    viewings: 65,
    offers: 28,
    sales: 16,
  },
  {
    name: "Jun",
    inquiries: 150,
    viewings: 75,
    offers: 35,
    sales: 20,
  },
]

export function LeadConversionChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Legend />
        <Bar dataKey="inquiries" fill="#8884d8" />
        <Bar dataKey="viewings" fill="#82ca9d" />
        <Bar dataKey="offers" fill="#ffc658" />
        <Bar dataKey="sales" fill="#ff8042" />
      </BarChart>
    </ResponsiveContainer>
  )
}

