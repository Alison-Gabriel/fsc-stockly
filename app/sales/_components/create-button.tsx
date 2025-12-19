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
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button size="sm">
          <PlusIcon className="size-5" />
          Nova venda
        </Button>
      </SheetTrigger>

      <UpsertSaleSheetContent
        products={products}
        options={productsOptions}
        onFinishSaleSuccess={handleSheetClose}
      />
    </Sheet>
  );
};

export default CreateSaleButton;
