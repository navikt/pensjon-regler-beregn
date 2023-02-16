import React from "react";

export default function ConsoleOutput({environment, satsTabell, requestType, fileName = "", error, text, setFooter, setShowWarning}) {

    if (text) {
        setFooter(text)
        setShowWarning(true)
    } else {
        let resource
        if (fileName) {
            resource = fileName
        } else
            resource = "logviewer"
        if (error) {
            setFooter("Feil for " + requestType + " med feilmelding: " + error)
        } else {
            setFooter(requestType + "(" + resource + ")" + " har kjørt ferdig i miljø: " + environment + " med " + "satsTabeller: " + satsTabell.toString().replace("&sats=", ""))
            setShowWarning(true)
        }
    }
}