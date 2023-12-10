import "./mailList.css"
import { useState } from 'react';

const MailList = () => {

    const [email, setEmail] = useState('');

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubscribeClick = () => {
        setEmail('');
    };

    return (
        <div className="mail">
            <h1 className="mailTitle">Save time, save money!</h1>
            <span className="mailDesc">Sign up and we'll send the best deals to you</span>
            <div className="mailInputContainer">
                <input type="text" placeholder="Your Email" value={email} onChange={handleInputChange}/>
                <button onClick={handleSubscribeClick}>Subscribe</button>
            </div>
        </div>
    )
}

export default MailList