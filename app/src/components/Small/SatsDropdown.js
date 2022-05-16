import React, { useEffect } from "react";
import { useState } from "react";
import { Select } from "@navikt/ds-react/esm/form";
import "./SatsDropdown.css"

export default function SatsDropdown(props) {

    
    const [tabeller, setTabeller] = useState([[],[]])
    let defaultSats = "Default Sats"

    useEffect(() => {
        let satsUrl = 'https://pensjon-regler-q4.dev.adeo.no/alleSatstabeller'
        const fetchData = async () => {
        try {
            fetch(satsUrl, {
              method: 'GET',
              headers: {
                'Content-Type':  'application/json',
                'accept': 'application/json' 
              }
            })
            .then(response => response.json())
            .then(response => setTabeller(response))
          } catch(error) {
            console.log('Error:',error)
          }
       } 
       fetchData();
    }, [])

    function tabellHandler(e) {
        if(e.target.value == {defaultSats}) {
            props.tabellChanger("")
        } else {
        props.tabellChanger('&sats='+e.target.value)
        }
    }

    return(
        <Select
        size = "small"
        label = "Kjør med annen sats"
        onChange={e => tabellHandler(e)}
        hideLabel
        >
            <option>{defaultSats}</option>
            {tabeller[1].map((data,key) => {
                return (
                    <option 
                    value = {data}>
                        {data}
                    </option>
                )
            })}
        </Select>
    )

}