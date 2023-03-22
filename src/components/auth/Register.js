import { useRef } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import bridge from "./images/BayBridge_postcard2.jpeg"
import "./Login.css"

export const Register = ({ setToken }) => {

  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const username = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {

      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value
      }

      registerUser(newUser).then((res) => {

        if ("token" in res) {

          setToken(res.token)
          localStorage.setItem("gamer_token", res.token)
          navigate("/howtoplay")
        }
      })
    } else {
      passwordDialog.current.showModal()
    }
  }

  return (
    <section className="login--container">
      <img src={bridge} className="background-image"/>
      <div className="content">
      <form className="login--form" onSubmit={handleRegister}>
        <h1 className="login--title">Welcome to the Maryland Bay Game!</h1>
        <p className="login--subtitle">Create an account to play</p>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input className="input" type="text" ref={firstName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input className="input" type="text" ref={lastName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" ref={email} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
              <p className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  ref={password}
                />
              </p>
            </div>

            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Verify Password"
                  ref={verifyPassword}
                />
              </p>
            </div>

          <div className="control">
            <button className="button" type="submit">
              Register
            </button>
          </div>
          <div className="control">
            <Link to="/login" className="register-link">
              Cancel
            </Link>
          </div>
      </form>
      </div>
    </section>
  )
}