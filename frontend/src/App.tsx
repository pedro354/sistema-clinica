// Layout raiz da aplicação.
// O Outlet renderiza as rotas filhas.
import { Outlet } from "react-router-dom";
import "./styles/global.css";
import { Navbar } from "./pages/landing/components/NavBar";
export default function App() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <Outlet />
    </div>
  )
}