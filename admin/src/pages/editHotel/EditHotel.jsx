import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { hotelInputs } from "../../formSource";

const EditHotel = () => {
    const [files, setFiles] = useState([]);
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [availableRooms, setAvailableRooms] = useState([]);
    const selectedRoomIds = info.rooms || [];

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const response = await axios.get(`/hotels/find/${id}`);
                const hotelData = response.data;

                // Prepare initial data for all hotelInputs fields
                const initialInfo = {};
                hotelInputs.forEach((input) => {
                    initialInfo[input.id] = hotelData[input.id] || '';
                });
                setInfo({ ...hotelData });

                // Get selected room IDs from hotelData and set to rooms state
                const selectedRoomIds = hotelData.rooms || [];
                setRooms(selectedRoomIds); // Set selected rooms
            } catch (error) {
                console.error("Error fetching hotel details:", error);
            }
        };

        const fetchAvailableRooms = async () => {
            try {
                const response = await axios.get("/rooms");
                const roomsData = response.data;
                setAvailableRooms(roomsData);
            } catch (error) {
                console.error("Error fetching available rooms:", error);
            }
        };


        fetchAvailableRooms();
        fetchHotelDetails();

    }, [id]);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSelect = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        setRooms(value);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedHotelData = {
                ...info,
                rooms: rooms // Include the selected rooms
            };
            await axios.put(`/hotels/${id}`, updatedHotelData);
            navigate("/hotels");
        } catch (err) {
            console.log("Error updating hotel:", err);
        }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Edit Hotel</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                info.photos && info.photos.length > 0
                                    ? info.photos[0]
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            {hotelInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        id={input.id}
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        value={info[input.id]}
                                    />
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Featured</label>
                                <select id="featured" onChange={handleChange} value={info.featured}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>
                            <div className="formInput">
                                <div className="selectRooms">
                                    <label>Rooms</label>
                                    <select id="rooms" multiple onChange={handleSelect} value={rooms}>
                                        {availableRooms.map((room) => (
                                            <option key={room._id} value={room._id}>
                                                {room.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button onClick={handleUpdate}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditHotel;
