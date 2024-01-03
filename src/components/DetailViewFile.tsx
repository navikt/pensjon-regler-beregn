import { useLocation } from "react-router-dom"
import { currentConsolelog, currentDebugLog, currentEnvironment, currentSats } from "../signal/Signals"
import { queryGuiModelByFile } from "../api/service/Queries"
import { batch } from "@preact/signals-react"
import { Loader } from "@navikt/ds-react"
import RequestPane from "./RequestPane"
import ResponsePane from "./ResponsePane"
import ConsoleLog from "./ConsoleLog"

const DetailViewFile: React.FC = () => {

    const location = useLocation()

    const body = location.state?.body
    const filename = location.state?.filename
    const clazzName = location.state?.clazzname

    const bruktSats = currentSats.value ? currentSats.value : "Sats fra miljø"
    const environment = currentEnvironment.value

    const { data, isError, isLoading, isSuccess } = queryGuiModelByFile(body, clazzName, environment, currentSats.value)

    if (isError) {
        throw new Error(`Klarte ikke å hente data fra miljø ${environment} med sats ${bruktSats} for fil ${filename}`)
    }

    if (isLoading) {
        batch(() => {
            currentDebugLog.value = ""
            currentConsolelog.value = ""
        })
        return <Loader size="3xlarge" title="Laster ..." className="loader" />;
    }

    if (isSuccess) {

        batch(() => {
            currentConsolelog.value = `${clazzName?.split(".").pop()} har kjørt ferdig i miljø: ${environment} - med sats: ${bruktSats} - for fil: ${filename}`
            currentDebugLog.value = data?.metadata?.debugLog || ""
        })
    }

    return (
        isSuccess &&
        <>
            <div className="detailcontainer">
                <div id="requestview">
                    {data?.request &&
                        <RequestPane request={data?.request} />}
                </div>
                <div id="responseview">
                    {data?.response &&
                        <ResponsePane response={data?.response} satstabell={currentSats.value} />}
                </div>
            </div>
            <ConsoleLog />
        </>
    )

}

export default DetailViewFile