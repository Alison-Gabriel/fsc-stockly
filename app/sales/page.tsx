import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
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

  const tableData = sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    saleProductsNames: sale.saleProductsNames,
    totalAmount: sale.totalAmount,
    totalSaleProducts: sale.totalSaleProducts,
    saleProducts: sale.saleProducts,
    productsOptions,
    products,
  }));

  return (
    <main className="h-full space-y-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Vendas</HeaderSubtitle>
          <HeaderTitle>Gestão de vendas</HeaderTitle>
        </HeaderLeft>

        <HeaderRight>
          <CreateSaleButton
            products={products}
            productsOptions={productsOptions}
          />
        </HeaderRight>
      </Header>

      <DataTable columns={saleTableColumns} data={tableData} />
    </main>
  );
};

export default SalesPage;
