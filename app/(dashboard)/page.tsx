import {
  CircleDollarSign,
  DollarSign,
  Package,
  ShoppingBasket,
} from "lucide-react";
import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./_components/summary-card";
import { getDashboardSummary } from "../_data/dashboard/get-summary";
import { formatNumberToBRL } from "../_helpers/number-to-brl";
import { numberFormatter } from "../_helpers/number-formatter";
import RevenueChart from "./_components/revenue-chart";
import MostSoldProductItem from "./_components/most-sold-product-item";
import { ScrollArea } from "../_components/ui/scroll-area";

const HomePage = async () => {
  const {
    totalRevenue,
    todayRevenue,
    totalSales,
    totalStock,
    totalLast14DaysRevenue,
    totalProducts,
    mostSoldProducts,
  } = await getDashboardSummary();

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
          <SummaryCard>
            <SummaryCardIcon icon={DollarSign} />
            <SummaryCardTitle>Receita total</SummaryCardTitle>
            <SummaryCardValue>
              {formatNumberToBRL(totalRevenue)}
            </SummaryCardValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryCardIcon icon={DollarSign} />
            <SummaryCardTitle>Receita hoje</SummaryCardTitle>
            <SummaryCardValue>
              {formatNumberToBRL(todayRevenue)}
            </SummaryCardValue>
          </SummaryCard>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <SummaryCard>
            <SummaryCardIcon icon={CircleDollarSign} />
            <SummaryCardTitle>Vendas totais</SummaryCardTitle>
            <SummaryCardValue>{numberFormatter(totalSales)}</SummaryCardValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryCardIcon icon={Package} />
            <SummaryCardTitle>Total em estoque</SummaryCardTitle>
            <SummaryCardValue>{numberFormatter(totalStock)}</SummaryCardValue>
          </SummaryCard>

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
