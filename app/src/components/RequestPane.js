import React, {useState} from "react";
import '../App.css';
import {JsonParser} from "./GUIElements/JsonParser";

function RequestPane(props) {
    const [request] = useState(props.request)
    const [name] = useState(props.name)
    const [id] = useState(props.id)

    return (
        <div className="RequestPane">
            <div className="headerContainer">
                <div>Request</div>
            </div>
            <JsonParser data={request}/>
        </div>

    );
}

export default RequestPane