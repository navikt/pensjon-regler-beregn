import React from "react";
import ConsoleOutput from "../FooterConsole/ConsoleOutput";

export default function FetchGUIModel({body, className, environment, satsTabell, onResultChange, contentType, fileName}) {

    let url = ""
    if(environment==='local')
        url = 'http://localhost:8080/api/beregn?className='+className+ satsTabell
    else if(environment==="Default miljø"||environment==null||environment==="")
        return  url = 'https://pensjon-regler-q4.dev.adeo.no/api/beregn?className='+className+satsTabell
    else
        url = 'https://'+environment+'.dev.adeo.no/api/beregn?className='+className+satsTabell
    console.log("url", url)
    const requestType = className.split(".")[className.split(".").length-1]

    fetch(url, {
            method: 'POST',
            headers:  {
                'Content-Type':  contentType,
                'accept': 'application/json',
                'X-pensjonregler-log': 'disabled'
            },
            body: (body)
        })
            .then((response)=> {
                if(response.ok)
                    return response.json()
                else  {
                    let error = `HTTP error status: ${ response.status }`
                    ConsoleOutput({environment,satsTabell, requestType, fileName,error})
                    throw new Error(`HTTP error! Status: ${ response.status }`);
                }
            })
            .then(response => onResultChange(response))
            .then(() => ConsoleOutput({environment,satsTabell, requestType, fileName}))
            .catch(error => {
                console.log('Error:', error)
                ConsoleOutput({error})
            })

}