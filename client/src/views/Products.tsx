import { Link } from "react-router-dom";
import { getProducts } from "../services/ProductService";

//Aca se define el LOADER, recuerda ya no es parte del componente por eso no esta dentro de Product. Es logica y lo maneja reactRouterDom.

//Definicion alternativa= export const loader= async(){}
export async function loader() {
  //Usamos nuestro service para traer data de la API
const products = await getProducts();
  console.log(products);

  return {};
}

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
 * - Creamos una funcion LOADER de reactRouterDom para cargar los datos al componente. La ventaja es que carga los datos ANTES de que se monte el componente es mas rapido que useEffect(), similiar como hicimos la funcion ACTION en NewProduct.ts. Es async porque va a buscar data en una API. Router.tsx es quien se debe enterar que usamos la funcion Loader por ello se inicializa o configura ahi en Router.tsx.
 */
