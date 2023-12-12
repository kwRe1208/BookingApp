import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom"

const EditUser = ({ inputs, title }) => {
    const [info, setInfo] = useState({
        username: "",
        email: "",
        password: "",
        isAdmin: false,
        phone: "",
        country: "",
        address: "",
        city: "",
        zip: "",
        img: "",
      });
    const { id } = useParams();
    const filteredInputs = inputs.filter((input) => input.id !== 'password')
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                console.log("userId", id);
                const response = await axios.get(`/users/${id}`);
                const { password, ...filteredUserData } = response.data;
                setInfo(filteredUserData);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [id]);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const updateUser = async () => {
        try {
            await axios.put(`/users/${id}`, info);
            navigate("/hotels");
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                info.img instanceof File
                                    ? URL.createObjectURL(info.img)
                                    : info.img || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            {filteredInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        id={input.id}
                                        value={info[input.id]}
                                    />
                                </div>
                            ))}
                            {/* <button onClick={updateUser}>Update User</button> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
