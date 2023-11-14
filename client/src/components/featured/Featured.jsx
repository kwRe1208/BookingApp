import "./featured.css"
import React from 'react';
//import { BCImage } from '../../../public/img/BC.jpg';

const Featured = () => {
    return (
        <div className="featured">
            <div className="featuredItem">
                <img
                    src="/img/BC.jpg"
                    alt=""
                />
                <div className="featuredTitles">
                    <h1>British Columbia</h1>
                    <h2>500 properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img
                    src="/img/AL.png"
                    alt=""
                />
                <div className="featuredTitles">
                    <h1>Alberta</h1>
                    <h2>200 properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img
                    src="/img/ON.jpg"
                    alt=""
                />
                <div className="featuredTitles">
                    <h1>Ontario</h1>
                    <h2>500 properties</h2>
                </div>
            </div>
        </div>
    )
}

export default Featured