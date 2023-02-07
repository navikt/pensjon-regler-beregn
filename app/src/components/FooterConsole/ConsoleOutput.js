import React from "react";

export default function ConsoleOutput({environment, satsTabell, requestType, fileName = "", error, text, setFooter, setShowWarning}) {

    if (text) {
        setFooter(text)
    } else {
        let resource
        if (fileName) {
            resource = fileName
        } else
            resource = "logviewer"
        if (error) {
            // setFooter("")
            setFooter("Feil for " + requestType + " med feilmelding: " + error)
            set
            // document.getElementById("requestView").innerText = "<p></p>"
            // document.getElementById("responseView").innerText = "<p></p>"
        } else {
            // setFooter("")
            setFooter(requestType + "(" + resource + ")" + " har kjørt ferdig i miljø: " + environment + " med " + "satsTabeller: " + satsTabell.toString().replace("&sats=", ""))
        }
    }
    setShowWarning(true)
}