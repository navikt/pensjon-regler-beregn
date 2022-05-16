import React from "react";

export default function FetchGUIModel({body, className, environment, satsTabell, onResultChange, contentType}) {

    // let url = 'http://localhost:8080/api/beregn?className='+className+ satsTabell
    let url = 'https://'+environment+'.dev.adeo.no/api/beregn?className='+className+satsTabell
    console.log("url", url)
    try {
        fetch(url, {
            method: 'POST',
            headers:  {
                'Content-Type':  contentType,
                'accept': 'application/json',
                'X-pensjonregler-log': 'disabled'
            },
            body: (body)
        })
            .then(response => response.json())
            .then(response => onResultChange(response));
    } catch(error) {
        console.log('Error:', error)
    }

}