import React from "react";

export default function ConsoleOutput({environment, satsTabell, requestType, fileName = "", error, text, setFooter}) {

    if (text) {
        setFooter(text)
    } else {
        let resource
        if (fileName) {
            resource = fileName
        } else
            resource = "logviewer"
        if (error) {
            setFooter("")
            setFooter("Feil for " + requestType + " med feilmelding: " + error)
            document.getElementById("requestView").innerText = ""
            document.getElementById("responseView").innerText = ""
        } else {
            setFooter("")
            setFooter(requestType + "(" + resource + ")" + " har kjørt ferdig i miljø: " + environment + " med " + "satsTabeller: " + satsTabell.toString().replace("&sats=", ""))
        }
    }
}