import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data/product/get-products";
import { getSales } from "../_data/sale/get-sales";
import CreateSaleButton from "./_components/create-button";
import { saleTableColumns } from "./_components/table-columns";

const SalesPage = async () => {
  const [products, sales] = await Promise.all([getProducts(), getSales()]);
  const productsOptions: ComboboxOption[] = products.map((product) => ({
    value: product.id,
    label: product.name,
    stock: product.stock,
  }));

  return (
    <main className="h-full space-y-8">
      <header className="flex w-full items-center justify-between">
        <div className="space-y-2">
          <p className="text-primary text-xs font-semibold">Vendas</p>
          <h1 className="text-xl font-semibold">Gestão de vendas</h1>
        </div>
        <CreateSaleButton
          products={products}
          productsOptions={productsOptions}
        />
      </header>
      <DataTable columns={saleTableColumns} data={sales} />
    </main>
  );
};

export default SalesPage;
