import { getLast14DaysTotalRevenue } from "@/app/_data/dashboard/get-last-14-days-total-revenue";
import RevenueChart from "./revenue-chart";
import { Skeleton } from "@/app/_components/ui/skeleton";

export const Last14DaysTotalRevenueCard = async () => {
  await new Promise((resolve) => setTimeout(resolve, 6500));
  const last14DaysTotalRevenue = await getLast14DaysTotalRevenue();

  return (
    <div className="col-span-2 h-full w-full space-y-6 rounded-xl bg-white p-6">
      <div className="space-y-1">
        <p className="text-base font-semibold text-slate-900">Receita</p>
        <p className="text-sm font-medium text-slate-500">Últimos 14 dias</p>
      </div>

      <RevenueChart data={last14DaysTotalRevenue} />
    </div>
  );
};

export const Last14DaysTotalRevenueCardSkeleton = () => {
  return (
    <Skeleton className="col-span-2 rounded-xl bg-white p-6">
      <div className="space-y-1">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-5 w-28" />
      </div>
    </Skeleton>
  );
};
