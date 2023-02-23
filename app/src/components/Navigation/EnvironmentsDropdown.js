import React from "react";
import {Select} from "@navikt/ds-react/esm/form";
import "./SatsDropdown.css"
import FetchGUIModel from "./FetchGUIModel";

// global constant
export const chooseEnvironemnt = "Velg miljø"
export const Local_Environemnt = "local"

export default function EnvironmentsDropdown(props) {
    function environmentsHandler(environment) {
        props.environmentsChanger(environment)

        let body = props.body
        let className = props.name
        let satsTabell = props.satsTabell
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

    return (
        <Select id="environmentselect"
                size="small"
                label="velge et miljø"
                onChange={e => environmentsHandler(e.target.value)}
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