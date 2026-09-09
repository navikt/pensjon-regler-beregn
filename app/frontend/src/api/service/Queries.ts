import {useQuery} from "@tanstack/react-query"
import axios from "axios"
import {GuiModel, LogResponse} from "@pensjon/domain"
import environments from "../../components/constants/Environments.ts";

const LOCAL_URL = "http://localhost:8080";
const isLocal = (env: string) => env === "local";
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

  const url = isLocal(environment)
    ? `${LOCAL_URL}/alleSatstabeller`
    : `/api/${environment}/alleSatstabeller`;

  const response = await axios.get(url, {
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

  let url = isLocal(env)
    ? `${LOCAL_URL}/api/${endpoint}?className=${encodeURIComponent(clazzName)}`
    : `/api/${env}/${endpoint}?className=${encodeURIComponent(clazzName)}`

  if (sats) url += `&sats=${encodeURIComponent(sats)}`

  const response = await axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })

  // Status 207 betyr at backend feilet (faglig eller teknisk) under selve
  // beregningen, men GuiModel inneholder likevel grunnlaget (requesten) som
  // ble sendt inn, samt en feilmelding i metadata. Dette skal vises til
  // brukeren i stedet for å kastes bort, se DetailView.tsx.
  return response.data as GuiModel
}

export const queryGuiModel = (body: string, clazzName: string, environment: string, sats: string) => useQuery({
    queryKey: ['guiModel', environment, sats],
    queryFn: () => fetchGuiModel(body, clazzName, environment, sats),
    throwOnError: true,
    // Feil fra /api/beregn er deterministiske (samme grunnlag gir samme feil),
    // så automatiske forsøk på nytt hjelper ikke og gjør bare at brukeren
    // venter unødvendig lenge på en spinner før feilen vises.
    retry: false,
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
