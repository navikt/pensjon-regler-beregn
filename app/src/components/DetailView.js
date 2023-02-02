import React, { useState } from "react";
import '../App.css';
import { JsonParser } from "./GUIElements/JsonParser";

function DetailView(props) {

    return (
        <div id="datailView">
            <p>{props.footer}</p>
        </div>


    );
}


export default DetailView