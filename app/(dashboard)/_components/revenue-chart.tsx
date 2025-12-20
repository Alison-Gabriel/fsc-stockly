"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { DayTotalRevenueDTO } from "@/app/_data/dashboard/get-last-14-days-total-revenue";
import { formatNumberToBRL } from "@/app/_helpers/number-to-brl";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig: ChartConfig = {
  revenue: {
    label: "Receita",
    color: "var(--color-emerald-500)",
  },
};

interface RevenueChartProps {
  data: DayTotalRevenueDTO[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <ChartContainer config={chartConfig} className="max-h-48 w-full">
      <BarChart
        barGap={10}
        accessibilityLayer
        data={data}
        className="text-slate-900"
      >
        <CartesianGrid vertical={false} horizontal={false} />

        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />

        <YAxis
          dataKey="totalRevenue"
          tickLine={false}
          tickCount={5}
          tickFormatter={(totalRevenue) => {
            return new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              notation: "compact",
            }).format(totalRevenue);
          }}
          axisLine={false}
        />

        <ChartTooltip
          formatter={(totalRevenue) => {
            const formattedTotalRevenue = formatNumberToBRL(
              Number(totalRevenue),
            );

            return (
              <p className="text-xs font-semibold text-slate-900">
                {formattedTotalRevenue}
              </p>
            );
          }}
          content={<ChartTooltipContent />}
        />

        <Bar fill="var(--color-revenue)" dataKey="totalRevenue" radius={12} />
      </BarChart>
    </ChartContainer>
  );
};

export default RevenueChart;
