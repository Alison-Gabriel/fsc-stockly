"use client";

import { Badge } from "@/app/_components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";
import ProductActionsDropdownMenu from "./actions-dropdown-menu";
import { formatNumberToBRL } from "@/app/_helpers/number-to-brl";
import type { ProductDTO } from "@/app/_data/product/get-products";

export const productsColumns: ColumnDef<ProductDTO>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: ({
      row: {
        original: { price },
      },
    }) => {
      return formatNumberToBRL(price);
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({
      row: {
        original: { status },
      },
    }) => {
      const getProductStatusLabel = () => {
        if (status === "IN_STOCK") {
          return "Em estoque";
        }
        if (status === "OUT_OF_STOCK") {
          return "Fora de estoque";
        }
      };

      const getProductBadgeClassName = () => {
        switch (status) {
          case "IN_STOCK":
            return "bg-primary text-primary-foreground fill-primary-foreground";
          case "OUT_OF_STOCK":
            return "bg-secondary text-secondary-foreground fill-secondary-foreground";
          default:
            return "gap-[4.5px] font-semibold";
        }
      };

      const productStatusLabel = getProductStatusLabel();

      return (
        <Badge className={getProductBadgeClassName()}>
          <CircleIcon className="size-2! fill-inherit" />
          {productStatusLabel}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: product } }) => {
      return <ProductActionsDropdownMenu product={product} />;
    },
  },
];
