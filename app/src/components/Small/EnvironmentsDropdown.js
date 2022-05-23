import React, { useEffect } from "react";
import { useState } from "react";
import { Select } from "@navikt/ds-react/esm/form";
import "./SatsDropdown.css"

export default function EnvironmentsDropdown(props) {


    // const [environment, setEnvironment] = useState(props.environmentsChanger)
    let chooseEnvironemnt = "Velg miljø"
    console.log(props.innitialEnvironment)
    if(props.innitialEnvironment) {
        // if(props.innitialEnvironment==="local"||props.innitialEnvironment==={chooseEnvironemnt})
        //     document.getElementById("environmentselect").innerText = props.innitialEnvironment
        // else {
        //     console.log("environment", props.innitialEnvironment.replace("pensjon-regler-",""))
        //     document.getElementById("environmentselect").innerHTML = <option>{props.innitialEnvironment.replace("pensjon-regler-","")}</option>
        // }
    }


    function environmentsHandler(value) {
        props.environmentsChanger(value)
        if(value === {chooseEnvironemnt}) {
            props.environmentsChanger(value)
        }
        else if(value === 'local') {
            props.environmentsChanger(value)
        }
        else {
            props.environmentsChanger('pensjon-regler-'+ value)
        }
    }

    return(
        <Select id="environmentselect"
            size = "small"
            label = "velge et miljø"
            onChange={e => environmentsHandler(e.target.value)}
            hideLabel
        >
            <option value="">{chooseEnvironemnt}</option>
            <option value = "local">local</option>
            <option value = "t0">t0</option>
            <option value="q0">q0</option>
            <option value="q1">q1</option>
            <option value="q2">q2</option>
            <option value="q4">q4</option>
            <option value="q5">q5</option>
        </Select>
    )

}