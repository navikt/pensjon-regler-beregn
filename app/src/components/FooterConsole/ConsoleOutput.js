import React from "react";

export default function ConsoleOutput({environment, satsTabell, requestType, fileName = "", error, text, setFooter, setShowWarning}) {

    if (text) {
        setFooter(text)
        setShowWarning(true)
    } else {
        let resource
        if (fileName=="") {
            resource = "logviewer"
        } else
            resource = fileName
        if (error) {
            setFooter("Feil for " + requestType + " med feilmelding: " + error)
        } else {
            setFooter(requestType + "(" + resource + ")" + " har kjørt ferdig i miljø: " + environment + " med " + "satsTabeller: " + satsTabell.toString().replace("&sats=", ""))
            if(setShowWarning!= undefined)
                setShowWarning(true)
        }
    }
}