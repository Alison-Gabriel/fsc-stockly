"use client";

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Product } from "@/app/_generated/prisma/client";
import { formatNumberToBRL } from "@/app/_helpers/number-to-brl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SalesActionsDropdownMenu from "./actions-dropdown-menu";
import { PlusIcon } from "lucide-react";

const upsertSaleFormSchema = z.object({
  productId: z.uuid("O produto é obrigatório."),
  quantity: z.coerce
    .number<number>()
    .int("Digite uma quantidade inteira.")
    .nonnegative("A quantidade não pode ser negativa."),
});

type UpsertSaleFormSchema = z.infer<typeof upsertSaleFormSchema>;

interface UpsertSaleSheetContentProps {
  products: Product[];
  options: ComboboxOption[];
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSaleSheetContent = ({
  products,
  options,
}: UpsertSaleSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  const form = useForm<UpsertSaleFormSchema>({
    resolver: zodResolver(upsertSaleFormSchema),
    shouldUnregister: true,
    defaultValues: {
      productId: "",
      quantity: 0,
    },
  });

  const handleUpsertSaleFormSubmit = ({
    productId,
    quantity,
  }: UpsertSaleFormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === productId,
    );

    const isSelectedProductNotExistsOnDatabase = !selectedProduct;
    if (isSelectedProductNotExistsOnDatabase) return;

    setSelectedProducts((alreadySelectedProducts) => {
      const existingProduct = alreadySelectedProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      const isSelectedProductAlreadyExists = Boolean(existingProduct);

      if (isSelectedProductAlreadyExists) {
        return alreadySelectedProducts.map((product) => {
          const isCurrentProductIdEqualsToSelectedProductId =
            product.id === existingProduct?.id;

          if (isCurrentProductIdEqualsToSelectedProductId) {
            return {
              id: existingProduct.id,
              name: existingProduct.name,
              price: existingProduct.price,
              quantity: existingProduct.quantity + quantity,
            };
          }

          return product;
        });
      }

      const formattedSelectedProduct = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: Number(selectedProduct.price),
        quantity,
      };

      return [...alreadySelectedProducts, formattedSelectedProduct];
    });
    form.reset();
  };

  const productsTotal = useMemo(() => {
    return selectedProducts.reduce((totalProducts, product) => {
      return (totalProducts += product.price * product.quantity);
    }, 0);
  }, [selectedProducts]);

  const handleRemoveProductFromState = (productId: string) => {
    const newSelectedProducts = selectedProducts.filter(
      (product) => product.id !== productId,
    );
    setSelectedProducts(newSelectedProducts);
  };

  return (
    <SheetContent className="max-w-3xl!">
      <SheetHeader>
        <SheetTitle>Adicionar nova venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form
          className="space-y-6 px-4"
          onSubmit={form.handleSubmit(handleUpsertSaleFormSubmit)}
        >
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    options={options}
                    placeholder="Selecione um produto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Digite a quantidade"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            <PlusIcon className="size-5" /> Adicionar produto
          </Button>
        </form>
      </Form>

      <div className="px-4">
        <Table>
          <TableCaption>Lista de produtos adicionados à venda</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="p-3">Produto</TableHead>
              <TableHead className="p-3">Preço unitário</TableHead>
              <TableHead className="p-3">Quantidade</TableHead>
              <TableHead className="p-3">Total</TableHead>
              <TableHead className="p-3">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {selectedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="p-3">{product.name}</TableCell>
                <TableCell className="p-3">
                  {formatNumberToBRL(product.price)}
                </TableCell>
                <TableCell className="p-3">{product.quantity}</TableCell>
                <TableCell className="p-3">
                  {formatNumberToBRL(product.price * product.quantity)}
                </TableCell>
                <TableCell className="p-3">
                  <SalesActionsDropdownMenu
                    onRemoveProduct={handleRemoveProductFromState}
                    product={product}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="p-3">
                Total
              </TableCell>
              <TableCell className="p-3">
                {formatNumberToBRL(productsTotal)}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </SheetContent>
  );
};

export default UpsertSaleSheetContent;
