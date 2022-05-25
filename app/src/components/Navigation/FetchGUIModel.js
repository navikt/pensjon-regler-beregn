import React from "react";
import ConsoleOutput from "../FooterConsole/ConsoleOutput";
import {chooseEnvironemnt, Local_Environemnt} from "./EnvironmentsDropdown"
import {defaultSats} from "./SatsDropdown"

export default function FetchGUIModel({body, className, environment, satsTabell, onResultChange, contentType, fileName }) {
    // let text = ""
    // ConsoleOutput({text})
    let url = ""
    if (!environment || environment === chooseEnvironemnt /*||environment==null||environment===""*/) {
        url = 'https://pensjon-regler-q4.dev.adeo.no/api/beregn?className=' + className
        environment = "pensjon-regler-q4"
    }
    else if (environment === Local_Environemnt)
        url = 'http://localhost:8080/api/beregn?className=' + className
    else
        url = 'https://' + environment + '.dev.adeo.no/api/beregn?className=' + className

    if(!satsTabell|| satsTabell===defaultSats) {
        url  = url
    }
    else {
        url  = url + "&sats="+satsTabell
    }
    console.log("url", url)

    //async with correct value from dropdown list
    document.getElementById("environmentselect").value = environment
    // document.getElementById("satsTabellerSelect").value = satsTabell

    const requestType = className.split(".")[className.split(".").length - 1]

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': contentType,
            'accept': 'application/json',
            'X-pensjonregler-log': 'disabled'
        },
        body: (body)
    })
        .then((response) => {
            if (response.ok)
                return response.json()
            else {
                let error = `HTTP error status: ${response.status}`
                ConsoleOutput({environment, satsTabell, requestType, fileName, error})
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(response => onResultChange(response))
        .then(() => ConsoleOutput({environment, satsTabell, requestType, fileName}))
        .catch(error => {
            console.log('Error:', error)
            ConsoleOutput({error})
        })

}