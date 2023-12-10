import React, { useContext, useState } from "react";
import axios from "axios";
import { userInputs } from "../../formSource";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
    const [info, setInfo] = useState({});
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const clearFormInputs = () => {
        userInputs.forEach(input => {
            document.getElementById(input.id).value = '';
        });
    };

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleLogin = (e) => {
        navigate("/login");
    };

    const handleHomePage = (e) => {
        navigate("/");
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/daf5dolsf/image/upload",
                data
            );

            const { secure_url } = uploadRes.data; // Get the secure URL of the uploaded image

            const newUser = {
                ...info,
                isAdmin: false,
                img: secure_url || "empty",
            };

            console.log(newUser);

            // Replace with your backend endpoint for user registration
            const response = await axios.post("/auth/register", newUser);
            dispatch({ type: "REGISTER_SUCCESS", payload: response.data.details });

            // Clear form inputs after successful registration
            clearFormInputs();

            // Show success modal after registration
            setShowSuccessModal(true);

            // Hide success modal after 3 seconds (3000 milliseconds)
            setTimeout(() => {
                setShowSuccessModal(false);
            }, 3000);

            // Handle successful registration (e.g., redirect to a success page or login page)
            console.log("User registered successfully!");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="register">
            <div className="register-container">
                <form className="register-form">
                    {userInputs.map((input) => (
                        <div className="form-input" key={input.id}>
                            <label className="input-label">{input.label}</label>
                            <input
                                onChange={handleChange}
                                type={input.type}
                                placeholder={input.placeholder}
                                id={input.id}
                                className="input-field"
                            />
                        </div>
                    ))}
                    <div className="form-input">
                        <label className="input-label">Image:</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="input-field"
                        />
                    </div>
                    <div className="register-buttons">
                        <button onClick={handleRegister} className="register-button">
                            Register
                        </button>
                        <button onClick={handleLogin} className="register-button">
                            Login
                        </button>
                    </div>
                    <button onClick={handleHomePage} className="back-button">
                        Back to Home page
                    </button>
                </form>
                {/* Pop-up modal for successful registration */}
                {showSuccessModal && (
                    <div className="form-input">
                        <p>Registration successful!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
