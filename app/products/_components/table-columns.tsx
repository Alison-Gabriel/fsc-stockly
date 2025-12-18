"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@/app/_generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";
import ProductActionsDropdownMenu from "./actions-dropdown-menu";

const getStatusLabel = (status: string) => {
  return status === "IN_STOCK" ? "Em estoque" : "Esgotado";
};

export const productsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: ({ row }) => {
      const product = row.original;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const label = getStatusLabel(status);
      return (
        <Badge
          className={`${status === "OUT_OF_STOCK" ? "bg-slate-50 text-slate-500" : "bg-emerald-50 text-emerald-500"} gap-[4.5px] font-semibold`}
        >
          <CircleIcon
            className={`${status === "OUT_OF_STOCK" ? "fill-slate-500" : "fill-emerald-500"} size-2!`}
          />
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const product = row.original;
      return <ProductActionsDropdownMenu product={product} />;
    },
  },
];
