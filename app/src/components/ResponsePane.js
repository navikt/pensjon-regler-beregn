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
            <h3>RESPONSE</h3>
            <JsonParser data = {response}/>
        </div>
    )
}


export default ResponsePane