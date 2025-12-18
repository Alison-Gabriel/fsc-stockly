import { DataTable } from "../_components/ui/data-table";
import { productsColumns } from "./_components/table-columns";
import { getProducts } from "../_data/product/get-products";
import CreateProductButton from "./_components/create-button";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <main className="h-full space-y-8">
      <header className="flex w-full items-center justify-between">
        <div className="space-y-2">
          <p className="text-primary text-xs font-semibold">Produtos</p>
          <h1 className="text-xl font-semibold">Gestão de produtos</h1>
        </div>
        <CreateProductButton />
      </header>

      <DataTable columns={productsColumns} data={products} />
    </main>
  );
};

export default ProductsPage;
