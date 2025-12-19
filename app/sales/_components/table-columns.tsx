"use client";

import { Button } from "@/app/_components/ui/button";
import type { SaleDTO } from "@/app/_data/sale/get-sales";
import { formatNumberToBRL } from "@/app/_helpers/number-to-brl";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export const saleTableColumns: ColumnDef<SaleDTO>[] = [
  {
    header: "Produtoss",
    accessorKey: "saleProductsNames",
  },
  {
    header: "Quantidade de produtos",
    accessorKey: "totalSaleProducts",
  },
  {
    header: "Valor total",
    accessorKey: "totalAmount",
    cell: ({ row }) => {
      const sale = row.original;
      return formatNumberToBRL(sale.totalAmount);
    },
  },
  {
    header: "Data",
    accessorKey: "date",
    cell: ({ row }) => {
      const sale = row.original;
      return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "medium",
      }).format(new Date(sale.date));
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
