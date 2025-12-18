"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@/app/_generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";
import ProductActionsDropdownMenu from "./actions-dropdown-menu";
import { formatNumberToBRL } from "@/app/_helpers/number-to-brl";

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
      return formatNumberToBRL(Number(product.price));
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

      const getStatusLabel = (status: "IN_STOCK" | "OUT_OF_STOCK") => {
        if (status === "IN_STOCK") {
          return "Em estoque";
        }
        return "Fora de estoque";
      };

      const statusLabel = getStatusLabel(status);

      return (
        <Badge
          variant={`${status === "OUT_OF_STOCK" ? "secondary" : "default"}`}
          className={`gap-[4.5px] font-semibold`}
        >
          <CircleIcon
            className={`${status === "OUT_OF_STOCK" ? "fill-secondary-foreground" : "fill-primary-foreground"} size-2!`}
          />
          {statusLabel}
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
