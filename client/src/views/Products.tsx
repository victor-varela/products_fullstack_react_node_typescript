import { Link, useLoaderData } from "react-router-dom";
import { getProducts } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import type { Product } from "../types";

//Aca se define el LOADER, recuerda ya no es parte del componente por eso no esta dentro de Product. Es logica y lo maneja reactRouterDom.

//Definicion alternativa= export const loader= async(){}
export async function loader() {
  //Usamos nuestro service para traer data de la API
  const products = await getProducts();

  //retornamos los productos
  return products;
}

const Products = () => {
  //Recuperamos los productos del loader con useLoaderData
  const products = useLoaderData() as Product[];

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
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Renderizamos componente Reutilizable */}
            {products.map(product => (
              <ProductDetails
               key={product.id}
               product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;

/**
 * - Agregamos el routing con Link para navegar las views o pages. Importamos de react-router-dom : Link
 * - Creamos una funcion LOADER de reactRouterDom para cargar los datos al componente. La ventaja es que carga los datos ANTES de que se monte el componente es mas rapido que useEffect(), similiar como hicimos la funcion ACTION en NewProduct.ts. Es async porque va a buscar data en una API. Router.tsx es quien se debe enterar que usamos la funcion Loader por ello se inicializa o configura ahi en Router.tsx.
 * - Usamos el useLoaderData de reactRouterDom para pasar el return del loader al componente (Logica--> UI).
 *
 */
