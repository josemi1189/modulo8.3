import "./style.css";
import { nuevaPartida } from "./controller/motor";
import { carta } from "./ui/ui";

document.addEventListener("DOMContentLoaded", () => { nuevaPartida(); carta(); });