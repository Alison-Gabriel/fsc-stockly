"use client";

import type { SaleDTO } from "@/app/_data/sale/get-sales";
import { dateFormatter } from "@/app/_helpers/date-formatter";
import { formatNumberToBRL } from "@/app/_helpers/number-to-brl";
import { ColumnDef } from "@tanstack/react-table";
import SalesActionsDropdownMenu from "./actions-dropdown-menu";

export const saleTableColumns: ColumnDef<SaleDTO>[] = [
  {
    header: "Produtos",
    accessorKey: "saleProductsNames",
    cell: ({ row }) => {
      const { saleProductsNames } = row.original;
      return <span className="truncate">{saleProductsNames}</span>;
    },
  },
  {
    header: "Quantidade de produtos",
    accessorKey: "totalSaleProducts",
  },
  {
    header: "Valor total",
    accessorKey: "totalAmount",
    cell: ({ row }) => {
      const { totalAmount } = row.original;
      return formatNumberToBRL(totalAmount);
    },
  },
  {
    header: "Data",
    accessorKey: "date",
    cell: ({ row }) => {
      const { date } = row.original;
      return dateFormatter(date);
    },
  },
  {
    header: "Ações",
    cell: ({ row }) => {
      const sale = row.original;
      return <SalesActionsDropdownMenu sale={sale} />;
    },
  },
];
