import { ComboboxOption } from "../_components/ui/combobox";
import { getProducts } from "../_data/product/get-products";
import CreateSaleButton from "./_components/create-button";

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
        <CreateSaleButton
          products={products}
          productsOptions={productsOptions}
        />
      </header>
    </main>
  );
};

export default SalesPage;
