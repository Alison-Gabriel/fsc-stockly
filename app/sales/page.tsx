import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { ComboboxOption } from "../_components/ui/combobox";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { getProducts } from "../_data/product/get-products";
import UpsertSaleSheetContent from "./_components/upsert-sheet-content";

const SalesPage = async () => {
  const products = await getProducts();
  const productsOptions: ComboboxOption[] = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));
  return (
    <main className="h-full space-y-8">
      <header className="flex w-full items-center justify-between">
        <div className="space-y-2">
          <p className="text-primary text-xs font-semibold">Vendas</p>
          <h1 className="text-xl font-semibold">Gestão de vendas</h1>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm">
              <PlusIcon className="size-5" />
              Nova venda
            </Button>
          </SheetTrigger>
          <UpsertSaleSheetContent
            products={products}
            options={productsOptions}
          />
        </Sheet>
      </header>
    </main>
  );
};

export default SalesPage;
