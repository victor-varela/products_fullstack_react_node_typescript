import { array, boolean, number, object, string, type InferOutput } from "valibot";

//Schema 'borrador' de los datos antes de .post en la API
export const DraftProductSchema = object({
  name: string(),
  price: number(),
});

//Schema con todos los campos ya que vienen de la API
export const ProductSchema = object({
  //agregamos los campos que faltaban (id, availability)
  id: number(),
  name: string(),
  price: number(),
  availability: boolean(),
});

//En el services vemos que data es any asi que aca creamos un type. Lo usamos para iterar sobre el array de products en el componente y que Ts no se queje === const products = useLoader() as Product[], ahi Ts lo reconoce como un array.
export type Product = InferOutput<typeof ProductSchema>

// Creamos un Schema ProductsSchema (en plural) para validar los datos ya que a respuesta de la API a .getProducts es un ARRAY
export const ProductsSchema = array(ProductSchema)

/**
 * Aca creamos el schema de las peticiones que vamos a enviar: agregar producto es un draft porque luego la api le agrega id y disponibilidad.
 *
 * - Creamos Schema 'ProductSchema' de como deben ser los datos que recibimos de la API cuando usemos .get en la funcion getProducts.
 * - Creamos un Schema ProductsSchema (en plural) para validar los datos ya que a respuesta de la API a .getProducts es un ARRAY
 *
 *
 *
 */
