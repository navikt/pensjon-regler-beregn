import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { LogResponse } from "../domain/LogResponse"
import { GuiModel } from "../domain/GuiModel"

const fetchByLogId = async (id: string): Promise<LogResponse> => {
    const response = await axios.get(`https://pensjon-regler-logviewer-api.dev.adeo.no/api/log/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    return response.data as LogResponse
}

const fetchSatsTabeller = async (): Promise<string[]> => {

    const response = await axios.get('https://pensjon-regler-q2.dev.adeo.no/alleSatstabeller', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    return response.data[1]
}

const fetchGuiModelByFile = async (body: string, clazzName: string, environment: string, sats: string): Promise<any> => {

    let url = ""
    let endpoint = ""

    if (!clazzName) {
        throw new Error("Missing className from content")
    }
    if (clazzName?.toString().includes("Request")) {
        endpoint = "beregn"
    } else if (clazzName?.toString().includes("Response")) {
        endpoint = "convertResponse"
    }

    if (!environment) {
        url = `https://pensjon-regler-q2.dev.adeo.no/api/${endpoint}?className=${clazzName}`
    } else if (environment === "local") {
        url = `http://localhost:8080/api/${endpoint}?className=${clazzName}`
    } else {
        url = `https://pensjon-regler-${environment}.dev.adeo.no/api/${endpoint}?className=${clazzName}`
    }
    console.log(url)

    if (sats) {
        url += `&sats=${sats}`
    }

    const response = await axios.post(url,
        body,
        {
            headers: {
                'Content-Type': 'application/xml',
                'Accept': 'application/json',
            }
        })
    console.log("from fetchGuiModelByFile => ", response.data)
    return response.data as GuiModel


}

const fetchGuiModel = async (body: string, clazzName: string, environment: string, sats: string): Promise<any> => {
    let url = ""
    let endpoint = ""

    if (!clazzName) {
        throw new Error("Missing className from content")
    }
    if (clazzName?.toString().includes("Request")) {
        endpoint = "beregn"
    } else if (clazzName?.toString().includes("Response")) {
        endpoint = "convertResponse"
    }

    if (!environment) {
        url = `https://pensjon-regler-q2.dev.adeo.no/api/${endpoint}?className=${clazzName}`
    } else if (environment === "local") {
        url = `http://localhost:8080/api/${endpoint}?className=${clazzName}`
    } else {
        url = `https://pensjon-regler-${environment}.dev.adeo.no/api/${endpoint}?className=${clazzName}`
    }
    console.log(url)

    if (sats) {
        url += `&sats=${sats}`
    }


    const response = await axios.post(url,
        body,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    console.log("from fetchGuiModel => ", response.data)
    return response.data as GuiModel
}

export const queryGuiModelByFile = (body: string, clazzName: string, environment: string, sats: string) => useQuery({
    queryKey: ['guiModelFile', clazzName, environment, sats],
    queryFn: () => fetchGuiModelByFile(body, clazzName, environment, sats),
    throwOnError: true,
})

export const queryGuiModel = (body: string, clazzName: string, environment: string, sats: string) => useQuery({
    queryKey: ['guiModel', clazzName, environment, sats],
    queryFn: () => fetchGuiModel(body, clazzName, environment, sats),
    throwOnError: true,
})

export const queryLogResponseById = (id: string) => useQuery({
    queryKey: ['logResponseById', id],
    queryFn: () => fetchByLogId(id),
    throwOnError: false,
})

export const querySatstabeller = () => useQuery({
    queryKey: ['satsTabeller'],
    queryFn: () => fetchSatsTabeller(),
    throwOnError: false,
})
