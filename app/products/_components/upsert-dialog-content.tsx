"use client";

import { createProduct } from "@/app/_actions/product/create-product";
import {
  createProductSchema,
  CreateProductSchema,
} from "@/app/_actions/product/create-product/schema";
import { Button } from "@/app/_components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface UpsertProductDialogContentProps {
  onSuccess?: () => void;
}

const UpsertProductDialogContent = ({
  onSuccess,
}: UpsertProductDialogContentProps) => {
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    shouldUnregister: true,
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
    },
  });

  const handleFormSubmit = async (data: CreateProductSchema) => {
    try {
      await createProduct(data);
      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DialogContent className="w-sm">
      <DialogHeader>
        <DialogTitle>Cadastrar produto</DialogTitle>
        <DialogDescription>Insira as informações abaixo.</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do produto</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Digite o nome do produto" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor unitário</FormLabel>
                <FormControl>
                  <NumericFormat
                    {...field}
                    placeholder="Digite o valor unitário do produto"
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale
                    decimalScale={2}
                    prefix="R$"
                    allowNegative={false}
                    onValueChange={(values) =>
                      field.onChange(values.floatValue)
                    }
                    onChange={() => {}}
                    customInput={Input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="stock"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Digite o estoque do produto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="grid grid-cols-2 gap-3">
            <DialogClose asChild>
              <Button type="reset" variant="outline" size="sm">
                Cancelar
              </Button>
            </DialogClose>

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              size="sm"
              className="font-semibold"
            >
              Cadastrar
              {form.formState.isSubmitting && (
                <Loader2Icon className="size-3.5 animate-spin" />
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertProductDialogContent;
