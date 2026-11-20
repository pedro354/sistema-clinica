// Bootstrap principal da aplicação React.
// Injeta o RouterProvider na raiz do DOM.
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import router from "./routes/AppRoutes";
import { AuthProvider } from "./providers/AuthProvider";
const container = document.getElementById("root") as HTMLElement;
createRoot(container).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
