import React, {useState} from "react";
import '../App.css';
import {JsonParser} from "./GUIElements/JsonParser";


export default function ResponsePane({props, satstabell}) {
    return(
        <div className = "ResponsePane">
            <div className="headerContainer">
                <div>Resultat {satstabell}</div>
            </div>
            <div id="responseView">
                <JsonParser data = {props}/>
            </div>
        </div>
    )
}