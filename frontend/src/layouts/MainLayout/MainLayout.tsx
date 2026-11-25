import { useEffect, useState } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Recupera o usuário autenticado pelo contexto.
const { user, isLoading, logout } = useAuth();
const navigate = useNavigate();

// Redireciona quando não existe usuário autenticado.
useEffect(() => {
    if (!isLoading && !user) {
        navigate("/Auth", { replace: true });
    }
}, [user, isLoading, navigate]);
if (isLoading || !user) {
    return null;
}

return (
    <div className="dashboard-shell min-h-screen bg-[#f8f8f4] text-[#244638]">
      <div className="flex min-h-screen">
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <main className="min-w-0 flex-1">
<Header
    user={user}
    onMenuClick={() => setMobileOpen(true)}
    onLogout={async () => {
        await logout();
        navigate("/Auth", { replace: true });
    }}
/>          <Outlet />
        </main>
      </div>
    </div>
  );
}