import axios from "axios";
import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// ... (imports)

const Login = () => {
    const [credentials, setCredentials] = useState({
      email: undefined,
      password: undefined,
    });
  
    const { loading, error, dispatch } = useContext(AuthContext);
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
  
    const handleClick = async (e) => {
      e.preventDefault();
      dispatch({ type: "LOGIN_START" });
      try {
        const response = await axios.post("/auth/login", credentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.details });
        navigate("/");
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      }
    };
  
    const handleBackToHome = () => {
      navigate("/");
    };
  
    return (
      <div className="login">
        {/* Background Image */}
        <div
          className="background-image"
          style={{
            backgroundImage: 'url("http://localhost:3000/static/media/header.7667b8175b7d46fd4f57.jpg")', // Replace image URL
          }}
        ></div>
  
        <div className="lContainer">
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <button disabled={loading} onClick={handleClick} className="lButton">
            Login
          </button>
          <button onClick={handleBackToHome} className="backButton">
            Back to home page
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    );
  };
  
  export default Login;
  
  