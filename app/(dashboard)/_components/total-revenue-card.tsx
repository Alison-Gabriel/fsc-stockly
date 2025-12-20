import { getTotalRevenue } from "@/app/_data/dashboard/get-total-revenue";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { DollarSign } from "lucide-react";
import { formatNumberToBRL } from "@/app/_helpers/number-to-brl";

const TotalRevenueCard = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const { totalRevenue } = await getTotalRevenue();

  return (
    <SummaryCard>
      <SummaryCardIcon icon={DollarSign} />
      <SummaryCardTitle>Receita total</SummaryCardTitle>
      <SummaryCardValue>{formatNumberToBRL(totalRevenue)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalRevenueCard;
