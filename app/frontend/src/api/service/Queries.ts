import {keepPreviousData, useQuery} from "@tanstack/react-query"
import axios from "axios"
import {GuiModel, LogResponse} from "@pensjon/domain"
import environments from "../../components/constants/Environments.ts";
import {isMockMode, mockDelay, mockGuiModelAsync, mockLogResponse, mockSatsTabeller} from "./mockData.ts";

const LOCAL_URL = "http://localhost:8080";
const JSON_HEADERS = {"Content-Type": "application/json", Accept: "application/json"};
const isLocal = (env: string) => env === "local";
const ensureEnv = (env?: string) => (env && env.trim().length > 0 ? env.trim() : environments[1]);

const fetchByLogId = async (id: string): Promise<LogResponse> => {
    if (isMockMode) return mockDelay(mockLogResponse(id));
    const response = await axios.get(`/api/log/${id}`, {headers: JSON_HEADERS});
    return response.data as LogResponse;
};

const fetchSatsTabeller = async (env: string): Promise<string[]> => {
    if (isMockMode) return mockDelay(mockSatsTabeller, 150);
    const environment = ensureEnv(env);
    const url = isLocal(environment)
        ? `${LOCAL_URL}/alleSatstabeller`
        : `/api/${environment}/alleSatstabeller`;
    const response = await axios.get(url, {headers: JSON_HEADERS})
    return response.data
}

const fetchGuiModel = async (id: string, body: unknown, clazzName: string, environment: string, sats: string): Promise<GuiModel> => {
    if (!clazzName) throw new Error("className mangler på forespørselen")
    const env = ensureEnv(environment);
    if (isMockMode) return mockDelay(await mockGuiModelAsync(id, clazzName, env, sats), 700);

    let endpoint = ""
    if (clazzName.includes("Request")) endpoint = "beregn"
    else if (clazzName.includes("Response")) endpoint = "convertResponse"

    let url = isLocal(env)
        ? `${LOCAL_URL}/api/${endpoint}?className=${encodeURIComponent(clazzName)}`
        : `/api/${env}/${endpoint}?className=${encodeURIComponent(clazzName)}`
    if (sats) url += `&sats=${encodeURIComponent(sats)}`

    const response = await axios.post(url, body, {headers: JSON_HEADERS})

    // Status 207 betyr at backend feilet (faglig eller teknisk) under selve
    // beregningen, men GuiModel inneholder likevel grunnlaget (requesten) som
    // ble sendt inn, samt en feilmelding i metadata. Dette vises til brukeren
    // i stedet for å kastes bort, se BeregnPage.tsx.
    return response.data as GuiModel
}

export const useGuiModel = (id: string, body: unknown, clazzName: string | undefined, environment: string, sats: string) => useQuery({
    queryKey: ['guiModel', id, environment, sats],
    queryFn: () => fetchGuiModel(id, body, clazzName ?? "", environment, sats),
    enabled: !!clazzName,
    placeholderData: keepPreviousData,
    // Feil fra /api/beregn er deterministiske (samme grunnlag gir samme feil),
    // så automatiske forsøk på nytt hjelper ikke og gjør bare at brukeren
    // venter unødvendig lenge før feilen vises.
    retry: false,
})

export const useLogResponseById = (id: string) => useQuery({
    queryKey: ['logResponseById', id],
    queryFn: () => fetchByLogId(id),
})

export const useSatstabeller = (env: string) => useQuery({
    queryKey: ['satsTabeller', ensureEnv(env)],
    queryFn: () => fetchSatsTabeller(env),
})
