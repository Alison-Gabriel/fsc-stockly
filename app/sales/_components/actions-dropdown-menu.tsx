"use client";

import { useState } from "react";
import { Dialog } from "@/app/_components/ui/dialog";
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

interface SalesActionsDropdownMenu {
  sale: Pick<SaleDTO, "id">;
}

const SalesActionsDropdownMenu = ({ sale }: SalesActionsDropdownMenu) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { execute: executeDeleteAction } = useAction(deleteSale, {
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
    executeDeleteAction({ id: sale.id });
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
    </Dialog>
  );
};

export default SalesActionsDropdownMenu;
