import {useQuery} from "@tanstack/react-query"
import axios, {AxiosResponse} from "axios"
import {GuiModel, LogResponse} from "@pensjon/domain"
import environments from "../../components/constants/Environments.ts";

interface ResponseData {
    metadata?: {
        status: string;
        info: string;
    };
}

const ensureEnv = (env?: string) => (env && env.trim().length > 0 ? env.trim() : environments[1]);

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
  const environment = ensureEnv(env);
  console.log(`Henter satstabeller fra miljø: ${environment}`);
  const response = await axios.get(`/api/${environment}/alleSatstabeller`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  return response.data
}

const fetchGuiModel = async (body: string, clazzName: string, environment: string, sats: string): Promise<GuiModel> => {
  let endpoint = ""

  if (!clazzName) throw new Error("className mangler på forespørselen")
  if (clazzName.toString().includes("Request")) endpoint = "beregn"
  else if (clazzName.toString().includes("Response")) endpoint = "convertResponse"

  const env = ensureEnv(environment);

  // Always include env segment to match BFF routes (/api/:env/...)
  let url = `/api/${env}/${endpoint}?className=${encodeURIComponent(clazzName)}`

  if (sats) url += `&sats=${encodeURIComponent(sats)}`

  const response = await axios.post(url, body, {
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
  queryKey: ['satsTabeller', ensureEnv(env)],
  queryFn: () => fetchSatsTabeller(env),
  throwOnError: false,
})

function checkResponseForSoftErrors(response: AxiosResponse<ResponseData, GuiModel>) {
    if (response.status === 207 && response.data?.metadata?.status === "error") {
        throw new Error(response.data?.metadata?.info)
    }
}
