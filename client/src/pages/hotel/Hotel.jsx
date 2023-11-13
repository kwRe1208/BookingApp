import "./hotel.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const Hotel = () => {

    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);

    const photos = [
        {
            src: "https://cf2.bstatic.com/xdata/images/hotel/square600/501096896.webp?k=32bf128fe3c7ae9b482d73b879502558b6c36055ea587f3cf57eebac305b8460&o="
        },
        {
            src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1"
        },
        {
            src: "https://cf2.bstatic.com/xdata/images/hotel/square600/501096896.webp?k=32bf128fe3c7ae9b482d73b879502558b6c36055ea587f3cf57eebac305b8460&o="
        },
        {
            src: "https://cf2.bstatic.com/xdata/images/hotel/square600/501096896.webp?k=32bf128fe3c7ae9b482d73b879502558b6c36055ea587f3cf57eebac305b8460&o="
        },
        {
            src: "https://cf2.bstatic.com/xdata/images/hotel/square600/501096896.webp?k=32bf128fe3c7ae9b482d73b879502558b6c36055ea587f3cf57eebac305b8460&o="
        },
        {
            src: "https://cf2.bstatic.com/xdata/images/hotel/square600/501096896.webp?k=32bf128fe3c7ae9b482d73b879502558b6c36055ea587f3cf57eebac305b8460&o="
        },
        {
            src: "https://cf2.bstatic.com/xdata/images/hotel/square600/501096896.webp?k=32bf128fe3c7ae9b482d73b879502558b6c36055ea587f3cf57eebac305b8460&o="
        },
        {
            src: "https://cf2.bstatic.com/xdata/images/hotel/square600/501096896.webp?k=32bf128fe3c7ae9b482d73b879502558b6c36055ea587f3cf57eebac305b8460&o="
        }
    ]

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;
        if(direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber);
    };

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="hotelContainer">
                {open && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)}/>
                    <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")}/>
                    <div className="sliderWrapper">
                        <img src={photos[slideNumber].src} alt="" className="sliderImg" />
                    </div>
                    <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")}/>
                </div>}
                <div className="hotelWrapper">
                    <button className="bookNow">Reserve or Book Now!</button>
                    <h1 className="hotelTitle">Grand Hotel</h1>
                    <div className="hotelAddress">                    <FontAwesomeIcon icon={"location-dot"} />
                        <span>Elton St 125 New York</span>
                    </div>
                    <div className="hotelDistance">                    <FontAwesomeIcon icon={"location-dot"} />
                        <span>Excellent location - 500m from center</span>
                    </div>
                    <div className="hotelPriceHighlight">                    <FontAwesomeIcon icon={"location-dot"} />
                        <span>Book a stay over $114 at this property and get a free airport taxi</span>
                    </div>
                    <div className="hotelImages">
                        {photos.map((photo, i) => (
                            <div className="hotelImgWrapper">
                                <img onClick={()=>handleOpen(i)} src={photo.src} alt="" className="hotelImg" />
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetails">
                        <div className="hotelDetailsTexts">
                            <h1 className="hotelTitle">Stay in the heart of.city</h1>
                            <p className="hotelDesc">
                                Set in the middle of the Bulgarian hill district of Vidin, this aparthotel is a short
                                walk from the centre of Vidin and within a 10-minute walk from the centre of the city.
                                The aparthotel has air conditioning, a flat-screen TV and a private bathroom with bathrobes.
                            </p>
                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>Perfect for a 9-night stay!</h1>
                            <span>
                                Located in the real heart of New York, this property has an
                                excellent location score of 9.8!
                            </span>
                            <h2>
                                <b>$945</b> (9 nights)
                            </h2>
                            <button>Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>
        </div>
    )
}

export default Hotel