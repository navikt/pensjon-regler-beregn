import React from "react";
import {Select} from "@navikt/ds-react/esm/form";
import "./SatsDropdown.css"

// global constant
export const chooseEnvironemnt = "Velg miljø"
export const Local_Environemnt = "local"

export default function EnvironmentsDropdown(props) {
    function environmentsHandler(value) {
        props.environmentsChanger(value)
    }

    return (
        <Select id="environmentselect"
                size="small"
                label="Velge et miljø"
                onChange={e => environmentsHandler(e.target.value)}
                hideLabel
        >
            <option value={chooseEnvironemnt} /*selected disabled hidden*/>{chooseEnvironemnt}</option>
            <option value={Local_Environemnt}>{Local_Environemnt}</option>
            <option value="pensjon-regler-q0">pensjon-regler-q0</option>
            <option value="pensjon-regler-q1">pensjon-regler-q1</option>
            <option value="pensjon-regler-q2">pensjon-regler-q2</option>
            <option value="pensjon-regler-q4">pensjon-regler-q4</option>
            <option value="pensjon-regler-q5">pensjon-regler-q5</option>
        </Select>
    )

}