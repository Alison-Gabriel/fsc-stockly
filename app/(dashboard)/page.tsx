import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import { SummaryCardSkeleton } from "./_components/summary-card";
import { getDashboardSummary } from "../_data/dashboard/get-summary";
import MostSoldProductItem from "./_components/most-sold-product-item";
import { ScrollArea } from "../_components/ui/scroll-area";
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
import { Skeleton } from "../_components/ui/skeleton";

const HomePage = async () => {
  const { mostSoldProducts } = await getDashboardSummary();

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

          <div className="h-80 overflow-hidden rounded-md bg-white py-6">
            <div className="px-6">
              <p className="text-lg font-semibold text-slate-900">
                Produtos mais vendidos
              </p>
            </div>

            <ScrollArea className="h-full py-6">
              <div className="space-y-8 px-6">
                {mostSoldProducts.map((mostSoldProduct) => (
                  <MostSoldProductItem
                    key={mostSoldProduct.productId}
                    product={mostSoldProduct}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
