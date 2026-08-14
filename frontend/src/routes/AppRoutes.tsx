// Configuração central das rotas da aplicação.
// Define layouts, páginas e navegação.
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Landing from "../pages/landing/Landing";
import Dashboard from "../pages/dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
        ]
    }
]);

export default router;
