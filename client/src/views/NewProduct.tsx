import { Link, Form } from "react-router-dom";

export async function action() {
  console.log("desde action...");
  return {};
}
const NewProduct = () => {
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
 *  3. En el router indicar cual es la funcion a ejecutar.
 * 
 * OJO: La funcion action vive FUERA del componente, el primer impulso fue escribirla dentro por lo aprendido en react clasico, Pero con React Router Data APIs el paradigma cambia:

Ya no manejás eventos

Delegás la lógica al router
 * React Router impone esta idea:

Componente → UI

Loader / Action → datos y efectos
- 
 *
 */
