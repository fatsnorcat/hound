import logo from "./Assets/mainlogo.png";
// import background from "./Assets/wave.png";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { username, password } = data;

    try {
      const { data: response } = await axios.post("/login", {
        username,
        password,
      });

      if (response.error) {
        if (response.error === "User does not exist") {
          toast.error("User does not exist. Please sign up.");
        } else if (response.error === "Incorrect password") {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error(response.error);
        }
      } else {
        setUser(response);
        toast.success("Login successful");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="App">
      <div className="logo-container">
        <img id="logo" src={logo} alt="HOUND" />
        <div className="logo-label">
          <label>Project H.O.U.N.D</label>
        </div>
      </div>
      <div className="login-form">
        <form className="login" onSubmit={loginUser}>
          <h2>Login</h2>
          <div className="username-label">
            <label htmlFor="username" className="login-page-labels">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
          </div>
          <div className="password-label">
            <label htmlFor="password" className="login-page-labels">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>

          <button type="submit">Login</button>
          <div className="forgot-password">
            <a href="/" onClick={(e) => {
              e.preventDefault();
              navigate("/");
              toast("Redirecting to homepage...");
            }}>
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
      {/* <div className="background-image">
        <img src={background} alt="waves" />
      </div> */}
    </div>
  );
}
