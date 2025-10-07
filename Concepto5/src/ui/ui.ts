import { esPartidaCompleta, nuevaPartida, parejaEncontrada, parejaNoEncontrada, sePuedeVoltearLaCarta, sonPareja, voltearLaCarta } from "../controller/motor"
import { Tablero, tablero, bgCarta } from "../models/model";


const ocultaCarta = (posicionCarta:number) => {
   const contenedor = document.getElementById(`carta${posicionCarta+1}`);
   if ( contenedor && contenedor instanceof HTMLDivElement ) {
      const imagen = contenedor.firstElementChild;
      if ( imagen && imagen instanceof HTMLImageElement ) {
         addClass(imagen, ["rotarCarta"]);
         setTimeout(() => {
            imagen.src = bgCarta;
         },1000);
         setTimeout(() => {
            removeClass(imagen, ["rotarCarta"]);
         },1000);
         }
   }
}




/**
 * Muestra la imagen
 * @param idContenedorCarta id del DIV que contiene la imagen clicada
 * @param posicionCarta Posición del array (0-11) de la imagen clicada
 */
const muestraCarta = (idContenedorCarta:string, posicionCarta:number) => {
   const contenedor = document.getElementById(idContenedorCarta);
   if ( contenedor && contenedor instanceof HTMLDivElement ) {
      const imagen = contenedor.firstElementChild;
      if ( imagen && imagen instanceof HTMLImageElement ) {
         addClass(imagen, ["rotarCarta"]);
         setTimeout(() => {
            imagen.src = tablero.cartas[posicionCarta].imagen;
         },1000);
         setTimeout(() => {
            removeClass(imagen, ["rotarCarta"]);
         },1000);
         }
   }
}

const addClass = (elemento:object, clase:string[]) => {
   if (elemento instanceof HTMLDivElement){
      elemento.classList.add(...clase);
   }
   if (elemento instanceof HTMLImageElement){
      elemento.classList.add(...clase);
   }
}

const removeClass = (elemento:object, clase:string[]) => {
   if (elemento instanceof HTMLDivElement){
      elemento.classList.remove(...clase);
   }
   if (elemento instanceof HTMLImageElement){
      elemento.classList.remove(...clase);
   }
}

const modificaContador = (numIntentos:number):void => {
   console.log("Intentos: ",numIntentos);
   const divContador = document.getElementById("contador");
   if (divContador && divContador instanceof HTMLDivElement
         && tablero.intentos !== undefined) {
      divContador.innerHTML = "";
      divContador.innerHTML = `Intentos: ${numIntentos.toString()}`;
   }
}

/**
 * Si ya ha volteado dos cartas, comprueba si son pareja y actualiza datos de partida del
 * objeto tablero según corresponda.
 * @param tablero objeto con datos de la partida.
 * @param posicionCartaTablero Posición del array de tablero.cartas
 */
const gestionaVolteoCartas = (tablero: Tablero, posicionCartaTablero: number):void => {
   // Modifica objeto desde motor
   voltearLaCarta(tablero, posicionCartaTablero);
   
   // Comprueba si hay dos cartas volteadas y si son pareja.
   if (tablero.indiceCartaVolteadaA !== undefined && tablero.indiceCartaVolteadaB !== undefined ) {
      const iA = tablero.indiceCartaVolteadaA;
      const iB = tablero.indiceCartaVolteadaB;

      const esPareja = sonPareja(iA, iB, tablero);

      if (esPareja) {
         parejaEncontrada(tablero, iA, iB);
      } else {
         setTimeout(() => {
            ocultaCarta(iA);
            ocultaCarta(iB);
            parejaNoEncontrada(tablero, iA, iB);
         }, 3000);
      }
      (tablero.intentos !== undefined) && modificaContador(tablero.intentos);
   }
}

/**
 * Muestra mensaje de información.
 * @param mensaje :string - Mensaje a mostrar
 * @param clasesCSS :string - Clase CSS a añadir / eliminar
 * @param mostrar :boolean - True: Añade clase CSS / False: Elimina clase CSS
 */
const mostrarMensaje = (mensaje:string, clasesCSS:string[], mostrar:boolean):void => {
   const divMensaje = document.getElementById("mensajes");

   if (mostrar) {
      if (divMensaje && divMensaje instanceof HTMLDivElement) {
         addClass(divMensaje, clasesCSS);
         divMensaje.innerHTML = mensaje;
      }
   } else {
       if (divMensaje && divMensaje instanceof HTMLDivElement) {
         removeClass(divMensaje, clasesCSS);
         divMensaje.innerHTML = mensaje;
      }     
   }
}

const gestionPartida = (tablero:Tablero, i:number, id:string) => {

   if (sePuedeVoltearLaCarta(tablero, i) === true) {
      muestraCarta(id, i);
      gestionaVolteoCartas(tablero, i);
      (esPartidaCompleta(tablero)) && mostrarMensaje("¡Has ganado!", ["success"], true);

   } else {
      mostrarMensaje("Imagen ya volteada",["warning"], true);
      setTimeout(() => {
         mostrarMensaje("",["warning"], false);
      }, 3000);

   }
   
}

/**
 * Identifica sobre qué carta se hace clic.
 */
const identificaClicCarta = ():void => {
   //document.querySelector(`div[data-id="${i}"]`)
   const contenedor = document.getElementById("juego");
   
   if (contenedor && contenedor instanceof HTMLDivElement) {
      const divCarta = contenedor.getElementsByTagName("div");
  
      if ( divCarta && divCarta instanceof HTMLCollection ) {
         for ( let i=0; i<divCarta?.length; i++ ) {
            if ( divCarta[i] && divCarta[i] instanceof HTMLDivElement ) {
               divCarta[i].addEventListener("click", () => {

                  gestionPartida(tablero, i, divCarta[i].id);                  
               });
            }
         }
      }
   }
}

const reiniciaCartasTablero = ():void => {
   for ( let i=0; i<tablero.cartas.length; i++ ) {
      ocultaCarta(i);
   };
}

const inicializaPartida = ():void => {
   reiniciaCartasTablero();
   mostrarMensaje("",["warning","success"], false);
   nuevaPartida();
   identificaClicCarta();
   modificaContador(0);

   
}

export const cargaBotones = ():void => {
   const btnNuevaPartida = document.getElementById("nueva-partida");
   ( btnNuevaPartida && btnNuevaPartida instanceof HTMLButtonElement ) 
      && btnNuevaPartida.addEventListener("click", () => {   
         inicializaPartida();
      });
}