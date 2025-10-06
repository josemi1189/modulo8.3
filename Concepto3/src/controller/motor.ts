import { cartas, infoCarta } from "../models/model";

export const nuevaPartida = ():void => {
  console.log("Cartas ordenadas: ",cartas);
   const cartasDesordenadas = desordenaArray(cartas);
   console.log("Cartas desordenadas: ",cartasDesordenadas);
}

/**
 * Baraja las cartas
 * @param array Array con número de las cartas
 * @returns 
 */
const desordenaArray = (cartas: infoCarta[]): infoCarta[] => {
  const desordenado = [...cartas]; // Crear una copia para no modificar el array original
  for (let i = desordenado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [desordenado[i], desordenado[j]] = [desordenado[j], desordenado[i]]; // Intercambio
  }
  return desordenado;
}




