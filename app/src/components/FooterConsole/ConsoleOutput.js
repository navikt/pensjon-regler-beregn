import React, {useEffect} from "react";
import {defaultSats} from "../Navigation/SatsDropdown";

export default function ConsoleOutput({ environment, satsTabell, requestType, fileName="",error, text, setFooter}) {

    if(text) {
        setFooter(text)
        // document.getElementById("footerConsole").innerText = text
    }
    else {
        let resource =""
        if(fileName) {
            resource = fileName
        }
        else
            resource = "logviewer"
        // if(!satsTabell|| satsTabell===defaultSats) {
        //     satsTabell = "defaultSats"
        // }
        if(error) {
            setFooter("")
            setFooter("Lasting "+ requestType + "("+ resource +")"+ " feil i miljø: " + environment + " med "+ "satsTabeller: " + satsTabell.toString().replace("&sats=", "")  + " med " +  error)
            // document.getElementById("footerConsole").innerText = "Loading error... " + error  + " med "+ requestType + " from " + resource +  " i miljø: " + environment + " med "+ "satsTabeller: " + satsTabell.toString().replace("&sats=", "")
            //clear the previous request and response
            document.getElementById("requestView").innerText=""
            document.getElementById("responseView").innerText=""
        }

        else {
            setFooter("")
            setFooter( "Lasting " + requestType + "("+ resource +")" + " ferdig i miljø: " + environment + " med "+ "satsTabeller: " + satsTabell.toString().replace("&sats=", ""))
            // document.getElementById("footerConsole").innerText =  "Loading ferdig! " + requestType + " from " + resource + " i miljø: " + environment + " med "+ "satsTabeller: " + satsTabell.toString().replace("&sats=", "")
        }
    }
}