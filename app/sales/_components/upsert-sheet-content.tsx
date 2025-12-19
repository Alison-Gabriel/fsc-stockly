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
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { formatNumberToBRL } from "@/app/_helpers/number-to-brl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import UpsertSaleActionsDropdownMenu from "./upsert-actions-dropdown-menu";
import { CheckIcon, PlusIcon } from "lucide-react";
import { createSale } from "@/app/_actions/sale/create-sale";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { flattenValidationErrors } from "next-safe-action";
import type { ProductDTO } from "@/app/_data/product/get-products";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

const upsertSaleFormSchema = z.object({
  productId: z.uuid("O produto é obrigatório."),
  quantity: z.coerce
    .number<number>()
    .int("Digite uma quantidade inteira.")
    .positive("A quantidade não pode ser negativa."),
});

type UpsertSaleFormSchema = z.infer<typeof upsertSaleFormSchema>;

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface UpsertSaleSheetContentProps {
  products: ProductDTO[];
  options: ComboboxOption[];
  onFinishSaleSuccess: () => void;
}

const UpsertSaleSheetContent = ({
  products,
  options,
  onFinishSaleSuccess,
}: UpsertSaleSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  const { execute: executeCreateSale } = useAction(createSale, {
    onSuccess: () => {
      toast.success("Venda realizada com sucesso!");
      onFinishSaleSuccess();
    },
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedError = flattenValidationErrors(validationErrors);
      toast.error(serverError ?? flattenedError.formErrors[0]);
    },
  });

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

    let shouldShownOutOfStockError = false;
    let shouldResetFormFields = false;

    setSelectedProducts((alreadySelectedProducts) => {
      const existingProduct = alreadySelectedProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      const isSelectedProductAlreadySelected = Boolean(existingProduct);

      if (isSelectedProductAlreadySelected) {
        return alreadySelectedProducts.map((product) => {
          const isCurrentProductTheSelectedProduct =
            product.id === existingProduct?.id;

          if (isCurrentProductTheSelectedProduct) {
            const isCurrentProductOutOfStock =
              quantity + product.quantity > selectedProduct.stock;

            if (isCurrentProductOutOfStock) {
              shouldShownOutOfStockError = true;
              return product;
            }

            shouldResetFormFields = true;
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

      const isSelectedProductOutOfStock = quantity > selectedProduct.stock;

      if (isSelectedProductOutOfStock) {
        shouldShownOutOfStockError = true;
        return alreadySelectedProducts;
      }

      const formattedSelectedProduct = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: Number(selectedProduct.price),
        quantity,
      };

      shouldResetFormFields = true;
      return [...alreadySelectedProducts, formattedSelectedProduct];
    });

    if (shouldShownOutOfStockError) {
      return form.setError("quantity", {
        message: "Quantidade indisponível em estoque.",
      });
    }

    if (shouldResetFormFields) {
      return form.reset();
    }
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

  const handleFinishSale = () => {
    executeCreateSale({
      products: selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
    setSelectedProducts([]);
  };

  return (
    <SheetContent className="max-w-2xl!">
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
          <Controller
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

          <Button type="submit" variant="secondary" className="w-full">
            <PlusIcon className="size-4" /> Adicionar produto
          </Button>
        </form>
      </Form>

      {Boolean(selectedProducts.length) && (
        <div>
          <ScrollArea className="h-[500px] w-full">
            <div className="px-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="p-4">Produto</TableHead>
                    <TableHead className="p-4">Preço unitário</TableHead>
                    <TableHead className="p-4">Quantidade</TableHead>
                    <TableHead className="p-4">Total</TableHead>
                    <TableHead className="p-4">Ações</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {selectedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="p-4">{product.name}</TableCell>
                      <TableCell className="p-4">
                        {formatNumberToBRL(product.price)}
                      </TableCell>
                      <TableCell className="p-4">{product.quantity}</TableCell>
                      <TableCell className="p-4">
                        {formatNumberToBRL(product.price * product.quantity)}
                      </TableCell>
                      <TableCell className="p-4">
                        <UpsertSaleActionsDropdownMenu
                          onRemoveProduct={handleRemoveProductFromState}
                          product={product}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3} className="p-4">
                      Total
                    </TableCell>
                    <TableCell className="p-4">
                      {formatNumberToBRL(productsTotal)}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            <SheetFooter>
              <Button onClick={handleFinishSale}>
                <CheckIcon className="size-5" />
                Finalizar venda
              </Button>
            </SheetFooter>
          </ScrollArea>
        </div>
      )}
    </SheetContent>
  );
};

export default UpsertSaleSheetContent;
