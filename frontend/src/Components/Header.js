import logo from "./Assets/mainlogo.png";
import { useContext } from 'react'
import { UserContext } from "../context/userContext";

export default function Header() {
    const {user} = useContext(UserContext) // Calls user
    return (
        <nav className="nav-bar">
            <div className="logo-container">
                <img id="logo" src={logo} alt="HOUND"></img>
            </div>
            <ul>
                <li>
                    {!!user && (<p>Hi {user.name}!</p>)}
                </li>
                <li>
                    <a href="/" onClick={() => Logout()}>Logout</a>
                </li>
            </ul>
        </nav>
    )
}