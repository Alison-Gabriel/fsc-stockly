"use client";

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertProductDialogContent from "./upsert-dialog-content";

const CreateProductButton = () => {
  const [isCreateProductDialogOpen, setIsCreateProductDialogOpen] =
    useState(false);

  const handleCloseCreateProductDialog = () => {
    setIsCreateProductDialogOpen(false);
  };

  return (
    <Dialog
      open={isCreateProductDialogOpen}
      onOpenChange={setIsCreateProductDialogOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-5" />
          Novo produto
        </Button>
      </DialogTrigger>

      <UpsertProductDialogContent
        closeUpsertDialog={handleCloseCreateProductDialog}
      />
    </Dialog>
  );
};

export default CreateProductButton;
