import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layouts/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
]);

export default router;

/**
 * ELiminamos App.tsx porque ya no es la entrada de la aplicacion. Ahora es <Layout/> para ello en main.tsx usamos el RouterProvider
 */
