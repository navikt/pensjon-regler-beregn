import { Loader } from "@navikt/ds-react"
import { queryGuiModel } from "../api/service/Queries"
import { LogResponse } from "../api/domain/LogResponse"
import { Metadata } from "../api/domain/Metadata"
import ResponsePane from "./ResponsePane"
import RequestPane from "./RequestPane"
import { currentConsolelog, currentDebugLog } from "../signal/Signals"
import { batch } from "@preact/signals-react"



interface DetailViewProps {
    logResponse: LogResponse
    environment: string
    sats: string
}

const DetailView: React.FC<DetailViewProps> = ({ logResponse, environment, sats }) => {


    const bruktSats = sats ? sats : "Sats fra miljø"
    const metaData = JSON.parse(logResponse.metadata) as Metadata
    const body = JSON.parse(logResponse.xml) as string
    const { data, isError, isLoading, isSuccess } = queryGuiModel(body, metaData.className, environment, sats)


    if (isError) {
        throw new Error(`Klarte ikke å hente data fra miljø ${environment} med sats ${bruktSats}`)
    }

    if (isLoading) {
        batch(() => {
            currentDebugLog.value = ""
            currentConsolelog.value = ""
        })
        return <Loader size="3xlarge" title="Laster ..." className="loader" />;
    }

    if (isSuccess) {
        const clazzName = metaData?.className?.split(".").pop()
        batch(() => {
            currentConsolelog.value = `${clazzName} har kjørt ferdig i miljø: ${environment} - med sats: ${bruktSats}`
            currentDebugLog.value = data?.metadata?.debugLog || ""
        })
    }

    return (
        !!isSuccess &&
        <div className="detailcontainer">
            <div id="requestview">
                {data?.request &&
                    <RequestPane request={data?.request} />}
            </div>
            <div id="responseview">
                {data?.response &&
                    <ResponsePane response={data?.response} satstabell={sats} />}
            </div>
        </div>
    )

}

export default DetailView