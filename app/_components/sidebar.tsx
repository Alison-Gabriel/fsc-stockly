const Sidebar = () => {
  return (
    <aside className="h-full w-64 bg-white">
      <div className="py-6 px-8">
        <h1 className="font-black uppercase text-2xl">Stockly</h1>
      </div>

      <div className="flex gap-2 flex-col p-2">
        <button className="py-3 px-6 space-x-2 rounded-lg">Dashboard</button>
        <button className="py-3 px-6 space-x-2 rounded-lg">Produtos</button>
        <button className="py-3 px-6 space-x-2 rounded-lg">Vendas</button>
      </div>
    </aside>
  );
};

export default Sidebar;
