import {useLocation} from "react-router-dom"
import {queryGuiModelByFile} from "../api/service/Queries"
import {Loader} from "@navikt/ds-react"
import RequestPane from "./RequestPane"
import ResponsePane from "./ResponsePane"
import ConsoleLog from "./ConsoleLog"
import {useQueryClient} from "@tanstack/react-query";
import {useGlobalState} from "../store";
import {useEffect} from "react";

const DetailViewFile: React.FC = () => {

    const state = useGlobalState()
    const location = useLocation()
    const query = useQueryClient()

    const body = location.state?.body
    const filename = location.state?.filename
    const clazzName = location.state?.clazzname

    const { data, isError, isLoading, isSuccess, isFetching } = queryGuiModelByFile(body, clazzName, state.getEnvironment(), state.getSats())

    useEffect(() => {
        query.invalidateQueries({queryKey: ["guiModelFile", state.getEnvironment(), state.getSats(), body, clazzName]})
    }, [state.getEnvironment(), state.getSats(), state.getFile()]);

    if (isError) {
        throw new Error(`Klarte ikke å hente data fra miljø ${state.getEnvironment()} med sats ${state.getSats() ? state.getSats() : "sats fra miljø"} for fil ${filename}`)
    }

    if (isLoading) {
        state.setDebugLog("")
        state.setConsoleLog("")
        return <Loader size="3xlarge" title="Laster ..." className="loader" />;
    }

    if (isSuccess) {
        state.setConsoleLog(`${clazzName?.split(".").pop()} har kjørt ferdig i miljø: ${state.getEnvironment()} - med sats: ${state.getSats() ? state.getSats() : "sats fra miljø"} - for fil: ${filename}`)
        state.setDebugLog(data?.metadata?.debugLog || "")
    }

    if (isFetching) {
        return <Loader size="3xlarge" title="Laster ..." className="loader" />;
    }

    return (
        <>
            <div className="detailcontainer">
                <div id="requestview">
                    <RequestPane data={data?.request} isFetching={isFetching}/>
                </div>
                <div id="responseview">
                    <ResponsePane data={data?.response} satstabell={state.getSats()} isFetching={isFetching} />
                </div>
            </div>
            <ConsoleLog />
        </>
    )

}

export default DetailViewFile