import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import { SummaryCardSkeleton } from "./_components/summary-card";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Suspense } from "react";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalStockCard from "./_components/total-stock-card";
import TotalProductsCard from "./_components/total-products-card";
import {
  Last14DaysTotalRevenueCard,
  Last14DaysTotalRevenueCardSkeleton,
} from "./_components/last-14-days-total-revenue-card";
import {
  MostSoldProductsCard,
  MostSoldProductsCardSkeleton,
} from "./_components/most-sold-products-card";

const HomePage = async () => {
  return (
    <main className="h-full space-y-5">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Dashboard</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <Suspense fallback={<SummaryCardSkeleton />}>
            <TotalRevenueCard />
          </Suspense>

          <Suspense fallback={<SummaryCardSkeleton />}>
            <TodayRevenueCard />
          </Suspense>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Suspense fallback={<SummaryCardSkeleton />}>
            <TotalSalesCard />
          </Suspense>

          <Suspense fallback={<SummaryCardSkeleton />}>
            <TotalStockCard />
          </Suspense>

          <Suspense fallback={<SummaryCardSkeleton />}>
            <TotalProductsCard />
          </Suspense>
        </div>

        <div className="grid h-fit grid-cols-3 gap-6">
          <Suspense fallback={<Last14DaysTotalRevenueCardSkeleton />}>
            <Last14DaysTotalRevenueCard />
          </Suspense>

          <Suspense fallback={<MostSoldProductsCardSkeleton />}>
            <MostSoldProductsCard />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
