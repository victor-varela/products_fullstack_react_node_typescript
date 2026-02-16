import { Form, Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

//definimos loader para obtener el id (params) del producto clickeado por user- OJO se hace FUERA DEL COMPONENTE, esto es logica y lo pasas a router.tsx por FUERA... jeje
export const loader = async () => {
  console.log("desde loader...");
};

const EditProduct = () => {
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
      {/* {data?.error && <ErrorMessage>{data.error}</ErrorMessage>} */}
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

export default EditProduct;

/**
 * - Usa link o useNavigate para movernos en la app.
 * - Debemos llenar el formulario con la data del producto que estamos eligiendo automaticamente como hemos hecho siempre.
 * - Para llenar el formulario al 'cargar' este componente usamos useLoader al igual que usamos useLoader en Products.tsx
 * - Repasamos los pasos para loader:
 *      - Creamos la funcion. Es async porque va a la api
 *      - En router.tsx 'el director de esta orquesta' extremos con un alias el loader. para que la app sepa que este componente tiene un loader y lo mande a llamar en tiempo y forma
 *
 *
 *
 *
 *
 *
 *
 *
 */
