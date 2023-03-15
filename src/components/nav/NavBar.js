import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

// Creates and exports NavBar component
// uses Props in the argument defined in Rare.js
export const NavBar = ({ token, setToken }) => {
  //defines navigate variable to use useNavigate hook
  const navigate = useNavigate();
  /*
  •useRefs() hooks are used to reference previous state 
  •Defines variable where useRef is set to an initial value of null
  */
  const navbar = useRef();
  /*
  the mobile icon used for opening a menu
  hidden until user adjusts width
  */
  const hamburger = useRef();
  /*
  •Toggles mobile hamburger icon to active and opens on click (JSX)
  */
  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          {/* <img src={Logo} height="3rem" alt="Rare Logo" />{" "} */}
          <h1 className="Header">The Maryland Bay Game</h1>
        </a>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="true"
          data-target="navbarBasicExample"
          onClick={showMobileNavbar}
          ref={hamburger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {
            token ? 
            (<>
                <span className="padding">/</span>
                <Link to="/" className="navbar-item">
                  Home
                </Link>
              </>
            ) : (
              ""
            )
          }
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                // This ternary statement checks if the current user is logged in
                // If true, a logout button will appear and will route back to the "/login" path when clicked
                token ? (
                  <button
                    className="button is-rounded"
                    onClick={() => {
                      setToken("");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/register" className="button is-rounded is-link">
                      Register
                    </Link>
                    <Link to="/login" className="button is-rounded is-outlined">
                      Login
                    </Link>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};