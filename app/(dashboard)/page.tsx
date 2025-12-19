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

const HomePage = async () => {
  const { totalRevenue, todayRevenue, totalSales, totalStock, totalProducts } =
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
      </div>
    </main>
  );
};

export default HomePage;
