import {Loader} from "@navikt/ds-react"
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

    useEffect(() => {
        if (isSuccess) {
            const clazzName = metaData?.className?.split(".").pop()
            state.setConsoleLog(`${clazzName} har kjørt ferdig i miljø: ${state.getEnvironment()} - med sats: ${bruktSats}`)
            state.setDebugLog(data?.metadata?.debugLog || "")
        }
    }, [isSuccess, data, metaData, state, bruktSats]);

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
        <SplitView
            request={data?.request}
            response={data?.response}
            satstabell={state.getSats()}
            isFetching={isFetching}
        />
    )

}

export default DetailView
