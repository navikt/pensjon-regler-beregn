import React from "react";
import {RotatingLines} from "react-loader-spinner";

export default function Loading() {
    return (
        <div style={{margin: "auto", width: "20%", padding: "10px"}}>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    )
}