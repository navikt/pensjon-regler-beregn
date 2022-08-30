import React, { useState } from "react";
import '../App.css';
import { JsonParser } from "./GUIElements/JsonParser";

function RequestPane(props) {
    const [request] = useState(props.request)
    const [name] = useState(props.name)
    const [id] = useState(props.id)

    function test() {
        console.log("Inside request pane")
        console.log("name", name)
        console.log(request)
    }

    return (
        <div className="RequestPane">
            <div className="headerContainer">
                <div>Request</div>
            </div>
            <div id="requestView">
                <JsonParser data={request}/>
            </div>
        </div>

    );
}


export default RequestPane