import {useQuery} from "@tanstack/react-query"
import axios, {AxiosResponse} from "axios"
import {GuiModel, LogResponse} from "@pensjon/domain"

interface ResponseData {
    metadata?: {
        status: string;
        info: string;
    };
}


const fetchByLogId = async (id: string): Promise<LogResponse> => {

    const response = await axios.get(`/api/log/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    return response.data as LogResponse;
};

const fetchSatsTabeller = async (env: string): Promise<string[]> => {

    const response = await axios.get(`/api/${env}/alleSatstabeller`, {
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
        throw new Error("className mangler på forespørselen")
    }
    if (clazzName?.toString().includes("Request")) {
        endpoint = "beregn"
    } else if (clazzName?.toString().includes("Response")) {
        endpoint = "convertResponse"
    }

    if (!environment) {
        url = `/api/${endpoint}?className=${clazzName}`

    } else {
        url = `/api/${environment}/${endpoint}?className=${clazzName}`
    }
    console.log("Queries.body:", body)

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

export const querySatstabeller = (env: string) => useQuery({
    queryKey: ['satsTabeller'],
    queryFn: () => fetchSatsTabeller(env),
    throwOnError: false,
})

function checkResponseForSoftErrors(response: AxiosResponse<ResponseData, GuiModel>) {
    if (response.status === 207 && response.data?.metadata?.status === "error") {
        throw new Error(response.data?.metadata?.info)
    }
}
