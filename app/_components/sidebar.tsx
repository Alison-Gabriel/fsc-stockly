import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "./sidebar-button";

const Sidebar = () => {
  return (
    <aside className="h-full w-72 bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-black text-emerald-500 uppercase">
          Stockly
        </h1>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/">
          <LayoutGridIcon className="size-4" />
          Dashboard
        </SidebarButton>

        <SidebarButton href="/products">
          <PackageIcon className="size-4" />
          Produtos
        </SidebarButton>

        <SidebarButton href="/sales">
          <ShoppingBasketIcon className="size-4" />
          Vendas
        </SidebarButton>
      </div>
    </aside>
  );
};

export default Sidebar;
