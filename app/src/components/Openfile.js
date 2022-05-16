import React, {useCallback} from "react";
import {Button} from "@navikt/ds-react";
import FetchGUIModel from "./FetchGUIModel";

export default function Openfile({satsTabell, onResultChange}) {

    // console.log("setRuetls open file" , setResult, "satsTabeller", satsTabell)

    function parseRequestFromXML(body) {
        const xml = new window.DOMParser().parseFromString(body, "application/xml")
        // console.log("parsexml", xml.documentElement.nodeName )
        let fullName =  xml.documentElement.nodeName
        const requestType = fullName.split(".")[fullName.split(".").length-1]
        return fullName;
    }

    const fetchGuiModelOnXML = useCallback(async body => {
        // if (isSending) return
        // setIsSending(true)
        let className =  parseRequestFromXML(body)
        let contentType =  'application/xml'
        let environment = "pensjon-regler-q4"
        FetchGUIModel({body, className, environment,satsTabell, onResultChange, contentType})
        // let url = 'http://localhost:8080/api/beregn?className='+className+ satsTabell
        // // let url = 'https://'+environment+'.dev.adeo.no/api/beregn?className='+className+satsTabell
        // try {
        //     fetch(url, {
        //         method: 'POST',
        //         headers:  {
        //             'Content-Type':  'application/xml',
        //             'accept': 'application/json',
        //             'X-pensjonregler-log': 'disabled'
        //         },
        //         body: (body)
        //     })
        //         .then(response => response.json())
        //         .then(response => onResultChange(response));
        //     // console.log("result", result)
        // } catch(error) {
        //     console.log('Error:', error)
        // }
        // if (isMounted.current) // only update if we are still mounted
        //     setIsSending(false)
    })

    function previewFile(e) {
        const reader = new FileReader();

        reader.addEventListener("loadend", () => {
            // send  xml request to server
            fetchGuiModelOnXML(reader.result)
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