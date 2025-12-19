import { db } from "@/app/_lib/prisma";
import "server-only";

export interface SaleProductDTO {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
}

export interface SaleDTO {
  id: string;
  date: Date;
  totalAmount: number;
  totalSaleProducts: number;
  saleProductsNames: string;
  saleProducts: SaleProductDTO[];
}

export const getSales = async (): Promise<SaleDTO[]> => {
  const sales = await db.sale.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      saleProducts: {
        include: { product: true },
      },
    },
  });

  const saleProducts = sales
    .flatMap((sale) => sale.saleProducts)
    .map((saleProduct) => ({
      productId: saleProduct.productId,
      productName: saleProduct.product.name,
      unitPrice: Number(saleProduct.unitPrice),
      quantity: saleProduct.quantity,
    }));

  const saleTotalAmount = saleProducts.reduce(
    (totalAmount, saleProduct) =>
      (totalAmount += saleProduct.unitPrice * saleProduct.quantity),
    0,
  );

  const saleProductsNameWithQuantity = saleProducts
    .map((saleProduct) => {
      return `${saleProduct.productName} (${saleProduct.quantity})`;
    })
    .join(" • ");

  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    saleProductsNames: saleProductsNameWithQuantity,
    totalSaleProducts: sale.saleProducts.length,
    totalAmount: saleTotalAmount,
    saleProducts,
  }));
};
