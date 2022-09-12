import React, { useState } from "react";
import '../App.css';
import { JsonParser } from "./GUIElements/JsonParser";

function RequestPane({props}) {

    return (
        <div className="RequestPane">
            <div className="headerContainer">
                <div>Grunnlag</div>
            </div>
            <div id="requestView">
                <JsonParser data={props}/>
            </div>
        </div>

    );
}


export default RequestPane