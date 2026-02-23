import {Loader} from "@navikt/ds-react"
import {queryGuiModel} from "../../api/service/Queries.ts"
import {LogResponse, LogResponseMetadata} from "@pensjon/domain";
import ResponsePane from "./ResponsePane.tsx"
import RequestPane from "./RequestPane.tsx"
import {useEffect} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useGlobalState} from "../../store/index.ts";
import {Panel, Group, Separator} from "react-resizable-panels";


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
        return <Loader size="3xlarge" title="Laster ..." className="loader"/>;
    }

    if (isFetching) {
        return <Loader size="3xlarge" title="Laster ..." className="loader"/>;
    }

    return (
        <div className="detailcontainer">
            <Group orientation={"horizontal"} className={"panel_resizegroup"}>
                <Panel defaultSize={50}>
                    <div id="requestview">
                        <RequestPane data={data?.request} isFetching={isFetching}/>
                    </div>
                </Panel>
                <Separator className="panel_resize" />
                <Panel defaultSize={50}>
                    <div id="responseview">
                        <ResponsePane data={data?.response} satstabell={state.getSats()} isFetching={isFetching}/>
                    </div>
                </Panel>
            </Group>
        </div>
    )

}

export default DetailView