import { useContext } from "react";
import "./navbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        //user({ type: "LOGOUT" });
        navigate("/login");
      };

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <span className="logo">
                        <a href="/" class="logo">
                            <img src="./devsquad-logo.jpg" width="250px" alt="DevSquad's Booking App" />
                        </a>
                    </span>
                </Link>
                {user ? user.username : (
                    <div className="navItems">
                        <button className="navButton">Register</button>
                        <button className="navButton">Login</button>
                    </div>
                )}
                <button onClick={handleLogout} className="navButton">Logout</button>
            </div>
        </div>
    )
};

export default Navbar