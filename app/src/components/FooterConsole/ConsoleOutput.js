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
            setFooter("Loading error (nais status?)... " + error + " med " + requestType + " from " + resource + " i miljø: " + environment + " med " + "satsTabeller: " + satsTabell.toString().replace("&sats=", ""))
        } else {
            setFooter("Loading ferdig! " + requestType + " from " + resource + " i miljø: " + environment + " med " + "satsTabeller: " + satsTabell.toString().replace("&sats=", ""))
        }
    }
}