import { PlusIcon } from "lucide-react";
import { db } from "../_lib/prisma";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { productsColumns } from "./_components/table-columns";

const ProductsPage = async () => {
  const products = await db.product.findMany({});
  const serializedProducts = JSON.parse(JSON.stringify(products));

  return (
    <main className="h-full space-y-8">
      <header className="flex w-full items-center justify-between">
        <div className="space-y-2">
          <p className="text-primary text-xs font-semibold">Produtos</p>
          <h1 className="text-xl font-semibold">Gestão de produtos</h1>
        </div>

        <Button size="sm">
          <PlusIcon className="size-5" />
          Novo produto
        </Button>
      </header>

      <DataTable columns={productsColumns} data={serializedProducts} />
    </main>
  );
};

export default ProductsPage;
