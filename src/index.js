import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { BayGame } from "./BayGame" // imports BayGame component from BayGame.js
import "./index.css"

//Renders BayGame component in browser
const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <BayGame />
  </BrowserRouter>
)
