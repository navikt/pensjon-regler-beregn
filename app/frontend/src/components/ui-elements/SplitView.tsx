import {ToggleGroup} from "@navikt/ds-react"
import {useState} from "react";
import {Panel, Group, Separator} from "react-resizable-panels";
import {DataElement} from "@pensjon/domain";
import ResponsePane from "./ResponsePane.tsx"
import RequestPane from "./RequestPane.tsx"

export type ViewMode = "split" | "request" | "response"

interface SplitViewProps {
    request: DataElement[] | undefined
    response: DataElement[] | undefined
    satstabell: string
    isFetching: boolean
}

const SplitView: React.FC<SplitViewProps> = ({request, response, satstabell, isFetching}) => {

    const [viewMode, setViewMode] = useState<ViewMode>("split")

    return (
        <div className="detailcontainer">
            <div className="viewModeToggle">
                <ToggleGroup
                    size="small"
                    value={viewMode}
                    onChange={(value) => setViewMode(value as ViewMode)}
                    label="Visningsmodus"
                >
                    <ToggleGroup.Item value="split" label="Delt visning" />
                    <ToggleGroup.Item value="request" label="Grunnlag" />
                    <ToggleGroup.Item value="response" label="Resultat" />
                </ToggleGroup>
            </div>
            <div className="detailcontent">
                {viewMode === "split" &&
                    <Group orientation={"horizontal"} className={"panel_resizegroup"}>
                        <Panel defaultSize={50}>
                            <div id="requestview">
                                <RequestPane data={request} isFetching={isFetching}/>
                            </div>
                        </Panel>
                        <Separator className="panel_resize" />
                        <Panel defaultSize={50}>
                            <div id="responseview">
                                <ResponsePane data={response} satstabell={satstabell} isFetching={isFetching}/>
                            </div>
                        </Panel>
                    </Group>
                }
                {viewMode === "request" &&
                    <div id="requestview" className="fullPaneView">
                        <RequestPane data={request} isFetching={isFetching}/>
                    </div>
                }
                {viewMode === "response" &&
                    <div id="responseview" className="fullPaneView">
                        <ResponsePane data={response} satstabell={satstabell} isFetching={isFetching}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default SplitView
