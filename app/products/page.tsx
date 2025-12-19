import { DataTable } from "../_components/ui/data-table";
import { productsColumns } from "./_components/table-columns";
import { getProducts } from "../_data/product/get-products";
import CreateProductButton from "./_components/create-button";
import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <main className="h-full space-y-5">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Produtos</HeaderSubtitle>
          <HeaderTitle>Gestão de produtos</HeaderTitle>
        </HeaderLeft>

        <HeaderRight>
          <CreateProductButton />
        </HeaderRight>
      </Header>

      <DataTable columns={productsColumns} data={products} />
    </main>
  );
};

export default ProductsPage;
