import {Alert, Button, CopyButton, Heading, Modal} from "@navikt/ds-react";
import React, {ErrorInfo, ReactNode, useRef} from "react";
import {LinkIcon, ThumbUpIcon} from "@navikt/aksel-icons";


interface FallbackProps {
    error: Error;
    errorInfo: ErrorInfo;
}

const ErrorFallback: React.FC<FallbackProps> = ({error}): ReactNode => {

    const ref = useRef<HTMLDialogElement>(null)
    const [windowSize] = React.useState([window.innerWidth, window.innerHeight]);

    const defaultErrorHeading = "Oops! En feil har oppstått 😵‍💫😵"

    if (error.toString().length > 150) {

        return (
            <div>
                <Modal ref={ref} open={true} width={`${windowSize[0] - 100}`}>
                    <Modal.Header>
                        <Alert variant="error">{defaultErrorHeading}</Alert>
                    </Modal.Header>
                    <Modal.Body>
                        <details style={{whiteSpace: 'pre-wrap'}} open={true}>
                            <summary>Detaljert feilmelding</summary>
                            <br/>
                            {error.toString()}
                        </details>
                    </Modal.Body>
                    <Modal.Footer>
                        <CopyButton className={"copyButton"}
                                    copyText={error.toString()}
                                    text="Kopier feilmelding"
                                    activeText="Kopierte feilmelding"
                                    icon={<LinkIcon aria-hidden/>}
                                    activeIcon={<ThumbUpIcon aria-hidden/>}
                        />
                        <Button type="button" onClick={() => ref.current?.close()}>
                            Lukk
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    return (
        <div>
            <Alert variant="error" style={{}}>
                <Heading spacing size={"small"} level={"3"}>
                    {defaultErrorHeading}
                </Heading>
                {error.toString()}
            </Alert>
        </div>
    )
}

export default ErrorFallback
