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
    if (productStatus === "IN_STOCK") {
      return "bg-emerald-500 gap-1.5 font-semibold text-primary-foreground";
    }
    if (productStatus === "OUT_OF_STOCK") {
      return "bg-secondary gap-1.5 font-semibold text-secondary-foreground";
    }
  };

  return (
    <Badge className={getProductBadgeClassName(status)}>
      {getProductStatusLabel(status)}
    </Badge>
  );
};

export default ProductStatusBadge;
