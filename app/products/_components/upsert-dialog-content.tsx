"use client";

import { upsertProduct } from "@/app/_actions/product/upsert-product";
import {
  upsertProductSchema,
  UpsertProductSchema,
} from "@/app/_actions/product/upsert-product/schema";
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
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

interface UpsertProductDialogContentProps {
  defaultValues?: UpsertProductSchema;
  closeUpsertDialog: () => void;
}

const UpsertProductDialogContent = ({
  defaultValues = { name: "", price: 0, stock: 0 },
  closeUpsertDialog,
}: UpsertProductDialogContentProps) => {
  const isUpdatingProduct = Boolean(defaultValues.id);

  const form = useForm<UpsertProductSchema>({
    resolver: zodResolver(upsertProductSchema),
    shouldUnregister: true,
    defaultValues: defaultValues,
  });

  const { execute: executeUpsertProduct } = useAction(upsertProduct, {
    onSuccess: () => {
      const successMessage = isUpdatingProduct
        ? "Produto editado com sucesso!"
        : "Produto criado com sucesso!";
      closeUpsertDialog();
      toast.success(successMessage);
    },
    onError: () => {
      const errorMessage = isUpdatingProduct
        ? "Erro ao editar produto, por favor, tente novamente."
        : "Erro ao adicionar produto, por favor, tente novamente.";
      toast.error(errorMessage);
    },
  });

  const handleUpsertProduct = (data: UpsertProductSchema) => {
    executeUpsertProduct({
      id: defaultValues.id,
      name: data.name,
      price: data.price,
      stock: data.stock,
    });
  };

  return (
    <DialogContent className="w-sm">
      <DialogHeader>
        <DialogTitle>
          {isUpdatingProduct ? "Atualizar produto" : "Adicionar produto"}
        </DialogTitle>
        <DialogDescription>Insira as informações abaixo.</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpsertProduct)}
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
              <Button type="reset" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>

            <Button disabled={form.formState.isSubmitting} type="submit">
              {isUpdatingProduct ? "Atualizar" : "Adicionar"}
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
