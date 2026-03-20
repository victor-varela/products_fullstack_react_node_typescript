import {
  Form,
  redirect,
  useFetcher,
  useNavigate,
  type ActionFunctionArgs,
} from 'react-router-dom';
import type { Product } from '../types';
import { formatCurrency } from '../utils';
import { deleteProduct } from '../services/ProductService';

type ProductDetailsProps = {
  product: Product;
};

//La funcion que conecta el action con el router. Usamos como parametro 'params'
export async function action({ params: { id } }: ActionFunctionArgs) {
  //Llamamos funcion service para eliminar (aseguramos que no sea undefined y que id sea number para que Ts no se queje)

  if (id !== undefined) {
    await deleteProduct(+id);

    return redirect('/');
  }
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  //availability es boolean por eso no se imprime directamente en el template
  const isAvailable = product.availability;

  //instanciamos useNavigate
  const navigate = useNavigate();

  //instaciamos Fetcher
  const fetcher = useFetcher();
  return (
    <tr className='border-b '>
      <td className='p-3 text-lg text-gray-800'>{product.name}</td>
      <td className='p-3 text-lg text-gray-800'>
        {formatCurrency(product.price)}
      </td>
      <td className='p-3 text-lg text-gray-800'>
        {/* Usamos useFetcher */}
        <fetcher.Form method='POST'>
          <button
            type='submit'
            name='id'
            value={product.id}
            className={`${product.availability ? 'text-black' : 'text-red-600'} border border-gray-400 rounded-lg p-2 uppercase w-full font-bold text-xs shadow-slate-50 hover:cursor-pointer  `}
          >
            {isAvailable ? 'Disponible' : 'No Disponible'}
          </button>
        </fetcher.Form>
      </td>
      <td className='p-3 text-lg text-gray-800 '>
        <div className='flex gap-2 items-center'>
          <button
            //usamos onClick, llamamos navigate y le pasamos ruta
            onClick={() => navigate(`/products/${product.id}/edit`)}
            className='bg-indigo-600 text-white text-xs uppercase p-2 rounded-lg w-full text-center font-bold'
          >
            EDITAR
          </button>
          {/* Agregamos boton de eliminar por medio de Form para usar el action de router-dom */}
          {/* EN el FORM- Usamos confirm para prevenir borrar sin querer. Onsubmit. Esto se ejecuta ANTES que action */}
          <Form
            className='w-full'
            method='POST'
            action={`products/${product.id}/delete`}
            onSubmit={(e) => {
              if (!confirm('¿Eliminar registro?')) {
                e.preventDefault();
              }
            }}
          >
            <input
              type='submit'
              value={'Eliminar'}
              className='bg-red-600 text-white text-xs uppercase p-2 rounded-lg w-full text-center font-bold'
            />
          </Form>
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
 * - Para eliminar un producto usamos el componente Form de router-Dom. Asi aprovechamos el 'action' para eliminar. A diferencia de editar, en eliminar solo debemos mandar a llamar a una funcion que borre el registro en la DB. Por ello cuando el user hace click en eliminar pasa lo siguiente: obtenemos el id del item a eliminar gracias a params --> ejecutamos la funcion service para eliminar un registro en la Db ---> en esa misma funcion retornamos un redirect('/') para volver a la vista principal. Por eso usamos un Form y le damos estilo de boton y agregamos el action con el metodo POST y lo mismo en router.tsx.
 * - Otra forma de hacerlo seria con este codigo html:
 * 
 *           <Link
            to={/products/${product.id}/delete`} 
            className="bg-red-600 text-white text-xs uppercase p-2 rounded-lg w-full text-center font-bold"
          >
            ELIMINAR
          </Link>
 *  Pero no seria optimo --> Un Link siempre hace GET. Por eso normalmente no se usa Link para borrar cosas. Los formularios de HTML nativos solo soportan GET y POST por eso no escribo en method='DELETE' que sería lo semanticamente Ideal.

          Form (POST)
              ↓
        React Router action
              ↓
        axios.delete()
              ↓
        API backend

    - Para evitar usar un redirect cuando se elimina un producto usamos useFetcher. Creamos un boton en el campo 'disponible' de este componente con un form de HTML
 * - Este componente es Hijo de la view Products.tsx. Este componente tiene un action que se tiene que asociar a la url que lo muestra la cual es la raiz '/' por ello en esa ruta en el router declaramos el action de updateAvailabilityAction y la funcon la escribimos en el componente PADRE --> PRODUCTS.TSX
    - Para eliminar solo necesitamos el Id, por ello en el fetcher.Form definimos esos campos --> name="id" value={product.id}
 *
 *
 */
