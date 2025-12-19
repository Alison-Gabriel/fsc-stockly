"use client";

import type { SaleDTO } from "@/app/_data/sale/get-sales";
import { dateFormatter } from "@/app/_helpers/date-formatter";
import { formatNumberToBRL } from "@/app/_helpers/number-to-brl";
import type { ColumnDef } from "@tanstack/react-table";
import SalesActionsDropdownMenu from "./actions-dropdown-menu";
import type { ProductDTO } from "@/app/_data/product/get-products";
import type { ComboboxOption } from "@/app/_components/ui/combobox";

interface SaleTableColumn extends SaleDTO {
  products: ProductDTO[];
  productsOptions: ComboboxOption[];
}

export const saleTableColumns: ColumnDef<SaleTableColumn>[] = [
  {
    header: "Produtos",
    accessorKey: "saleProductsNames",
    cell: ({
      row: {
        original: { saleProductsNames },
      },
    }) => {
      return <p className="w-xl truncate">{saleProductsNames}</p>;
    },
  },
  {
    header: "Quantidade de produtos",
    accessorKey: "totalSaleProducts",
  },
  {
    header: "Valor total",
    accessorKey: "totalAmount",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => {
      return formatNumberToBRL(totalAmount);
    },
  },
  {
    header: "Data",
    accessorKey: "date",
    cell: ({
      row: {
        original: { date },
      },
    }) => {
      return dateFormatter(date, "numeric");
    },
  },
  {
    header: "Ações",
    cell: ({ row: { original: sale } }) => {
      return (
        <SalesActionsDropdownMenu
          products={sale.products}
          productsOptions={sale.productsOptions}
          sale={sale}
        />
      );
    },
  },
];
