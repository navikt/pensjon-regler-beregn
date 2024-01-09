import { Button, CopyButton, InternalHeader, Modal } from "@navikt/ds-react";
import React, { useEffect } from "react";
import { currentDebugLog } from "../signal/Signals";
import { LinkIcon, ThumbUpIcon } from "@navikt/aksel-icons";

const DebugLogModal: React.FC = () => {

    const [showDebugLog, setShowDebugLog] = React.useState(true);
    const [windowSize] = React.useState([window.innerWidth, window.innerHeight]);
    const ref = React.useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (currentDebugLog.value !== "") {
            setShowDebugLog(false)
        } else {
            setShowDebugLog(true)
        }
    }, [currentDebugLog.value])



    return (
        <>
            <InternalHeader.Button as="button" disabled={showDebugLog} className={showDebugLog ? "disable-regel-logg": ""} onClick={() => { ref.current?.showModal() }}>Vis regel-logg</InternalHeader.Button>
            <Modal ref={ref} header={{ heading: "Regel-logg" }} width={`${windowSize[0] - 100}`}>
                <Modal.Body>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <pre>
                            <code>
                                {currentDebugLog.value}
                            </code>
                        </pre>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <CopyButton style={{ backgroundColor: "black" }}
                        copyText={currentDebugLog.value}
                        icon={<LinkIcon aria-hidden />}
                        activeIcon={<ThumbUpIcon aria-hidden />}
                        text="Kopier til utklippstavle"
                        activeText="Kopierte til utklippstavle"
                    />

                    <Button variant="secondary" type="button" onClick={() => ref.current?.close()}>
                        Lukk
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DebugLogModal