const Sidebar = () => {
  return (
    <aside className="h-full w-64 bg-white">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-black uppercase">Stockly</h1>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <button className="space-x-2 rounded-lg px-6 py-3">Dashboard</button>
        <button className="space-x-2 rounded-lg px-6 py-3">Produtos</button>
        <button className="space-x-2 rounded-lg px-6 py-3">Vendas</button>
      </div>
    </aside>
  );
};

export default Sidebar;
