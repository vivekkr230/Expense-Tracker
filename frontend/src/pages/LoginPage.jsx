import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/apiService"; // Adjust the path if needed
import expenseImage from "../assets/unsplash.jpg";
import "../styles/login/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform login logic here
    console.log("username:", username);
    console.log("Password:", password);

    try {
      const response = await loginUser(username, password);
      console.log("response", response);

      if (response.message == "Logged in") {
        console.log("response.message", response.message);
        sessionStorage.setItem("username", response.username);
        sessionStorage.setItem("Session-token", response.Token);
        navigate("/dashboard");
        setSuccess(response.message);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.log("error", err.message);
      setError("An error occurred");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h1>Expense Tracker</h1>
          {/* <p>Please enter your details.</p> */}
          {/* <button className="apple-login">Log in with Apple</button> */}
          {/* <div className="divider">
            <span>or</span>
          </div> */}
          <form onSubmit={handleLogin}>
            <div className="input-container">
            <i className="fas fa-solid fa-user"> </i>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(null);
                }}
                required
              />
            </div>
            <div className="input-container">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                required
              />
            </div>
            <div className="remember-forgot">
              {/* <label>
                <input type="checkbox" /> Remember for 30 days
              </label> */}
              <p href="/">Forgot password?</p>
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          <p className="signup">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>

          {/* show error */}
          {error && <p className="error-msg">{error}</p>}
          {/* {success && <p className="seccess-msg">{success}</p>} */}
        </div>

        <div className="login-right">
          <img src={expenseImage} alt="Login Visual" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
