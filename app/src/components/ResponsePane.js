import React, {useEffect, useState} from "react";
import '../App.css';
import {JsonParser} from "./GUIElements/JsonParser";


function ResponsePane(props) {
    const[response] = useState(props.response)

    function test() {
        console.log("Inside response pane")
        console.log(response)
    }

    return(
        <div className = "ResponsePane">
            <h1>RESPONSE</h1>
            <JsonParser data = {response}/>
            <p>{test()}</p>
        </div>
    )
}


export default ResponsePane