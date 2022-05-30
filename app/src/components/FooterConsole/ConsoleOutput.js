import React, {useEffect} from "react";

export default function ConsoleOutput({ environment, satsTabell, requestType, fileName="",error, text}) {

    let resource =""
    if(fileName) {
        resource = fileName
    }
    else
        resource = "logviewer"

    if(text) {
        document.getElementById("footerConsole").innerText = text
    }
    else if(error)
        document.getElementById("footerConsole").innerText = "Loading error... " + error  + " med "+ requestType + " from " + resource +  " i miljø: " + environment + " med "+ "satsTabeller: " + satsTabell.toString().replace("&sats=", "")
    else
        document.getElementById("footerConsole").innerText =  "Loading ferdig! " + requestType + " from " + resource + " i miljø: " + environment + " med "+ "satsTabeller: " + satsTabell.toString().replace("&sats=", "")
}