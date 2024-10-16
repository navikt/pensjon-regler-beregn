import { JsonParser } from "./tsguielement/JsonParser"
import {useEffect} from "react";
import {DataElement} from "../api/domain/types/guimodelx.ts";


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
                {data && <JsonParser data={data} isFetching={isFetching}></JsonParser>}
            </div>
        </div>
    )
}

export default ResponsePane