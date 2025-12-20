import { DollarSign } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { formatNumberToBRL } from "@/app/_helpers/number-to-brl";
import { getTodayRevenue } from "@/app/_data/dashboard/get-today-revenue";

const TodayRevenueCard = async () => {
  await new Promise((resolve) => setTimeout(resolve, 6000));
  const { todayRevenue } = await getTodayRevenue();

  return (
    <SummaryCard>
      <SummaryCardIcon icon={DollarSign} />
      <SummaryCardTitle>Receita hoje</SummaryCardTitle>
      <SummaryCardValue>{formatNumberToBRL(todayRevenue)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TodayRevenueCard;
