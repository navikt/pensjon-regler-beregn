import {Loader} from "@navikt/ds-react"
import {queryGuiModel} from "../api/service/Queries"
import {LogResponse} from "../api/domain/LogResponse"
import {Metadata} from "../api/domain/Metadata"
import ResponsePane from "./ResponsePane"
import RequestPane from "./RequestPane"
import {currentConsolelog, currentDebugLog, currentEnvironment, currentSats} from "../signal/Signals"
import {batch} from "@preact/signals-react"
import {useEffect} from "react";
import {useQueryClient} from "@tanstack/react-query";


interface DetailViewProps {
    logResponse: LogResponse
}

const DetailView: React.FC<DetailViewProps> = ({ logResponse}) => {

    const query = useQueryClient()
    useEffect(() => {
        query.invalidateQueries({queryKey: ["guiModel"]})
    }, [currentEnvironment.value, currentSats.value]);

    const bruktSats = currentSats.value ? currentSats.value : "Sats fra miljø"
    const metaData = JSON.parse(logResponse.metadata) as Metadata
    const body = JSON.parse(logResponse.xml) as string
    const { data, isError, isLoading, isSuccess, isFetching } = queryGuiModel(body, metaData.className)


    if (isError) {
        throw new Error(`Klarte ikke å hente data fra miljø ${currentEnvironment.value} med sats ${bruktSats}`)
    }

    if (isLoading) {
        return <Loader size="3xlarge" title="Laster ..." className="loader" />;
    }

    if (isSuccess) {
        const clazzName = metaData?.className?.split(".").pop()
        batch(() => {
            currentConsolelog.value = `${clazzName} har kjørt ferdig i miljø: ${currentEnvironment.value} - med sats: ${bruktSats}`
            currentDebugLog.value = data?.metadata?.debugLog || ""
        })
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
                <ResponsePane response={data?.response} satstabell={currentSats.value} isFetching={isFetching}/>
            </div>
        </div>
    )

}

export default DetailView