import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { getMostSoldProducts } from "@/app/_data/dashboard/get-most-sold-products";
import {
  MostSoldProductItem,
  MostSoldProductItemSkeleton,
} from "./most-sold-product-item";
import { Skeleton } from "@/app/_components/ui/skeleton";

export const MostSoldProductsCardSkeleton = () => {
  return (
    <Skeleton className="h-80 rounded-xl bg-white py-6">
      <div className="px-6">
        <Skeleton className="h-6 w-44" />
      </div>

      <ScrollArea className="h-full py-6">
        <div className="space-y-8 px-6">
          <MostSoldProductItemSkeleton />
          <MostSoldProductItemSkeleton />
        </div>
      </ScrollArea>
    </Skeleton>
  );
};

export const MostSoldProductsCard = async () => {
  const mostSoldProducts = await getMostSoldProducts();

  return (
    <div className="h-80 overflow-hidden rounded-xl bg-white py-6">
      <div className="px-6">
        <p className="text-base font-semibold text-slate-900">
          Produtos mais vendidos
        </p>
      </div>

      <ScrollArea className="h-full py-6">
        <div className="space-y-8 px-6">
          {mostSoldProducts.map((mostSoldProduct) => (
            <MostSoldProductItem
              key={mostSoldProduct.productId}
              product={mostSoldProduct}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
