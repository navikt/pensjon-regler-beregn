import {Button} from "@navikt/ds-react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import FetchGUIModel from "./FetchGUIModel";

export default function Run({ name, body,environment, satsTabell,onResultChange, contentType, setFooter, setIsGUIModelFetched, setIsLoading, setShowWarning}) {

    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)
    const Click = useCallback(async() => {
        if (isSending) return
            setIsSending(true)
        let className = name
        FetchGUIModel({body, className, environment,satsTabell, onResultChange, contentType, setFooter, setIsGUIModelFetched,setIsLoading, setShowWarning})
        if (isMounted.current) // only update if we are still mounted
            setIsSending(false)
    })

// set isMounted to false when we unmount the component, unsure if neccessary
    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    return (
        <div>
            <Button id="run" onClick={ Click}  style={{background:"transparent",color:"white"}} disabled={isSending} >Kjør</Button>
        </div>

    )

}