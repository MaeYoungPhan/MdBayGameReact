import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar2 } from "./components/nav/NavBar2"
import "./BayGame.css"

export const BayGame = () => {

  const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
  const [toggle, setToggle] = useState(true)

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken)
    setTokenState(newToken)
  }

  return <>
    <NavBar2 token={token} setToken={setToken} toggle={toggle} setToggle={setToggle}/> 
    <ApplicationViews token={token} setToken={setToken} toggle={toggle} setToggle={setToggle} />
  </>
}
