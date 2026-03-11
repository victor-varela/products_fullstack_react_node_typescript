import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductsById, updateProduct } from "../services/ProductService";
import type { ActionData } from "./NewProduct";
import type { Product } from "../types";
import ProductForm from "../components/ProductForm";

//definimos loader para obtener el id (params) del producto clickeado por user- OJO se hace FUERA DEL COMPONENTE, esto es logica y lo pasas a router.tsx por FUERA... jeje

export const loader = async ({ params: { id } }: LoaderFunctionArgs) => {
  //Llamamos la funcion services que se comunica con la API

  //Verificamos que id no sea undefined porque Ts se quejaba
  if (id !== undefined) {
    //Guardamos la data en product y Convertimos a number id porque Ts se quejaba
    const product = await getProductsById(+id);
    //Validamos que el producto exista
    if (!product) {
      return redirect("/");
    }
    //retornamos product
    return product;
  }
};
export async function action({ request, params: { id } }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  if (Object.values(data).includes("")) {
    return { error: "Todos los campos son obligatorios" }; //esto agrega al objeto data la propiedad error que vamos a usar en el componente.-> UI
  }

  //Paso la validacion llamamos la funcion que maneja la peticion API- Esperamos que termine
  //Este action tiene como parametros a params para poder usar el id de URL

  //Validamos si id no es undefined porque Ts se queja y convertimos a number
  if (id !== undefined) {
    await updateProduct(data, +id);
    //Redireccinamos a '/'
    return redirect("/");
  }
}

//Creamos objeto para agregar la disponibilidad de producto ya que estamos en Edicion
const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

const EditProduct = () => {
  const data = useActionData<ActionData>(); //traemos la variable data de la funcion action a traves de este hook.

  //Traemos la data que hay en loader
  const product = useLoaderData() as Product;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
        <Link
          to="/"
          className="bg-indigo-600 rounded-lg shadow-sm font-bold text-white p-3 text-sm hover:bg-indigo-500"
        >
          Volver a Productos
        </Link>
      </div>
      {data?.error && <ErrorMessage>{data.error}</ErrorMessage>}
      <Form className="mt-10" method="POST">

        {/* usamos el componente reutilizable y le enviamos la data para que se llene en automatico */}
        <ProductForm
          product={product}
        />
        {/* Agregamos campo para disponibilidad */}
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Producto"
        />
      </Form>
    </>
  );
};

export default EditProduct;

/**
 * - Usa link o useNavigate para movernos en la app.
 * - Debemos llenar el formulario con la data del producto que estamos eligiendo automaticamente como hemos hecho siempre.
 * - Para llenar el formulario al 'cargar' este componente usamos useLoader al igual que usamos useLoader en Products.tsx
 * - Repasamos los pasos para loader:
 *      - Creamos la funcion. Es async porque va a la api
 *      - En router.tsx 'el director de esta orquesta' extremos con un alias el loader. para que la app sepa que este componente tiene un loader y lo mande a llamar en tiempo y forma
 * - Usando el enfoque paramas, simplemente lo recuperamos cuando llamamos a loader({params}) y ahi esta! el type de paramas es : LoaderFunctionArgs. Se puede inferir en VsCode desde el loader que esta en router, te paras sobre loader y ahi sale.
 * 
 * 
 * - Este loader hace basicamente lo mismo que el loader de products, pero solo tremos byId. Copiamos el loader de products y ajustamos:
 * 
 *     Agregamos id en la ruta que hace la peticion   
 *     const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
 * 
 *     Usamos el schema de UN producto no de TODOS para validacion
 *      //Validamos con Valibot primero. Usamos el Schema ProductSchema 'en singular'
        const result = safeParse(ProductSchema, data.data);
 *  
 * - Finalmente usamos el atribuno defaultValue en el input para completar los datos que tenemos en nuestra variable product y asi se llena el formulario en automatico.
 * 
 * - El enfoque params es mejor para evitar que la app truene si un usuario quiere compartir la url. Es mejor apoyarse en la url siempre.
 * 
 * - Para editar un producto debemos usar crear una nueva funcion que lleve esa data a la API--> updateProduct. Esta funcion tiene 2 parametros, data (la ingresada por user en el formulario) y Id (para que la api haga el PUT en el producto que corresponde. No es un POST ni GET ni PATH).
 * 
 * - Nos valemos del componente reutilizable ProductForm para mostar la data del producto a editar. Este componente necesita recibir el producto, por lo tanto declaramos sus props. AL hacer eso y querer usarlo en NewProduct debemos aclararle a Ts que la prop es optional--optional chaining porque puede que el componente ProductForm la use (cuando es edicion) o no use la prop (cuando es registro)
 *
 *
 *
 *
 *
 *
 *
 */
