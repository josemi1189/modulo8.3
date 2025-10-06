//import { } from "../controller/motor"
import { cartas } from "../models/model";

/**
 * Muestra la imagen
 * @param idContenedorCarta id del DIV que contiene la imagen clicada
 * @param posicionCarta Posición del array (0-11) de la imagen clicada
 */
const muestraImagen = (idContenedorCarta:string, posicionCarta:number) => {
   const contenedor = document.getElementById(idContenedorCarta);
   if ( contenedor && contenedor instanceof HTMLDivElement ) {
      const imagen = contenedor.firstElementChild;
      if ( imagen && imagen instanceof HTMLImageElement ) {
         addClass(imagen, ["rotarCarta"]);
         setTimeout(() => {
            imagen.src = cartas[posicionCarta].imagen;
         },1000);
         setTimeout(() => {
            removeClass(imagen, ["rotarCarta"]);
         },1000);
         }
   }
}


const addClass = (elemento:object, clases:string[]) => {
   if (elemento instanceof HTMLDivElement){
      elemento.classList.add(...clases);
   }
   if (elemento instanceof HTMLImageElement){
      elemento.classList.add(...clases);
   }
}

const removeClass = (elemento:object, clases:string[]) => {
   if (elemento instanceof HTMLDivElement){
      elemento.classList.remove(...clases);
   }
   if (elemento instanceof HTMLImageElement){
      elemento.classList.remove(...clases);
   }
}

/**
 * Identifica sobre qué carta se hace clic.
 */
export const identificaClicCarta = ():void => {
   const contenedor = document.getElementById("juego");
   const cartas = contenedor?.getElementsByTagName("div");

   if ( cartas && cartas instanceof HTMLCollection ) {
      for ( let i=0; i<cartas?.length; i++ ) {
         if ( cartas[i] && cartas[i] instanceof HTMLDivElement ) {
            cartas[i].addEventListener("click", () => {
               console.log("Data-set de carta clicada: ",cartas[i].id);
               muestraImagen(cartas[i].id, i);
            });
         }
      }
   }
}