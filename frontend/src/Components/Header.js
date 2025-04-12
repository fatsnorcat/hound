import logo from "./Assets/mainlogo.png";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import About from './About';

export default function Header() {
  const { user } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [isUserDropdownVisible, setUserDropdownVisible] = useState(false);
  const [isMenuDropdownVisible, setMenuDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="nav-bar">
      <div className="logo-container">
        <ul>
          <li>
            <img id="logo" src={logo} alt="HOUND" />
          </li>
        </ul>
      </div>

      <ul>
        <li>
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              className="input"
              name="txt"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onMouseOut={() => setInputValue("")}
            />
          </div>
        </li>

        {user && (
          <>
            {/* Bars Icon Dropdown Menu */}
            <li>
              <div
                className="user-container"
                onMouseEnter={() => setMenuDropdownVisible(true)}
                onMouseLeave={() => setMenuDropdownVisible(false)}
              >
                <p className="user-name">
                  <FontAwesomeIcon icon={faBars} />
                </p>

                {isMenuDropdownVisible && (
                  <div className="dropdown-menu">
                    <p onClick={() => handleNavigate("/history")}>History</p>
                    <p onClick={() => handleNavigate("/alerts")}>Alerts</p>
                    <p onClick={() => handleNavigate("/attacks")}>Attack</p>
                  </div>
                )}
              </div>
            </li>

            {/* User Dropdown Menu */}
            <li>
              <div
                className="user-container"
                onMouseEnter={() => setUserDropdownVisible(true)}
                onMouseLeave={() => setUserDropdownVisible(false)}
              >
                <p className="user-name">
                  <FontAwesomeIcon icon={faUser} className="user-icon" /> {user.name}
                </p>
                {isUserDropdownVisible && (
                  <div className="dropdown-menu">
                    <p onClick={() => handleNavigate("/about")}>About</p>
                    <p onClick={handleLogout}>Logout</p>
                  </div>
                )}
              </div>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
