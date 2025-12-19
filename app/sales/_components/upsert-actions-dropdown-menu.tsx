"use client";

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
import { ClipboardCopyIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";

interface UpsertSaleActionsDropdownMenuProps {
  product: Pick<Product, "id">;
  onRemoveProduct: (productId: string) => void;
}

const UpsertSaleActionsDropdownMenu = ({
  product,
  onRemoveProduct,
}: UpsertSaleActionsDropdownMenuProps) => {
  const handleCopyIdToClipboard = () => {
    navigator.clipboard.writeText(product.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-1.5" onClick={handleCopyIdToClipboard}>
          <ClipboardCopyIcon className="size-4" />
          Copiar ID
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-1.5"
          onClick={() => onRemoveProduct(product.id)}
        >
          <TrashIcon className="size-4" />
          Remover
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UpsertSaleActionsDropdownMenu;
