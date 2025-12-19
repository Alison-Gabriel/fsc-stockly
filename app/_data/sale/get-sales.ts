import { db } from "@/app/_lib/prisma";
import "server-only";

export interface SaleDTO {
  id: string;
  date: Date;
  totalAmount: number;
  totalSaleProducts: number;
  saleProductsNames: string;
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

  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    saleProductsNames: sale.saleProducts
      .map((saleProduct) => {
        const saleProductNameWithQuantity = `${saleProduct.product.name} (${saleProduct.quantity})`;
        return saleProductNameWithQuantity;
      })
      .join(" • "),
    totalSaleProducts: sale.saleProducts.length,
    totalAmount: sale.saleProducts.reduce((total, product) => {
      return (total += Number(product.unitPrice) * product.quantity);
    }, 0),
  }));
};
