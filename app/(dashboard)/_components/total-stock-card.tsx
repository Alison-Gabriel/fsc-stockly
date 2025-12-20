import { Package } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { numberFormatter } from "@/app/_helpers/number-formatter";
import { getTotalStock } from "@/app/_data/dashboard/get-total-stock";

const TotalStockCard = async () => {
  await new Promise((resolve) => setTimeout(resolve, 7000));
  const totalStock = await getTotalStock();

  return (
    <SummaryCard>
      <SummaryCardIcon icon={Package} />
      <SummaryCardTitle>Total em estoque</SummaryCardTitle>
      <SummaryCardValue>{numberFormatter(totalStock)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalStockCard;
