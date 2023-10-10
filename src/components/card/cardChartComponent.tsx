'use client'
import React from 'react'
import {
  Chart as ChartJS, CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend)

export default function CardChartComponent() {
  return (
    <div className='w-[750px] h-fit bg-hacienda-100 font-semibold rounded-xl p-5'>
      <h1 className='text-xl text-hacienda-900'>Penjualan per bulan</h1>
      <div className='h-72 w-full rounded-xl mt-5 flex justify-center items-center'>
        <Chart
          type='bar'
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
            datasets: [
              {
                label: 'Penjualan',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#826c11',
                borderColor: '#826c11',
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  )
}
