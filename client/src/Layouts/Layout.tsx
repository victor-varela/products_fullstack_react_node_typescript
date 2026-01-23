import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div>Desde Layout</div>
      <Outlet />
    </>
  );
};

export default Layout;

/**
 * Usamos el componente Outlet para inyectar el contenido de otras paginas manteniendo el mismo layout, asi evitamos repetir codigo. ¿como conectamos outlet con las paginas o views de la app?--> vamos al router y le indicamos que la pagina principal tiene children, de esa manera conectamos outlet y las views. Antes habiamos creado en src la carpeta views y dentro el archivo Products.tsx que va a mostrar todos los productos pero MANTIENE EL MISMO LAYOUT, esa es la ventaja.
 */
