import { Link } from "react-router-dom";

const Products = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="/products/new"
          className="bg-indigo-600 rounded-md shadow-sm font-bold text-white p-3 text-sm hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
      </div>
    </>
  );
};

export default Products;

/**
 * - Agregamos el routing con Link para navegar las views o pages. Importamos de react-router-dom : Link
 */
