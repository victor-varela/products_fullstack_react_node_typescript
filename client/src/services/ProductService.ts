import { safeParse } from "valibot";
import { DraftProductSchema, ProductsSchema} from "../types";
import axios from "axios";


type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      //Enviamos a la API con axios
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
      
    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.log(error);
  }
}

//Obtener Datos de la API
export async function getProducts(){
  //Siempre tryCatch porque vamos a interactuar con APIs
  try {
    //Hacemos la peticion .get la info esta en el objeto data.data
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const {data} = await axios(url)
    
    //Validamos con Valibot primero. Usamos el Schema ProductsSchema 'en plural'
    const result = safeParse(ProductsSchema, data.data)
    console.log(result);
    
    

  } catch (error) {
    
  }
}


/**
 * - Inferimos el type de data desde el componente NewProduct parandonos con el cursor  [k: string]: FormDataEntryValue. Y creamos un type en este archivo para asignarselo al parametro de la funcion addProduct
 * - Usamos el schema que hemos creado para esta funcion --> usamos valibot para asegurar los datos que vamos a enviar.7
 * - en safeParse en lugar de pasar como segundo argumento a data, le pasamos un objeto con los atributos de data pero en price ponemos el + para convertir a numero y pasar la validacion de valibot.4
 * - Para comunicarnos con la REST API usamos AXIOS.
 * - Creamos carpeta en la raiz .env.local para la url de la aplicaion que va a cambiar en el deploy.
 * - Para enviar data con axios le agregamos el .post y enviamos el objeto que ESPERA nuestra API, name: price: con los datos validados de valibot que estan en el objeto result por eso usamos result.output.name/price
 * 
 * - Creamos funcion para obetner los datos de la api getProducts()
 *
 *
 *
 */
