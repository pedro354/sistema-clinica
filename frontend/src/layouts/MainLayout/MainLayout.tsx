import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import { Outlet } from "react-router-dom";
import api from "../../services/api";


export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ id: number, name: string } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await api.getUser(1);
        setUser(currentUser);

      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <div className="dashboard-shell min-h-screen bg-[#f8f8f4] text-[#244638]">
      <div className="flex min-h-screen">
        <Sidebar mobileOpen={ mobileOpen } onClose={ () => setMobileOpen(false) } />

        <main className="min-w-0 flex-1">
          <Header user={ user } onMenuClick={ () => setMobileOpen(true) } />
          <Outlet />
        </main>
      </div>
    </div>
  )
}
