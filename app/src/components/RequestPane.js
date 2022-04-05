import { getDefaultNormalizer } from "@testing-library/react";
import React, {useEffect, useState} from "react";
import '../App.css';

function RequestPane(props) {
    const[request] = useState(props.request)
    const [id] = useState(props.id)  //121042323
    //const [result, setResult] = useState([]);


    function test() {
    }


    return (
        <div className="RequestPane">
            <h1>REQUEST</h1>
            <p>content : {JSON.stringify(request)}</p>
            <p>ID: {id}</p>
            <p>{test()}</p>
        </div>

    );
}


export default RequestPane