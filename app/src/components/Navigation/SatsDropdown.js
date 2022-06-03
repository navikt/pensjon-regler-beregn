import React, { useEffect } from "react";
import { useState } from "react";
import { Select } from "@navikt/ds-react/esm/form";
import "./SatsDropdown.css"
import ConsoleOutput from "../FooterConsole/ConsoleOutput";

export const defaultSats = "Velg sats"

export default function SatsDropdown(props) {

    
    const [tabeller, setTabeller] = useState([[],[]])
    let setFooter = props.onSetFooter

    useEffect(() => {
        let satsUrl = 'https://pensjon-regler-q4.dev.adeo.no/alleSatstabeller'
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
                    console.log("Response", response)
                    if (response.ok)
                        return response.json()
                    else {
                        let text = `Leser satsTabeller list feil, sjekk nais status: ${response.status}`
                        ConsoleOutput({text, setFooter})
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                })
                .then(response => setTabeller(response))
                .catch(error => {let text =`Leser satsTabeller list feil, sjekk nais status: ${error}`
                    ConsoleOutput({text, setFooter})
                    }
                   )
          // }
       } 
       fetchData();
    }, [])

    function tabellHandler(e) {
        props.tabellChanger(e.target.value)
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