'use client'
import { useState, useEffect, Suspense } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { LoaderComponent } from '@/components'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function CardChartComponent() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Penjualan',
        data: [],
        backgroundColor: '#826c11',
        borderColor: '#826c11',
      },
    ],
  });

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/report/getLastSevenDaysOrder`, {}).then(res => res.json());

        if (orderData && orderData.data && orderData.labels) {
          setChartData({
            labels: orderData.labels,
            datasets: [
              {
                label: 'Penjualan',
                data: orderData.data,
                backgroundColor: '#826c11',
                borderColor: '#826c11',
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-[750px] h-fit bg-hacienda-100 font-semibold rounded-xl p-5'>
      <Suspense fallback={<LoaderComponent />}>
        <h1 className='text-xl text-hacienda-900'>Penjualan per hari</h1>
        <div className='h-72 w-full rounded-xl mt-5 flex justify-center items-center'>
          {
            (
              <Bar
                data={chartData}
                options={options}
              />
            )
          }
        </div>
      </Suspense>
    </div>
  )
}
