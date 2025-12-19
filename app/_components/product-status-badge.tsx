import { CircleIcon } from "lucide-react";
import { ProductStatusDTO } from "../_data/product/get-products";
import { Badge } from "./ui/badge";

interface ProductStatusBadgeProps {
  status: ProductStatusDTO;
}

const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  const getProductStatusLabel = (productStatus: ProductStatusDTO) => {
    if (productStatus === "IN_STOCK") {
      return "Em estoque";
    }
    if (productStatus === "OUT_OF_STOCK") {
      return "Fora de estoque";
    }
  };

  const getProductBadgeClassName = (productStatus: ProductStatusDTO) => {
    switch (productStatus) {
      case "IN_STOCK":
        return "bg-primary text-primary-foreground";
      case "OUT_OF_STOCK":
        return "bg-secondary text-secondary-foreground";
      default:
        return "gap-1.5 font-semibold";
    }
  };

  return (
    <Badge className={getProductBadgeClassName(status)}>
      {getProductStatusLabel(status)}
    </Badge>
  );
};

export default ProductStatusBadge;
