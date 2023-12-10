import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { roomInputs } from "../../formSource";

const EditRoom = () => {
    const [info, setInfo] = useState({});
    const [hotelId, setHotelId] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await axios.get(`/rooms/${id}`);
                const roomData = response.data;
                setInfo({ ...roomData });
                setHotelId(roomData.hotelId || ''); // Assuming roomData contains the hotelId
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };

        fetchRoomDetails();
    }, [id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [id]: value,
        }));
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Edit Room</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            {roomInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        id={input.id}
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        value={info[input.id] || ''}
                                    />
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRoom;
