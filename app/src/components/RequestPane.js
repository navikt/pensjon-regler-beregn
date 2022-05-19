import { getDefaultNormalizer } from "@testing-library/react";
import React, {useEffect, useState} from "react";
import '../App.css';
import {JsonParser} from "./GUIElements/JsonParser";

function RequestPane(props) {
    const[request] = useState(props.request)
    const[name] = useState(props.name)
    const [id] = useState(props.id)  //121042323
    //const [result, setResult] = useState([]);


    function test() {
        console.log("Inside request pane")
        console.log("name", name)
        console.log(request)
    }

    return (
        <div className="RequestPane">
            {/*<h3 id="requestId">{name?name.toString().split(".")[name.toString().split(".").length-1]:"REQUEST"}</h3>*/}
            <h3>REQUEST</h3>
            <JsonParser data = {request}/>
        </div>

    );
}


export default RequestPane