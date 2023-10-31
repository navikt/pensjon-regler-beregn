import {Select} from "@navikt/ds-react/esm/form";
import React from "react";

export default function EnvironmentDropDown({ handleChange }) {

    const chooseEnvironemnt = "Velg miljø"
    const Local_Environemnt = "local"

    return (
        <Select id="environmentSelect"
                size="small"
                label="velg miljø"
                onChange={e => handleChange(e.target.value)}
                hideLabel
        >
            <option value={chooseEnvironemnt} /*selected disabled hidden*/>{chooseEnvironemnt}</option>
            <option value={Local_Environemnt}>{Local_Environemnt}</option>
            <option value="pensjon-regler-q0">pensjon-regler-q0</option>
            <option value="pensjon-regler-q1">pensjon-regler-q1</option>
            <option value="pensjon-regler-q2">pensjon-regler-q2</option>
            <option value="pensjon-regler-q5">pensjon-regler-q5</option>
        </Select>
    )
}