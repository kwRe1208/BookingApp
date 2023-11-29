import useFetch from "../../hooks/useFetch";
import "./featured.css"
import React from 'react';
//import { BCImage } from '../../../public/img/BC.jpg';

const Featured = () => {
    const { data, loading, error } = useFetch("/hotels/countByCity?cities=Toronto,Vancouver,Winnepeg")

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
                            <h1>Toronto</h1>
                            <h2>{data[0]} properties</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img
                            src="/img/AL.png"
                            alt=""
                        />
                        <div className="featuredTitles">
                            <h1>Vancouver</h1>
                            <h2>{data[1]} properties</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img
                            src="/img/ON.jpg"
                            alt=""
                        />
                        <div className="featuredTitles">
                            <h1>Winnepeg</h1>
                            <h2>{data[2]} properties</h2>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Featured