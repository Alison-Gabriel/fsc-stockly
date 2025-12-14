"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@/app/_generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import DeleteProductDialogContent from "./delete-product-dialog-content";

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

      const handleCopyToClipboard = (productId: string) => {
        navigator.clipboard.writeText(productId);
      };

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="gap-1.5"
                onClick={() => handleCopyToClipboard(product.id)}
              >
                <ClipboardCopyIcon className="size-4" />
                Copiar ID
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-1.5">
                <EditIcon className="size-4" />
                Editar
              </DropdownMenuItem>

              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="gap-1.5">
                  <TrashIcon className="size-4" />
                  Deletar
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteProductDialogContent productId={product.id} />
        </AlertDialog>
      );
    },
  },
];
