import { getDefaultNormalizer } from "@testing-library/react";
import React, {useEffect, useState} from "react";
import '../App.css';
import {JsonParser} from "./GUIElements/JsonParser";

function RequestPane(props) {
    const[request] = useState(props.request)
    const [id] = useState(props.id)  //121042323
    //const [result, setResult] = useState([]);


    function test() {
        console.log("Inside request pane")
        console.log(request)
    }


    return (
        <div className="RequestPane">
            {test()}
            <h1>REQUEST</h1>
            <JsonParser data = {request}/>
        </div>

    );
}


export default RequestPane