import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../types";
import { formatCurrency } from "../utils";

type ProductDetailsProps = {
  product: Product;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  //availability es boolean por eso no se imprime directamente en el template
  const isAvailable = product.availability;

  //instanciamos useNavigate
  const navigate = useNavigate();
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">{formatCurrency(product.price)}</td>
      <td className="p-3 text-lg text-gray-800">{isAvailable ? "Disponible" : "No Disponible"}</td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            //usamos onClick, llamamos navigate y le pasamos ruta
            onClick={() => navigate(`/products/${product.id}/edit`)}
            className="bg-indigo-600 text-white text-xs uppercase p-2 rounded-lg w-full text-center font-bold"
          >
            EDITAR
          </button>
          <Link
            to={"/"}
            className="bg-red-600 text-white text-xs uppercase p-2 rounded-lg w-full text-center font-bold"
          >
            ELIMINAR
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ProductDetails;

/**
 * - Creamos el type de las props del componente
 * - Usamos una funcion helper para formato de precio formatCurrency()
 * -Creamos la ruta en router.tsx para editar productos.
 * - Podemos usar tanto Link como useNavigate para movernos dentro de la app. Agregamos Link to para direccionar a '/'products/:id/edit
 *  - useNavigate puede ser usado antes del return del componente a diferencia de Link que solo se usa despues del return, es decir, en la presentacion del componente. useNavigate se puede usar para manejar otra logica antes del return (despues de definir una funcion. Ej despues que user cierra sesion, despues que user llena un form). Se instancia y se usa en una acction onClick={()=> navigate(ruta)}
 * -Usamos el enfoque params. Obtener la url que genera nuestra app para desde ahi consultar a la api con esos datos. Esto permite que user pueda compartir la url y ésta sí exista y no dependa de una accion como click en el boton editar para que se genera esa url.
 * - Entonces cuando se hace click en editar se deben cargar los datos de ese producto en el componente EditProducts y que suena eso? a loader, si. Usamos useLoader.
 * - Se puede usar las options de useNavigate para crear un state === useNavigate(url, { state: value }) y se recupera en el componente que se envia con useLocation() es un hook. Pero no es eficiente porque no se puede compartir la url, si user no da click en editar no se llena ese state. Mejor opcion es el enfoque params. Lo recuperamos cuando llamamos al loader en el componente que lo necesita loader({params}) y ahi esta!!
 *
 *
 *
 *
 */
