import useFetch from "../../hooks/useFetch";
import "./featured.css"
import React from 'react';
//import { BCImage } from '../../../public/img/BC.jpg';

const Featured = () => {
    const { data, loading, error } = useFetch("/hotels/countByCity?cities=Berlin,Madrid,London")

    return (
        <div className="featured">
            {loading ? (
                "Loading please wait"
            ) : (
                <>
                    <div className="featuredItem">
                        <img
                            src="/img/BC.jpg"
                            alt=""
                        />
                        <div className="featuredTitles">
                            <h1>Berlin</h1>
                            <h2>{data[0]} properties</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img
                            src="/img/AL.png"
                            alt=""
                        />
                        <div className="featuredTitles">
                            <h1>Madrid</h1>
                            <h2>{data[1]} properties</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img
                            src="/img/ON.jpg"
                            alt=""
                        />
                        <div className="featuredTitles">
                            <h1>London</h1>
                            <h2>{data[2]} properties</h2>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Featured