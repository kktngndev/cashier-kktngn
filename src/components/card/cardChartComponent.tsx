'use client'
import React from 'react'
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

Chart.register()

export function CardChartComponent() {
  return (
    <div className='w-[750px] h-fit bg-hacienda-100 font-semibold rounded-xl p-5'>
      <h1 className='text-xl text-hacienda-900'>Penjualan per hari</h1>
      <div className='h-72 w-full rounded-xl mt-5 flex justify-center items-center'>
        <Bar
          data={{
            labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
            datasets: [
              {
                label: 'Penjualan',
                data: [1278, 1365, 1002, 1128, 1331, 1297, 1281],
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
