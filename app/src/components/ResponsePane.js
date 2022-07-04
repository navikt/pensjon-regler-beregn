import React, {useState} from "react";
import '../App.css';
import {JsonParser} from "./GUIElements/JsonParser";


function ResponsePane(props) {
    const [response] = useState(props.response)

    return (
        <div className="ResponsePane">
            <div className="headerContainer">
                <div>Response</div>
            </div>
            <JsonParser data={response}/>
        </div>
    )
}

export default ResponsePane