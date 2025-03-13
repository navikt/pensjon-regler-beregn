import {useQuery} from "@tanstack/react-query"
import axios, {AxiosResponse} from "axios"
import {GuiModel, LogResponse} from "../domain/types"


interface ResponseData {
    metadata?: {
        status: string;
        info: string;
    };
}

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
    return response.data
}

const fetchGuiModel = async (body: string, clazzName: string, environment: string, sats: string): Promise<GuiModel> => {

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
        const env = environment.split("-").pop()
        url = `https://pensjon-regler-${env}.dev.adeo.no/api/${endpoint}?className=${clazzName}`
    }

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
    checkResponseForSoftErrors(response)
    return response.data as GuiModel
}

export const queryGuiModel = (body: string, clazzName: string, environment: string, sats: string) => useQuery({
    queryKey: ['guiModel', environment, sats],
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

function checkResponseForSoftErrors(response: AxiosResponse<ResponseData, GuiModel>) {

    if (response.status === 207 && response.data?.metadata?.status === "error") {
        throw new Error(response.data?.metadata?.info)
    }

}

