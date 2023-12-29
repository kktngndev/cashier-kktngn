import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import moment from "moment";
import 'moment/locale/id';

export async function GET() {
  const lastSevenDays = moment().subtract(7, 'days');
  const currentDay = moment();

  const dateRange: string[] = []
  let currDateCopy = currentDay.clone();

  while (currDateCopy.isSameOrAfter(lastSevenDays, 'day')) {
    dateRange.push(currDateCopy.format('YYYY-MM-DD'));
    currDateCopy = currDateCopy.subtract(1, 'day');
  }

  const { data, error } = await supabase.from('transaksi').select('created_at').gte('created_at', lastSevenDays.format('YYYY-MM-DD'));

  if (data) {
    const totalOrdersPerDay: Record<string, number> = dateRange.reduce((acc: any, date) => {
      const ordersOnDay = data?.filter(order => moment(order?.created_at).format('YYYY-MM-DD') === date) ?? [];
      acc[date] = ordersOnDay.length;
      return acc;
    }, {});

    // Convert the data to Chart.js format
    const chartData = Object.values(totalOrdersPerDay);
    const chartLabels = dateRange.map(date => moment(date).format('DD/MM'));

    return NextResponse.json({ data: chartData, labels: chartLabels });
  }

  if (error) {
    return NextResponse.error();
  }
}