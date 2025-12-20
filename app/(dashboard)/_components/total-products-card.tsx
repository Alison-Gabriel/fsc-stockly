import { ShoppingBasket } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { numberFormatter } from "@/app/_helpers/number-formatter";
import { getTotalProducts } from "@/app/_data/dashboard/get-total-products";

const TotalProductsCard = async () => {
  const totalProducts = await getTotalProducts();

  return (
    <SummaryCard>
      <SummaryCardIcon icon={ShoppingBasket} />
      <SummaryCardTitle>Produtos</SummaryCardTitle>
      <SummaryCardValue>{numberFormatter(totalProducts)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalProductsCard;
