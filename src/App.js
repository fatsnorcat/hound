import logo from "../src/Components/Assets/mainlogo.png";
import background from "../src/Components/Assets/wave.png";
import "./App.css";

function App() {
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
          <div className="username-label">
            <label for="username" className="login-page-labels">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
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
