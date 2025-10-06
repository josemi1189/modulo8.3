import "./style.css";
import { nuevaPartida } from "./controller/motor";
import { identificaClicCarta } from "./ui/ui";

document.addEventListener("DOMContentLoaded", () => { nuevaPartida(); identificaClicCarta(); });