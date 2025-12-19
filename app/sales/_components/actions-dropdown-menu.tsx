"use client";

import { useState } from "react";
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
import type { SaleDTO } from "@/app/_data/sale/get-sales";
import { useAction } from "next-safe-action/hooks";
import { deleteSale } from "@/app/_actions/sale/delete-sale";
import { toast } from "sonner";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import UpsertSaleSheetContent from "./upsert-sheet-content";
import { ProductDTO } from "@/app/_data/product/get-products";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface SalesActionsDropdownMenu {
  sale: Pick<SaleDTO, "id" | "saleProducts">;
  products: ProductDTO[];
  productsOptions: ComboboxOption[];
}

const SalesActionsDropdownMenu = ({
  sale,
  products,
  productsOptions,
}: SalesActionsDropdownMenu) => {
  const [isUpdateSheetOpen, setIsUpdateSheetOpen] = useState(false);

  const { execute: executeDeleteSale } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Venda excluida com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir venda, por favor, tente novamente.");
    },
  });

  const handleCopyIdToClipboard = () => {
    navigator.clipboard.writeText(sale.id);
  };

  const handleConfirmDeletion = () => {
    executeDeleteSale({ id: sale.id });
  };

  const handleCloseUpdateSheet = () => {
    setIsUpdateSheetOpen(false);
  };

  return (
    <Sheet open={isUpdateSheetOpen} onOpenChange={setIsUpdateSheetOpen}>
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

            <SheetTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <EditIcon className="size-4" />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <TrashIcon className="size-4" />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir esta venda. Essa ação não pode ser
              desfeita. Deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeletion}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UpsertSaleSheetContent
        saleId={sale.id}
        products={products}
        options={productsOptions}
        defaultSelectedProducts={sale.saleProducts.map((saleProduct) => ({
          id: saleProduct.productId,
          name: saleProduct.productName,
          price: saleProduct.unitPrice,
          quantity: saleProduct.quantity,
        }))}
        onFinishSaleSuccess={handleCloseUpdateSheet}
      />
    </Sheet>
  );
};

export default SalesActionsDropdownMenu;
