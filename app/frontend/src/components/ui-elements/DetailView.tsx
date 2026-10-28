import {Loader} from "@navikt/ds-react"
import {useGuiModel} from "../../api/service/Queries.ts"
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
    const environment = state.getEnvironment()
    const sats = state.getSats()

    useEffect(() => {
        query.invalidateQueries({queryKey: ["guiModel", environment, sats],})
    }, [query, environment, sats]);

    const metaData = JSON.parse(logResponse.metadata ?? '{}') as LogResponseMetadata;
    const body = JSON.parse(logResponse.json ?? '{}') as string;

    const {
        data,
        isError,
        isLoading,
        isSuccess,
        isFetching
    } = useGuiModel(body, metaData.className, state.getEnvironment(), state.getSats())

    const harTekniskFeil = data?.metadata?.status === "error"

    const {setDebugLog} = state

    useEffect(() => {
        if (isSuccess) {
            setDebugLog(data?.metadata?.debugLog || "")
        }
    }, [isSuccess, data, setDebugLog]);

    const responseError = harTekniskFeil
        ? {
            title: `${metaData?.className?.split(".").pop() ?? "Beregningen"} feilet i miljø: ${state.getEnvironment()}`,
            details: data?.metadata?.info || "Ukjent teknisk feil",
        }
        : undefined

    // Nettverksfeil/transportfeil har ingen data å vise frem, og kastes videre
    // til ErrorBoundary. Faglige/tekniske feil fra selve beregningen (status
    // "error" i metadata, HTTP 207) håndteres derimot under, slik at
    // grunnlaget (requesten) fortsatt vises til brukeren sammen med en
    // feilmelding.
    if (isError) {
        throw new Error(`Klarte ikke å hente data fra miljø ${state.getEnvironment()}`)
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
        <SplitView
            request={data?.request}
            response={data?.response}
            responseError={responseError}
            satstabell={state.getSats()}
            isFetching={isFetching}
        />
    )

}

export default DetailView
