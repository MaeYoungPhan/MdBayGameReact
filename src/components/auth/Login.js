import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import bridge from "./images/BayBridge_postcard2.jpeg"
import "./Login.css"


export const Login = ({ setToken }) => {

  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()
  const [isUnsuccessful, setisUnsuccessful] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user)
      .then(res => {

      if ("valid" in res && res.valid && "token" in res) {

        setToken(res.token)
        localStorage.setItem("gamer_token", res.token)
        navigate("/bayitems")
      }
      else {

        setisUnsuccessful(true)
      }
    })
  }

  return (
    <section className="login--container">
    <img src={bridge} className="background-image"/>
      {/*login form*/}
      <div className="content">
      <form className="login--form" onSubmit={handleLogin}>
        <h1 className="login--title">Welcome to the Maryland Bay Game!</h1>
        <p className="login--subtitle">Please sign in</p>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" ref={password} />
          </div>
        </div>

          <div className="control">
            <button className="button" type="submit" >Login</button>
          </div>
          <div className="control">
            <Link to="/register" className="register-link">New gamer? Register to play!</Link>
          </div>
        {
          isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
        }
      </form>
      </div>
    </section>
  )
}