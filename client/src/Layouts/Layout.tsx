import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="bg-slate-800">
        <div className="mx-auto max-w-6xl py-10">
          <h1 className="text-4xl font-extrabold text-white">Administrador de Productos</h1>
        </div>
      </header>
      <main className="mt-10 mx-auto max-w-6xl bg-white shadow p-10">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

/**
 * Usamos el componente Outlet para inyectar el contenido de otras paginas manteniendo el mismo layout, asi evitamos repetir codigo. ¿como conectamos outlet con las paginas o views de la app?--> vamos al router y le indicamos que la pagina principal tiene children, de esa manera conectamos outlet y las views. Antes habiamos creado en src la carpeta views y dentro el archivo Products.tsx que va a mostrar todos los productos pero MANTIENE EL MISMO LAYOUT, esa es la ventaja.
 * - Hacemos el diseño de Layout. Maquetamos el Layout que se va a compartir.
 */
