import { number, object, string } from "valibot";

export const DraftProductSchema = object({
    name: string(),
    price: number()
})

/**
 * Aca creamos el schema de las peticiones que vamos a enviar: agregar producto es un draft porque luego la api le agrega id y disponibilidad.
 * 
 * 
 * 
 */