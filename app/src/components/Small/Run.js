import {Button} from "@navikt/ds-react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import FetchGUIModel from "./FetchGUIModel";

export default function Run({ name, body,environment, satsTabell,onResultChange, contentType}) {

    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)
    const Click = useCallback(async() => {
        if (isSending) return
            setIsSending(true)
        let className = name
        const requestType = className.split(".")[className.split(".").length-1]
        document.getElementById("footerConsole").innerText= requestType + " from logviewer  i miljø: "+ environment
        // let url = 'http://localhost:8080/api/beregn?className='+className+satsTabell
        // let url = 'https://'+environment+'.dev.adeo.no/api/beregn?className='+className+satsTabell
        // let body = logResponse['xml']
        FetchGUIModel({body, className, environment,satsTabell, onResultChange, contentType})
        // console.log(body)
        // try {
        //   fetch(url, {
        //     method: 'POST',
        //     headers:  {
        //         'Content-Type':  'application/json',
        //         'accept': 'application/json',
        //         'X-pensjonregler-log': 'disabled'
        //     },
        //     body: (body)
        //   })
        //   .then(response => response.json())
        //   .then(response => setResult(response));
        //   } catch(error) {
        //       console.log('Error:', error)
        //   }
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
            <Button id="run" onClick={ Click}  style={{background:"transparent",color:"white"}} disabled={isSending} >Run</Button>
        </div>

    )

}