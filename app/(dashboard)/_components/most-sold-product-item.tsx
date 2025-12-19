import ProductStatusBadge from "@/app/_components/product-status-badge";
import type { MostSoldProductDTO } from "@/app/_data/dashboard/get-summary";
import { numberFormatter } from "@/app/_helpers/number-formatter";
import { formatNumberToBRL } from "@/app/_helpers/number-to-brl";

interface MostSoldProductItemProps {
  product: MostSoldProductDTO;
}

const MostSoldProductItem = ({ product }: MostSoldProductItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-3">
        <ProductStatusBadge status={product.status} />

        <div className="space-y-1.5">
          <p className="text-base font-semibold text-slate-900">
            {product.name}
          </p>
          <p className="text-sm font-medium text-slate-500">
            {formatNumberToBRL(product.price)}
          </p>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-900">
          {numberFormatter(product.totalSold)} vendidos
        </p>
      </div>
    </div>
  );
};

export default MostSoldProductItem;
