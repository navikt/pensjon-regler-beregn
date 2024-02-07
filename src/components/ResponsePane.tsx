import { JsonParser } from "./guielements/JsonParser"
import {useEffect} from "react";

interface ResponsePaneProps {
    response: any[]
    satstabell: string
    isFetching: boolean
}
const ResponsePane: React.FC<ResponsePaneProps> = ({ response, satstabell, isFetching }) => {

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
                <JsonParser data={response} isFetching={isFetching}/>
            </div>
        </div>
    )
}

export default ResponsePane