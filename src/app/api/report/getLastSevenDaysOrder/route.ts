import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import moment from "moment";
import 'moment/locale/id';

export async function GET() {
  const lastSevenDays = moment().subtract(7, 'days');
  const currentDay = moment();

  const dayOrder = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  const dateRange: string[] = []
  let currDateCopy = currentDay.clone();

  while (currDateCopy.isSameOrAfter(lastSevenDays, 'day')) {
    dateRange.push(currDateCopy.format('dddd'));
    currDateCopy = currDateCopy.subtract(1, 'day');
  }

  const sortedDayNames = dateRange.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));

  const { data, error } = await supabase.from('transaksi').select('created_at').gte('created_at', lastSevenDays.format('YYYY-MM-DD'));

  if (data) {
    const totalOrdersPerDay: Record<string, number> = sortedDayNames.reduce((acc: any, dayName) => {
      const ordersOnDay = data?.filter(order => moment(order?.created_at).format('dddd') === dayName) ?? [];
      acc[dayName] = ordersOnDay.length;
      return acc;
    }, {});

    // Convert the data to Chart.js format
    const chartData = Object.values(totalOrdersPerDay);
    const chartLabels = sortedDayNames;

    return NextResponse.json({ data: chartData, labels: chartLabels });
  }

  if (error) {
    return NextResponse.error();
  }
}