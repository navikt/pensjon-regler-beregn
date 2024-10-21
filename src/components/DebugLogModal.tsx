import {Button, CopyButton, InternalHeader, Modal} from "@navikt/ds-react";
import React, {useEffect} from "react";
import {LinkIcon, ThumbUpIcon} from "@navikt/aksel-icons";
import {useGlobalState} from "../store";

const DebugLogModal: React.FC = () => {

    const state = useGlobalState()
    const [showDebugLog, setShowDebugLog] = React.useState(true);
    const [windowSize] = React.useState([window.innerWidth, window.innerHeight]);
    const ref = React.useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (state.getDebugLog() !== "") {
            setShowDebugLog(false)
        } else {
            setShowDebugLog(true)
        }
    }, [state.getDebugLog()])


    return (
        <>
            <InternalHeader.Button as="button" disabled={showDebugLog}
                                   className={showDebugLog ? "disable-regel-logg" : ""} onClick={() => {
                ref.current?.showModal()
            }}>Vis regel-logg</InternalHeader.Button>
            <Modal ref={ref} header={{heading: "Regel-logg"}} width={`${windowSize[0] - 100}`}>
                <Modal.Body>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <pre>
                            <code>
                                {state.getDebugLog()}
                            </code>
                        </pre>
                    </div>

                </Modal.Body>
                <Modal.Footer >
                    <CopyButton
                                copyText={state.getDebugLog()}
                                icon={<LinkIcon aria-hidden/>}
                                activeIcon={<ThumbUpIcon aria-hidden/>}
                                variant={"action"}
                                type={"button"}
                                text="Kopier til utklippstavle"
                                activeText="Innholdet ble kopiert!"
                    />
                    <Button variant="secondary" type="button" onClick={() => ref.current?.close()}>
                        Lukk logg
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DebugLogModal