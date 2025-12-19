"use client";

import { Button } from "@/app/_components/ui/button";
import type { SaleDTO } from "@/app/_data/sale/get-sales";
import { dateFormatter } from "@/app/_helpers/date-formatter";
import { formatNumberToBRL } from "@/app/_helpers/number-to-brl";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export const saleTableColumns: ColumnDef<SaleDTO>[] = [
  {
    header: "Produtos",
    accessorKey: "saleProductsNames",
    cell: ({ row }) => {
      const { saleProductsNames } = row.original;
      return row.original.saleProductsNames;
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
    cell: () => {
      return (
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontalIcon className="size-4" />
        </Button>
      );
    },
  },
];
