// Configuração central das rotas da aplicação.
// Define layouts, páginas e navegação.
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Landing from "../pages/landing/Landing";
import Dashboard from "../pages/dashboard/Dashboard";
import Patients from "../pages/patients/Patients";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Appointments from "../pages/appointments/Appointments";

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
                element: <MainLayout />,
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                    },
                    {
                        path: "patients",
                        element: <Patients />,
                    },
                    {
                        path: "appointments",
                        element: <Appointments />,
                    },
                ]
            },
        ]
    }
]);

export default router;
