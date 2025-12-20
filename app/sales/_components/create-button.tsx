"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { PlusIcon } from "lucide-react";
import UpsertSaleSheetContent from "./upsert-sheet-content";
import type { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";
import type { ProductDTO } from "@/app/_data/product/get-products";

interface CreateSaleButtonProps {
  products: ProductDTO[];
  productsOptions: ComboboxOption[];
}

const CreateSaleButton = ({
  products,
  productsOptions,
}: CreateSaleButtonProps) => {
  const [isCreateSaleSheetOpen, setIsCreateSaleSheetOpen] = useState(false);

  const handleCloseCreateSaleSheet = () => {
    setIsCreateSaleSheetOpen(false);
  };

  return (
    <Sheet open={isCreateSaleSheetOpen} onOpenChange={setIsCreateSaleSheetOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon className="size-5" />
          Adicionar venda
        </Button>
      </SheetTrigger>

      <UpsertSaleSheetContent
        isOpen={isCreateSaleSheetOpen}
        products={products}
        options={productsOptions}
        onFinishSaleSuccess={handleCloseCreateSaleSheet}
      />
    </Sheet>
  );
};

export default CreateSaleButton;
