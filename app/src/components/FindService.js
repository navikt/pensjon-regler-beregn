import { useState } from "react"

export default function FindService(fetchedMethod) {

    fetchedMethod = fetchedMethod.replace("/api/","") //remove '/api/' from string
    let serviceName = ""

    //special cases TODO fill in rest
    if(fetchedMethod === 'beregnSamletEktefellepensjon') {
        fetchedMethod = 'samletEktefellepensjon'
    } else if (fetchedMethod === 'faktoromregnBeregninger') {
        fetchedMethod = 'faktoromregnBeregningBatch'
    } else if (fetchedMethod === 'fastsettTrygdetid') {
        fetchedMethod = 'trygdetid'
    }

    serviceName = fetchedMethod.charAt(0).toUpperCase() + fetchedMethod.slice(1)+'Request'
    return serviceName
}