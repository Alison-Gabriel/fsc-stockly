import ProductStatusBadge from "@/app/_components/product-status-badge";
import { Skeleton } from "@/app/_components/ui/skeleton";
import type { MostSoldProductDTO } from "@/app/_data/dashboard/get-most-sold-products";
import { numberFormatter } from "@/app/_helpers/number-formatter";
import { formatNumberToBRL } from "@/app/_helpers/number-to-brl";

export const MostSoldProductItemSkeleton = () => {
  return (
    <Skeleton className="h-[86px] w-full bg-white/75">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-[86px]" />

          <div className="space-y-1.5">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>

        <Skeleton className="h-5 w-28" />
      </div>
    </Skeleton>
  );
};

interface MostSoldProductItemProps {
  product: MostSoldProductDTO;
}

export const MostSoldProductItem = ({ product }: MostSoldProductItemProps) => {
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
