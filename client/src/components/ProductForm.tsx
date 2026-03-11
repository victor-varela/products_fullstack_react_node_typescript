import type { Product } from "../types";

type ProductFormProps ={
    product?: Product
}

const ProductForm = ({product}: ProductFormProps) => {
  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="name">
          Nombre Producto:
        </label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Nombre del Producto"
          defaultValue={product?.name}
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
          defaultValue={product?.price}
          name="price"
        />
      </div>
    </>
  );
};

export default ProductForm;


/**
 * - La prop del componente debe ser optional porque puede o no existir dependiendo si estamos creando un producto o editando. por eso el ? --> optional chaining.
 * 
 * 
 * 
 */