import { ShoppingBasket } from "lucide-react";
import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardSkeleton,
  SummaryCardTitle,
  SummaryCardValue,
} from "./_components/summary-card";
import { getDashboardSummary } from "../_data/dashboard/get-summary";
import { numberFormatter } from "../_helpers/number-formatter";
import RevenueChart from "./_components/revenue-chart";
import MostSoldProductItem from "./_components/most-sold-product-item";
import { ScrollArea } from "../_components/ui/scroll-area";
import TotalRevenueCard from "./_components/total-revenue-card";
import { Suspense } from "react";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalStockCard from "./_components/total-stock-card";

const HomePage = async () => {
  const { totalLast14DaysRevenue, totalProducts, mostSoldProducts } =
    await getDashboardSummary();

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

          <SummaryCard>
            <SummaryCardIcon icon={ShoppingBasket} />
            <SummaryCardTitle>Produtos</SummaryCardTitle>
            <SummaryCardValue>
              {numberFormatter(totalProducts)}
            </SummaryCardValue>
          </SummaryCard>
        </div>

        <div className="grid h-fit grid-cols-3 gap-6">
          <div className="col-span-2 h-fit space-y-6 rounded-md bg-white p-6">
            <div className="space-y-1">
              <p className="text-lg font-semibold text-slate-900">Receita</p>
              <p className="text-sm font-medium text-slate-500">
                Últimos 14 dias
              </p>
            </div>

            <RevenueChart data={totalLast14DaysRevenue} />
          </div>

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
