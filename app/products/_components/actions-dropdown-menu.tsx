"use client";

import { useState } from "react";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/app/_components/ui/dropdown-menu";
import { Button } from "@/app/_components/ui/button";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import UpsertProductDialogContent from "./upsert-dialog-content";
import DeleteProductDialogContent from "./delete-dialog-content";
import type { ProductDTO } from "@/app/_data/product/get-products";

interface ProductActionsDropdownMenu {
  product: ProductDTO;
}

const ProductActionsDropdownMenu = ({
  product,
}: ProductActionsDropdownMenu) => {
  const [isUpdateProductDialogOpen, setIsUpdateProductDialogOpen] =
    useState(false);

  const handleCopyIdToClipboard = () => {
    navigator.clipboard.writeText(product.id);
  };

  const handleCloseUpdateProductDialog = () => {
    setIsUpdateProductDialogOpen(false);
  };

  return (
    <Dialog
      open={isUpdateProductDialogOpen}
      onOpenChange={setIsUpdateProductDialogOpen}
    >
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
              onClick={handleCopyIdToClipboard}
            >
              <ClipboardCopyIcon className="size-4" />
              Copiar ID
            </DropdownMenuItem>

            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <EditIcon className="size-4" />
                Editar
              </DropdownMenuItem>
            </DialogTrigger>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <TrashIcon className="size-4" />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <UpsertProductDialogContent
          closeUpsertDialog={handleCloseUpdateProductDialog}
          defaultValues={{
            price: product.price,
            name: product.name,
            stock: product.stock,
            id: product.id,
          }}
        />
        <DeleteProductDialogContent productId={product.id} />
      </AlertDialog>
    </Dialog>
  );
};

export default ProductActionsDropdownMenu;
