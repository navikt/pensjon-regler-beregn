import React from "react";

export default function FetchGUIModel({body, className, environment, satsTabell, onResultChange, contentType}) {

    let url = ""
    if(environment==='local')
        url = 'http://localhost:8080/api/beregn?className='+className+ satsTabell
    else if(environment==="default miljø")
        return  url = 'https://pensjon-regler-q4.dev.adeo.no/api/beregn?className='+className+satsTabell
    else
        url = 'https://'+environment+'.dev.adeo.no/api/beregn?className='+className+satsTabell
    console.log("url", url)

    function insertEnvironment(environment) {
        document.getElementById("insertEnvironment").innerText=environment
        return undefined;
    }

    try {
        fetch(url, {
            method: 'POST',
            headers:  {
                'Content-Type':  contentType,
                'accept': 'application/json',
                'X-pensjonregler-log': 'disabled'
            },
            body: (body)
        })
            .then(response => response.json())
            .then(response => onResultChange(response))
            // .then(insertEnvironment(environment));
    } catch(error) {
        console.log('Error:', error)
    }

}