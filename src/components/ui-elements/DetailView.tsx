import {Loader} from "@navikt/ds-react"
import {queryGuiModel} from "../../api/service/Queries.ts"
import {LogResponse} from "../../api/domain/types"
import {Metadata} from "../../api/domain/types"
import ResponsePane from "./ResponsePane.tsx"
import RequestPane from "./RequestPane.tsx"
import { useEffect, useState } from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useGlobalState} from "../../store";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {getResponseFormat} from "../../util/ClusterUrl.ts";


interface DetailViewProps {
    logResponse: LogResponse
}

const DetailView: React.FC<DetailViewProps> = ({logResponse}) => {

    const state = useGlobalState()
    const query = useQueryClient()

    useEffect(() => {
        query.invalidateQueries({queryKey: ["guiModel", state.getEnvironment(), state.getSats()],})
    }, [state.getEnvironment(), state.getSats()]);

    const [responseFormat, setResponseFormat] = useState<'xml' | 'json'>('json');
    useEffect(() => {
        getResponseFormat().then(setResponseFormat);
    }, []);

    const bruktSats = state.getSats() ?? "Sats fra miljø";
    const metaData = JSON.parse(logResponse.metadata) as Metadata
    console.log("responseFormat:", responseFormat);
    console.log("logResponse.json:", logResponse.json);
    console.log("logResponse.xml:", logResponse.xml);
    let body: any;
    if (responseFormat === 'json') {
        body = JSON.parse(logResponse.json) as string;
    } else {
        body = JSON.parse(logResponse.xml) as string;
    }
    console.log("body: ", body)
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
        return <Loader size="3xlarge" title="Laster ..." className="loader"/>;
    }

    if (isFetching) {
        return <Loader size="3xlarge" title="Laster ..." className="loader"/>;
    }

    return (
        <div className="detailcontainer">
            <PanelGroup direction={"horizontal"} className={"panel_resizegroup"}>
                <Panel defaultSize={50}>
                    <div id="requestview">
                        <RequestPane data={data?.request} isFetching={isFetching}/>
                    </div>
                </Panel>
                <PanelResizeHandle className="panel_resize" />
                <Panel defaultSize={50}>
                    <div id="responseview">
                        <ResponsePane data={data?.response} satstabell={state.getSats()} isFetching={isFetching}/>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    )

}

export default DetailView