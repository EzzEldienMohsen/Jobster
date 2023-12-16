import React from 'react'
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
const BarChar = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="count"
          fill="#3b82f6"
          activeBar={<Rectangle fill="#8884d8" stroke="blue" />}
          barSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChar
