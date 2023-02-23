import React, { useEffect } from "react";
import { useState } from "react";
import { Select } from "@navikt/ds-react/esm/form";
import "./SatsDropdown.css"
import ConsoleOutput from "../FooterConsole/ConsoleOutput";
import FetchGUIModel from "./FetchGUIModel";

export const defaultSats = "Sats fra miljø"

export default function SatsDropdown(props) {

    
    const [tabeller, setTabeller] = useState([[],[]])
    let setFooter = props.onSetFooter
    let setShowWarning = props.setShowWarning

    useEffect(() => {
        let satsUrl = 'https://pensjon-regler-q2.dev.adeo.no/alleSatstabeller'
        const fetchData = async () => {
        // try {
            fetch(satsUrl, {
              method: 'GET',
              headers: {
                'Content-Type':  'application/json',
                'accept': 'application/json' 
              }
            })
                .then(response=> {
                    if (response.ok)
                        return response.json()
                    else {
                        let text = `Leser satsTabeller list feil, sjekk nais status: ${response.status}`
                        setShowWarning(true)
                        ConsoleOutput({text, setFooter, setShowWarning})
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                })
                .then(response => setTabeller(response))
                .catch(error => {let text =`Leser satsTabeller list feil, sjekk nais status: ${error}`
                    ConsoleOutput({text, setFooter, setShowWarning})
                    }
                   )
          // }
       } 
       fetchData();
    }, [])

    function tabellHandler(e) {
        props.tabellChanger(e.target.value)

        let body = props.body
        let className = props.name
        let environment = props.environment
        let satsTabell = e.target.value
        let onResultChange = props.onResultChange
        let fileName = props.fileName
        let setFooter = props.setFooter
        let setIsGUIModelFetched = props.setIsGUIModelFetched
        let setIsLoading = props.setIsLoading
        let setShowWarning = props.setShowWarning
        let contentType = fileName==""?'application/json':'application/xml'
        //load new if request is from Apne. (clear request and response)
        FetchGUIModel({body,className,environment,satsTabell,onResultChange,contentType,fileName ,setFooter,setIsGUIModelFetched, setIsLoading,setShowWarning})

    }

    return(
        <Select
            id = "satsTabellerSelect"
        size = "small"
        label = "Kjør med annen sats"
        onChange={e => tabellHandler(e)}
        hideLabel
        >
            <option value = {defaultSats} >{defaultSats}</option>
            {tabeller[1].map((data,key) => {
                return (
                    <option 
                    value = {data}
                    key = {key}>
                        {data}
                    </option>
                )
            })}
        </Select>
    )

}