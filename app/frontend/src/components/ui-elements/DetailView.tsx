import {Alert, Loader} from "@navikt/ds-react"
import {queryGuiModel} from "../../api/service/Queries.ts"
import {LogResponse, LogResponseMetadata} from "@pensjon/domain";
import SplitView from "./SplitView.tsx"
import {useEffect} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useGlobalState} from "../../store/index.ts";

interface DetailViewProps {
    logResponse: LogResponse
}

const DetailView: React.FC<DetailViewProps> = ({logResponse}) => {

    const state = useGlobalState()
    const query = useQueryClient()

    useEffect(() => {
        query.invalidateQueries({queryKey: ["guiModel", state.getEnvironment(), state.getSats()],})
    }, [state.getEnvironment(), state.getSats()]);

    const bruktSats = state.getSats() ?? "Sats fra miljø";

    const metaData = JSON.parse(logResponse.metadata ?? '{}') as LogResponseMetadata;
    const body = JSON.parse(logResponse.json ?? '{}') as string;

    const {
        data,
        isError,
        isLoading,
        isSuccess,
        isFetching
    } = queryGuiModel(body, metaData.className, state.getEnvironment(), state.getSats())

    const harTekniskFeil = data?.metadata?.status === "error"

    useEffect(() => {
        if (isSuccess) {
            const clazzName = metaData?.className?.split(".").pop()
            if (harTekniskFeil) {
                state.setConsoleLog(`${clazzName} feilet i miljø: ${state.getEnvironment()} - med sats: ${bruktSats}`)
            } else {
                state.setConsoleLog(`${clazzName} har kjørt ferdig i miljø: ${state.getEnvironment()} - med sats: ${bruktSats}`)
            }
            state.setDebugLog(data?.metadata?.debugLog || "")
        }
    }, [isSuccess, data, metaData, state, bruktSats, harTekniskFeil]);

    // Nettverksfeil/transportfeil har ingen data å vise frem, og kastes videre
    // til ErrorBoundary. Faglige/tekniske feil fra selve beregningen (status
    // "error" i metadata, HTTP 207) håndteres derimot under, slik at
    // grunnlaget (requesten) fortsatt vises til brukeren sammen med en
    // feilmelding.
    if (isError) {
        throw new Error(`Klarte ikke å hente data fra miljø ${state.getEnvironment()} med sats ${bruktSats}`)
    }

    if (isLoading) {
        return (
            <div className="loader-container">
                <Loader size="3xlarge" title="Laster ..." />
            </div>
        );
    }

    if (isFetching) {
        return (
            <div className="loader-container">
                <Loader size="3xlarge" title="Laster ..." />
            </div>
        );
    }

    return (
        <>
            {harTekniskFeil &&
                <Alert variant="error" size="small" className="guiModelErrorAlert">
                    Beregningen feilet: {data?.metadata?.info || "Ukjent teknisk feil"}. Grunnlaget vises likevel under.
                </Alert>
            }
            <SplitView
                request={data?.request}
                response={data?.response}
                satstabell={state.getSats()}
                isFetching={isFetching}
            />
        </>
    )

}

export default DetailView
