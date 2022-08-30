import React, {useState} from "react";
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
            <div className="headerContainer">
                <div>Response</div>
            </div>
            <div id="responseView">
                <JsonParser data = {response}/>
            </div>
        </div>
    )
}


export default ResponsePane