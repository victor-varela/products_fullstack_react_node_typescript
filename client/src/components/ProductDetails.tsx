import type { Product } from "../types";
import { formatCurrency } from "../utils";

type ProductDetailsProps ={
    product: Product
}

const ProductDetails = ({product}:ProductDetailsProps) => {
    //availability es boolean por eso no se imprime directamente en el template
    const isAvailable = product.availability
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">{formatCurrency(product.price)}</td>
      <td className="p-3 text-lg text-gray-800">{isAvailable?'Disponible':'No Disponible'}</td>
      <td className="p-3 text-lg text-gray-800 ">EDITAR - ELIMINAR</td>
    </tr>
  );
};

export default ProductDetails;

/**
 * - Creamos el type de las props del componente
 * - Usamos una funcion helper para formato de precio formatCurrency()
 * 
 * 
 * 
 * 
 * 
 */
