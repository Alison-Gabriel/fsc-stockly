import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { CircleDollarSign } from "lucide-react";
import { getTotalSales } from "@/app/_data/dashboard/get-total-sales";
import { numberFormatter } from "@/app/_helpers/number-formatter";

const TotalSalesCard = async () => {
  await new Promise((resolve) => setTimeout(resolve, 7000));
  const totalSales = await getTotalSales();

  return (
    <SummaryCard>
      <SummaryCardIcon icon={CircleDollarSign} />
      <SummaryCardTitle>Vendas totais</SummaryCardTitle>
      <SummaryCardValue>{numberFormatter(totalSales)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalSalesCard;
