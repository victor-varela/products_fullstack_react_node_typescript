import { safeParse } from "valibot";
import { DraftProductSchema } from "../types";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    if(result.success){

    }else{
        throw new Error ('Datos no validos')
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * - Inferimos el type de data desde el componente NewProduct parandonos con el cursor  [k: string]: FormDataEntryValue. Y creamos un type en este archivo para asignarselo al parametro de la funcion addProduct
 * - Usamos el schema que hemos creado para esta funcion --> usamos valibot para asegurar los datos que vamos a enviar.7
 * - en safeParse en lugar de pasar como segundo argumento a data, le pasamos un objeto con los atributos de data pero en price ponemos el + para convertir a numero y pasar la validacion de valibot.
 *
 *
 *
 */
