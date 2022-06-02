import React, {useEffect} from "react";

export default function ConsoleOutput({ environment, satsTabell, requestType, fileName="",error, text, setFooter}) {

    let resource =""
    if(fileName) {
        resource = fileName
    }
    else
        resource = "logviewer"

    if(text) {
        setFooter(text)
        // document.getElementById("footerConsole").innerText = text
    }
    else if(error) {
        setFooter("Loading error... " + error  + " med "+ requestType + " from " + resource +  " i miljø: " + environment + " med "+ "satsTabeller: " + satsTabell.toString().replace("&sats=", ""))
        // document.getElementById("footerConsole").innerText = "Loading error... " + error  + " med "+ requestType + " from " + resource +  " i miljø: " + environment + " med "+ "satsTabeller: " + satsTabell.toString().replace("&sats=", "")
    }

    else {
        setFooter( "Loading ferdig! " + requestType + " from " + resource + " i miljø: " + environment + " med "+ "satsTabeller: " + satsTabell.toString().replace("&sats=", ""))
        // document.getElementById("footerConsole").innerText =  "Loading ferdig! " + requestType + " from " + resource + " i miljø: " + environment + " med "+ "satsTabeller: " + satsTabell.toString().replace("&sats=", "")
    }

}