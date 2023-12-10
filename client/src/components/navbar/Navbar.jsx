import { useContext } from "react";
import "./navbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    };

    const handleRegister = () => {
        navigate("/register");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <span className="logo">
                        <a href="/" class="logo">
                            <img src="/devsquad-logo.jpg" width="200px" alt="DevSquad's Booking App" />
                        </a>
                    </span>
                </Link>
                {user ? (
                    <div className="navItems">
                        <span className="labelUser">Welcome, {user.username}</span>
                        <button onClick={handleLogout} className="navButton">Logout</button>
                    </div>
                ) : (
                    <div className="navItems">
                        <button onClick={handleRegister} className="navButton">Register</button>
                        <button onClick={handleLogin} className="navButton">Login</button>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Navbar