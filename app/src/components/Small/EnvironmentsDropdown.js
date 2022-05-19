import React, { useEffect } from "react";
import { useState } from "react";
import { Select } from "@navikt/ds-react/esm/form";
import "./SatsDropdown.css"

export default function EnvironmentsDropdown(props) {


    // const [environment, setEnvironment] = useState(props.environmentsChanger)
    let chooseEnvironemnt = "Velge miljø"
    // environmentsHandler(environment)

    function environmentsHandler(value) {
        props.environmentsChanger(value)
        // if(value == {chooseEnvironemnt}) {
        //     props.environmentsChanger("")
        // }
        // else if(value == 'local') {
        //     props.environmentsChanger("localhost:8080")
        // }
        // else {
        //     props.environmentsChanger('pensjon-regler-'+e.target.value +'.dev.adeo.no')
        // }
    }

    return(
        <Select
            size = "small"
            label = "velge et miljø"
            onChange={e => environmentsHandler(e.target.value)}
            hideLabel
        >
            <option>{chooseEnvironemnt}</option>
            <option>local</option>
            <option>T0</option>
            <option>Q0</option>
            <option>Q1</option>
            <option>Q2</option>
            <option>Q4</option>
            <option>Q5</option>
        </Select>
    )

}