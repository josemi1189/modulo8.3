export const bgCarta:string = "/images/bg.png";

export interface Carta {
   idFoto: number,
   imagen: string,
   estaVuelta: boolean,
   encontrada: boolean,
}

interface InfoCarta {
   idFoto: number;
   imagen: string;
}

export const infoCartas:InfoCarta[] = [
   {
      idFoto: 1,
      imagen: 'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/1.png?raw=true',
 },
   {
      idFoto: 2,
      imagen: 'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/2.png?raw=true',
 },
   {
      idFoto: 3,
      imagen: 'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/3.png?raw=true',
 },
   {
      idFoto: 4,
      imagen: 'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/4.png?raw=true',
 },
   {
      idFoto: 5,
      imagen: 'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/5.png?raw=true',
 },
   {
      idFoto: 6,
      imagen: 'https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/6.png?raw=true',
 }
];


const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
   let cartas:Carta[];
   let cartasDuplicadas = [...infoCartas, ...infoCartas];
   cartas = cartasDuplicadas.map(carta => ({
      ...carta,
      estaVuelta: false,
      encontrada: false,
   }));

   return cartas;
};

/**
 * Contiene array de cartas ordenado
 */
export const cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);


/*
  Aquí definimos el tipo de estado de la partida, la idea es que cuando empiece la partida todas las cartas estén boca abajo y si se hacen click sobre ellas no se volteen.
  EstadoPartida = "PartidaNoIniciada", una vez que se pulse Iniciar partida el estado de la partida cambiaría a "CeroCartasLevantadas" y así sucesivamente.
*/

type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
  intentos?: number,
}

const crearTableroInicial = (): Tablero => ({
  cartas: cartas,
  estadoPartida: "PartidaNoIniciada",
  intentos: 0,
});

/**
 * Tablero
 *  - cartas[]: Array de cartas barajadas.
 *  - estadoPartida: "PartidaNoIniciada"  | "CeroCartasLevantadas"  | "UnaCartaLevantada"
 *       | "DosCartasLevantadas"  | "PartidaCompleta";
 *  - indiceCartaVolteadaA?: Índice de la 1ª carta clicada y volteada.
 *  - indiceCartaVolteadaA?: Índice de la 2ª carta clicada y volteada.
 */
export const tablero: Tablero = crearTableroInicial();

