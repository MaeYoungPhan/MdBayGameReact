import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { BayGame } from "./BayGame"
import "./index.css"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <BayGame />
  </BrowserRouter>
)
