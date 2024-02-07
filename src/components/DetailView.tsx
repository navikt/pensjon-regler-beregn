import {Loader} from "@navikt/ds-react"
import {queryGuiModel} from "../api/service/Queries"
import {LogResponse} from "../api/domain/LogResponse"
import {Metadata} from "../api/domain/Metadata"
import ResponsePane from "./ResponsePane"
import RequestPane from "./RequestPane"
import {useEffect} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useGlobalState} from "../store";


interface DetailViewProps {
    logResponse: LogResponse
}

const DetailView: React.FC<DetailViewProps> = ({ logResponse}) => {

    const state = useGlobalState()
    const query = useQueryClient()

    useEffect(() => {
        query.invalidateQueries({queryKey: ["guiModel", state.getEnvironment(), state.getSats()],})
    }, [state.getEnvironment(), state.getSats()]);

    const bruktSats = state.getSats() ? state.getSats() : "Sats fra miljø"
    const metaData = JSON.parse(logResponse.metadata) as Metadata
    const body = JSON.parse(logResponse.xml) as string
    const { data, isError, isLoading, isSuccess, isFetching } = queryGuiModel(body, metaData.className, state.getEnvironment(), state.getSats())


    if (isError) {
        throw new Error(`Klarte ikke å hente data fra miljø ${state.getEnvironment()} med sats ${bruktSats}`)
    }

    if (isLoading) {
        return <Loader size="3xlarge" title="Laster ..." className="loader" />;
    }

    if (isSuccess) {
        const clazzName = metaData?.className?.split(".").pop()
        state.setConsoleLog(`${clazzName} har kjørt ferdig i miljø: ${state.getEnvironment()} - med sats: ${bruktSats}`)
        state.setDebugLog(data?.metadata?.debugLog || "")
    }

    if (isFetching) {
        return <Loader size="3xlarge" title="Laster ..." className="loader" />;
    }

    return (
        <div className="detailcontainer">
            <div id="requestview">
                <RequestPane request={data?.request} isFetching={isFetching} />
            </div>
            <div id="responseview">
                <ResponsePane response={data?.response} satstabell={state.getSats()} isFetching={isFetching}/>
            </div>
        </div>
    )

}

export default DetailView