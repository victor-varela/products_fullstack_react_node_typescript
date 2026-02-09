import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Products, {loader as productLoader} from "./views/Products";
import NewProduct, {action as newProductAction} from "./views/NewProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productLoader
      },
      {
        path: "products/new",
        element: <NewProduct />,
        action: newProductAction
      },
    ],
  },
]);

export default router;

/**
 * ELiminamos App.tsx porque ya no es la entrada de la aplicacion. Ahora es <Layout/> para ello en main.tsx usamos el RouterProvider
 * 
 * - Agregamos children en la ruta para conectar Outlet con las vistas hijas del mismo Layout. Cuando visite la pagina principal '/' va a mostrar la vista de products, por eso es index:true. Entonces cada vez que se cambie el path, Outlet que esta en Layout se va a sustituir por el elmento que tiene router en ese path. La pagina principal esta en el path '/' ahi renderiza Layout-> Layout tiene hijos (rutas hijas), entonces cuando va a la principal (que la configuramos con index:true) renderiza Products que sustituye Outlet.
 * 
 * - Usamos React Router Data APIs: importamos la funcion action del componente NewProduct y la renombramos. Siempre las fucniones que manejan las ruta se llaman action y las debemos renombrar. import NewProduct, {action as newProductAction} from "./views/NewProduct";
 * - Usamos LOADER: importamos la funcion loader del componente Product.tsx y la renombramos. Siempre las fucniones que manejan las ruta se llaman action/loader y las debemos renombrar. import Product, {loader as loaderProduct} from "./views/NewProduct" y configuramos la ruta, le agregamos el loader en la ruta para que sepa que tiene esa funcion.
 */
