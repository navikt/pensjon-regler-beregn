import { JsonParser } from "../guimodelelement/JsonParser.tsx"
import {useEffect} from "react";
import {Alert} from "@navikt/ds-react";
import {DataElement} from "@pensjon/domain";

export interface ResponseError {
    title: string
    details: string
}

interface ResponsePaneProps {
    data: DataElement[] | undefined
    error?: ResponseError
    satstabell: string
    isFetching: boolean
}
const ResponsePane: React.FC<ResponsePaneProps> = ({ data, error, satstabell, isFetching }) => {

    useEffect(() => {
    }, [isFetching]);

    return (
        !isFetching &&
        <div className="ResponsePane">
            <div className="headerContainer">
                <div>
                    <h2>Resultat {satstabell}</h2>
                </div>
            </div>
            <div id="responseView">
                {error &&
                    <div className="responseError">
                        <Alert variant="error" size="small">{error.title}</Alert>
                        <pre className="responseErrorDetails">{error.details}</pre>
                    </div>
                }
                {data && <JsonParser data={data}></JsonParser>}
            </div>
        </div>
    )
}

export default ResponsePane