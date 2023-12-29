'use client'
import { useState, useEffect } from 'react'
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { LoaderComponent } from '@/components'

Chart.register()

export function CardChartComponent() {
  const [isLoading, setIsLoading] = useState(true)
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Penjualan',
        data: [], // Initial data placeholder
        backgroundColor: '#826c11',
        borderColor: '#826c11',
      },
    ],
  });

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
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-[750px] h-fit bg-hacienda-100 font-semibold rounded-xl p-5'>
      <h1 className='text-xl text-hacienda-900'>Penjualan per hari</h1>
      <div className='h-72 w-full rounded-xl mt-5 flex justify-center items-center'>
        {
          isLoading ? <LoaderComponent /> :
            (
              <>
                <Bar
                  data={chartData}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </>
            )
        }
      </div>
    </div>
  )
}
