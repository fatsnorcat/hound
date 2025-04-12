import logo from "./Assets/mainlogo.png";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { user } = useContext(UserContext);
    const [inputValue, setInputValue] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    const handleAbout = () => {
        navigate("/about");
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
                {user && (
                    <li>
                        <div
                            className="user-container"
                            onMouseEnter={() => setIsDropdownVisible(true)}
                            onMouseLeave={() => setIsDropdownVisible(false)}
                        >
                            <p className="user-name">
                                <FontAwesomeIcon icon={faUser} className="user-icon" /> {user.name}
                            </p>

                            {isDropdownVisible && (
                                <div className="dropdown-menu">
                                    <p onClick={handleAbout}>About</p>
                                    <p onClick={handleLogout}>Logout</p>
                                </div>
                            )}
                        </div>
                    </li>
                )}
            </ul>
        </nav>
    );
}
