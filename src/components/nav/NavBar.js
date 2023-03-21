import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa'
import olBlueLogo from "../howToPlay/images/olBlueLogo.png"
import "./NavBar.css";

export const NavBar = ({toggle, setToggle, token, setToken}) => {
    
  return <>
      <ul className='navbar'>
          <li onClick={()=>{setToggle(true)}}>
              <p className="navbar-header">
                  <img src={olBlueLogo} alt="Ol' Blue" className="navbar-logo" /> The Maryland Bay Game
              </p>
          </li>
          <li onClick={()=>{setToggle(!toggle)}}>
              {toggle?
              <FaBars className="navbar-bars"/>
              :
              <FaTimes className="navbar-bars"/>
              }
          </li>
      </ul>
      <ul 
      className={`navbar2 ${toggle?"":"toggle"}`}
      onClick={()=>{setToggle(true)}}>
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
              {
                token ? (
                  <li
                  className="navbar-listitem">
                      <Link onClick={()=>{setToken("")}} to="/login">
                          Logout
                      </Link>
                  </li>
        ) : (
          <>
          <li
                  className="navbar-listitem">
            <Link to="/register" className="button">
                      Register</Link></li>
          <li
                  className="navbar-listitem">
            <Link to="/login" className="button">Login </Link></li>
          </>
        )
      }
      </ul>
      </>
}