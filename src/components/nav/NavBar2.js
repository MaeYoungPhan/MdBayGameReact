import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import olBlueLogo from "../howToPlay/images/olBlueLogo.png"
import './NavBar2.css'

export const NavBar2 = ({token, setToken}) => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-header">
        <img src={olBlueLogo} alt="Ol' Blue" className="navbar-logo" /> The Maryland Bay Game
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <FaBars />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
          {
        token ? (
          <>
            <li className="navbar-listitem how">
            <Link to="/howtoplay" className="navbar2-links">
            How To Play </Link>
            </li>
            <li className="navbar-listitem">
            <Link to="/bayitems" className="navbar2-links">
            Scavenger Hunt</Link>
            </li>
            <li className="navbar-listitem">
            <Link to="/riversandstreams" className="navbar2-links">
            Rivers and Streams</Link>
            </li>
            <li
                className="navbar-listitem">
                    <Link onClick={()=>{setToken("")}} to="/login">
                        Logout
                    </Link>
                </li>
                </>
        ) : (
            <>
                <li className="navbar-listitem">
                    <Link to="/register" className="button">
                            Register</Link></li>
                <li className="navbar-listitem">
                    <Link to="/login" className="button">Login </Link>
                </li>
            </>
        )
      }
          </ul>
        </div>
      </div>
    </nav>
  )
}