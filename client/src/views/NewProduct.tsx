import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";

export type ActionData = {
  error?: string;
};

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  if (Object.values(data).includes("")) {
    return { error: "Todos los campos son obligatorios" }; //esto agrega al objeto data la propiedad error que vamos a usar en el componente.-> UI
  }

  //Paso la validacion llamamos la funcion que maneja la peticion API- Esperamos que termine
  await addProduct(data);

  //Redireccinamos a '/'
  return redirect("/");
}
const NewProduct = () => {
  const data = useActionData<ActionData>(); //traemos la variable data de la funcion action a traves de este hook.

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
        <Link
          to="/"
          className="bg-indigo-600 rounded-md shadow-sm font-bold text-white p-3 text-sm hover:bg-indigo-500"
        >
          Volver a Productos
        </Link>
      </div>
      {data?.error && <ErrorMessage>{data.error}</ErrorMessage>}
      <Form className="mt-10" method="POST">
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Nombre Producto:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Producto"
            name="name"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Precio:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
          />
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
};

export default NewProduct;

/**
 * - Usamos Actions de react-router-dom para procesar formularios. Debemos importar Form y crear una funcion action. Importante siempre se llama action esa funcion y cuando la importamos en el router.tsx la renombramos como newProductAction.
 * - Son 3 pasos:
 *  1. Importar Form de react-router-dom--> permite el atributo method=''
 *  2. Crear la funcion
 *  3. En el router indicar cual es la funcion a ejecutar. import NewProduct, {action as newProductAction} from "./views/NewProduct"; y agregamos la property action: newProductAction en el path: /products/new que es donde nos interesa.
 * 
 * OJO: La funcion action vive FUERA del componente, el primer impulso fue escribirla dentro por lo aprendido en react clasico, Pero con React Router Data APIs el paradigma cambia:

Ya no manejás eventos

Delegás la lógica al router-->Router poder
 * React Router impone esta idea:

Componente → UI

Loader / Action → datos y efectos

- En el momento que retornamos algo en la funcion action estara disponible en el componente por medio de un hook llamado useActionData, asi conectamos las variables que creamos en el action con el componente---> logica--> UI
- La function action es asincrona porque va a interactuar con la DB, y tambien hay que esperar AWAIT que la funcion addProduct termine para seguir corriendo el codigo de la app que en este caso es redireccionar al user a '/', para ello usamos REDIRECT de react-router-dom.
 * - Usamos Link para direccionar al user en la app Link to='/' vuelve a index
   - Este template se repite en EditProduct pero cambia Link to={/products/:id/edit}
 */
