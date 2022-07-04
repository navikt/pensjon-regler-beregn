import React from "react";
import ConsoleOutput from "../FooterConsole/ConsoleOutput";
import {chooseEnvironemnt, Local_Environemnt} from "./EnvironmentsDropdown"
import {defaultSats} from "./SatsDropdown"

export default function FetchGUIModel(
    {
        body,
        className,
        environment,
        satsTabell,
        onResultChange,
        contentType,
        fileName,
        setFooter
    }) {
    document.getElementById("footerConsole").innerText = ""
    let url = ""
    let endpoint = ""
    if (className.toString().includes("Request")) {
        endpoint = "beregn"
    } else if (className.toString().includes("Response")) {
        endpoint = "convertResponse"
    }
    if (!environment || environment === chooseEnvironemnt /*||environment==null||environment===""*/) {
        url = 'https://pensjon-regler-q4.dev.adeo.no/api/' + endpoint + '?className=' + className
        environment = "pensjon-regler-q4"
    } else if (environment === Local_Environemnt)
        url = 'http://localhost:8080/api/' + endpoint + '?className=' + className
    else
        url = 'https://' + environment + '.dev.adeo.no/api/' + endpoint + '?className=' + className

    if (!satsTabell || satsTabell === defaultSats) {
        satsTabell = defaultSats
    } else {
        url = url + "&sats=" + satsTabell
    }
    //async with correct value from dropdown list
    document.getElementById("environmentselect").value = environment
    document.getElementById("satsTabellerSelect").value = satsTabell

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
            if (response.ok) {
                return response.json()
            } else {
                let error = `HTTP error status: ${response.status}`
                ConsoleOutput({environment, satsTabell, requestType, fileName, error, setFooter})
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(response => onResultChange(response))
        .then(() => ConsoleOutput({environment, satsTabell, requestType, fileName, setFooter}))
        .catch(error => {
            console.log('Error:', error)
            ConsoleOutput({environment, satsTabell, requestType, fileName, error, setFooter})
        })

}