import { cartas, Carta, tablero, Tablero } from "../models/model";

export const nuevaPartida = ():void => {

   tablero.cartas = barajarCartas(cartas);
   tablero.estadoPartida = "CeroCartasLevantadas";
   tablero.intentos = 0;
   tablero.indiceCartaVolteadaA = undefined;
   tablero.indiceCartaVolteadaB = undefined;

   // Reinicia cartas encontradas y vueltas del objeto tablero.
   tablero.cartas.forEach(carta => {
      carta.encontrada = false;
      carta.estaVuelta = false;
   });
}

export const sumaIntentos = (tablero :Tablero):void => {
   if (tablero.intentos !== undefined) {
      tablero.intentos += 1;
   }
}

/**
 * Baraja array de cartas.
 * @param array Array con número de las cartas
 * @returns 
 */
export const barajarCartas = (cartas: Carta[]): Carta[] => {
  const desordenado = [...cartas]; // Crear una copia para no modificar el array original
  for (let i = desordenado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [desordenado[i], desordenado[j]] = [desordenado[j], desordenado[i]]; // Intercambio
  }
  return desordenado;
}

/**
 * Comprueba si la carta se puede voltear o no.
 * @returns true / false
 */
export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {

  let cartaClicada = tablero.cartas[indice];
  if ( !cartaClicada.encontrada 
    && !cartaClicada.estaVuelta 
    && tablero.estadoPartida !== "DosCartasLevantadas" ) {
    
      return true;
  }

  return false;
}

/**
 * Una vez confirmado que se puede voltear la carta, la marca como 
 *    volteada (tablero.cartas[i].estaVuelta) a true.
 * Modifica estadoPartida según corresponda.
 * @param tablero 
 * @param indice Posición del array de la carta mostrada.
 */
export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
   let carta = tablero.cartas[indice];
   carta.estaVuelta = true;
   
   if (tablero.estadoPartida === "CeroCartasLevantadas") {
      tablero.estadoPartida = "UnaCartaLevantada";
      tablero.indiceCartaVolteadaA = indice;
   }else if ( tablero.estadoPartida === "UnaCartaLevantada" ) {
      tablero.estadoPartida = "DosCartasLevantadas";
      tablero.indiceCartaVolteadaB = indice;
   }
}

/**
 * Comprueba si las dos cartas volteadas son pareja o no.
 * @param indiceA Posición del array de la 1ª carta volteada.
 * @param indiceB Posición del array de la 2ª carta volteada.
 * @param tablero 
 * @returns boolean. True: son pareja / False: No son pareja.
 */
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
   // Si son pareja
   sumaIntentos(tablero);
   if (tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto
      && tablero.estadoPartida === "DosCartasLevantadas"){
      return true;
   }
   return false;
}

/**
 * Pareja encontrada. Actualiza carta a encontrada = true y reinicia estadoPartida a "CeroCartasLevantadas".
 * @param tablero 
 * @param indiceA Posición del array de la 1ª carta volteada.
 * @param indiceB Posición del array de la 2ª carta volteada.
 */
export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
  
   tablero.cartas[indiceA].encontrada = true;
   tablero.cartas[indiceB].encontrada = true;
   tablero.indiceCartaVolteadaA = undefined;
   tablero.indiceCartaVolteadaB = undefined;
   tablero.estadoPartida = "CeroCartasLevantadas";   
}

/**
 * Si no son pareja, se vuelven a poner boca abajo y reinicia parámetros del objeto de dichas cartas.
**/
export const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
   tablero.cartas[indiceA].estaVuelta = false;
   tablero.cartas[indiceB].estaVuelta = false;
   tablero.indiceCartaVolteadaA = undefined;
   tablero.indiceCartaVolteadaB = undefined;
   tablero.estadoPartida = "CeroCartasLevantadas";
}


/**
 * Comprueba si se han encontrado todas las parejas.
 * @param tablero Datos del tablero de partida.
 * @returns True: Todas las parejas encontradas / False: Faltan parejas por encontrar.
 */
export const esPartidaCompleta = (tablero: Tablero) : boolean => {
   
   let todasParejasEncontradas = tablero.cartas.every(carta => 
      carta.encontrada
   )

  return todasParejasEncontradas;
}