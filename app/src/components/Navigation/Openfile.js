import React, {useCallback} from "react";
import {Button} from "@navikt/ds-react";
import FetchGUIModel from "./FetchGUIModel";

export default function Openfile({satsTabell, onResultChange,environment }) {

    function parseRequestFromXML(body, fileName) {
        const xml = new window.DOMParser().parseFromString(body, "application/xml")
        let fullName =  xml.documentElement.nodeName
        return fullName;
    }

    const fetchGuiModelOnXML = useCallback(async (body, fileName) => {
        let className =  parseRequestFromXML(body, fileName)
        let contentType =  'application/xml'
        // let environment = "pensjon-regler-q4"
        const requestType = className.split(".")[className.split(".").length-1]
        if(environment==null ||environment==="")
            environment = "pensjon-regler-q4"
        document.getElementById("footerConsole").innerText= requestType + " from file: " + fileName + " i miljø: " + environment
        FetchGUIModel({body, className, environment,satsTabell, onResultChange, contentType})
    })

    function previewFile(e) {
        const reader = new FileReader();

        reader.addEventListener("loadend", () => {
            // send  xml request to server
            fetchGuiModelOnXML(reader.result, e.target.files[0]['name'])
        }, false);

        if (e.target.files[0]!=null) {
            reader.readAsText(e.target.files[0]);
        }
    }

    function clickOpen(e) {
        document.getElementById('file-selector').click();
    }

    return (
            <div>
                {/*<input type="button" id="get_file" value="Åpne" onClick={(e => clickOpen(e))}  style={{background:"transparent",color:"white"}}/>*/}
                <input type="file" id="file-selector" accept=".xml" onChange={(e) => previewFile(e)} hidden={true}/>
                <Button id="get_file" onClick={(e => clickOpen(e))}  style={{background:"transparent",color:"white"}} >Åpne</Button>
            </div>

    )
}