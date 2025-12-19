"use client";

import { ColumnDef } from "@tanstack/react-table";
import ProductActionsDropdownMenu from "./actions-dropdown-menu";
import { formatNumberToBRL } from "@/app/_helpers/number-to-brl";
import type { ProductDTO } from "@/app/_data/product/get-products";
import ProductStatusBadge from "@/app/_components/product-status-badge";

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
      return <ProductStatusBadge status={status} />;
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
