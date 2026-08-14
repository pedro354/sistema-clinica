// Layout raiz da aplicação.
// O Outlet renderiza as rotas filhas.
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./styles/global.css";
import { Navbar } from "./pages/landing/components/NavBar";
export default function App() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen w-full">
      {!isDashboard && <Navbar />}
      <Outlet />
    </div>
  )
}
