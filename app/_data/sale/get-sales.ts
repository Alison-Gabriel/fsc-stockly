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
    saleProducts: sale.saleProducts.map(
      (saleProduct): SaleProductDTO => ({
        productId: saleProduct.productId,
        productName: saleProduct.product.name,
        unitPrice: Number(saleProduct.unitPrice),
        quantity: saleProduct.quantity,
      }),
    ),
  }));
};
