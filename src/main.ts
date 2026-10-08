import "./style.css";
import { BankApp } from "./bankApp";

const app = document.querySelector<HTMLDivElement>("#app")!;
new BankApp(app).start();
