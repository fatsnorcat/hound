import logo from "../src/Components/Assets/mainlogo.png";
import background from "../src/Components/Assets/wave.png";
import "./App.css";
import axios from "axios"
import React, { useState } from "react"

function App() {
  // Hooks to store states and error messages
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // 
  const handleLogin = async (e) => {
    e.preventDefault() // Prevents form reload
    try {
      const response = await axios.post("https://projecthound.vercel.app", {
        username,
        password,
      })

      localStorage.setItem("token", response.data.token)

      alert("Login successful!")
      setError("") // Clears previous errors
    } catch (err) {
        setError(err.response?.data?.message || "Invalid credentials")
    }
  }

  return (
    <div className="App">
      <div className="logo-container">
        <img id="logo" src={logo} alt="HOUND"></img>
        <div className="logo-label">
          <label>Project H.O.U.N.D</label>
        </div>
      </div>
      <div className="login-form">
        <form className="login">
          <h2>Login</h2>
          // Dynamic error message
          {error && <p className="error-message">{error}</p>}
          <div className="username-label">
            <label for="username" className="login-page-labels">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            ></input>
          </div>
          <div className="password-label">
            <label for="password" className="login-page-labels">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>

          <button type="submit">Login</button>
          <div class="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
        </form>
      </div>
      <div className="background-image">
        <img src={background} alt="waves"></img>
      </div>
    </div>
  );
}

export default App;
