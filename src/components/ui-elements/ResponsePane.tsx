import { JsonParser } from "../guimodelelement/JsonParser.tsx"
import {useEffect} from "react";
import {DataElement} from "../../api/domain/types";


interface ResponsePaneProps {
    data: DataElement[] | undefined
    satstabell: string
    isFetching: boolean
}
const ResponsePane: React.FC<ResponsePaneProps> = ({ data, satstabell, isFetching }) => {

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
                {data && <JsonParser data={data}></JsonParser>}
            </div>
        </div>
    )
}

export default ResponsePane