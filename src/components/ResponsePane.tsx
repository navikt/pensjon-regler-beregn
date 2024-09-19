import { JsonParser } from "../tsguielement/JsonParser"
import {useEffect} from "react";
import {GuiModel} from "../api/domain/types/guimodel.ts";

interface ResponsePaneProps {
    data: GuiModel | undefined
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
                <JsonParser data={data?.response[0]} isFetching={isFetching}></JsonParser>
            </div>
        </div>
    )
}

export default ResponsePane