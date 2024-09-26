import { JsonParser } from "./tsguielement/JsonParser"
import {useEffect} from "react";
import { GuiModel } from "../api/domain/types/guimodel.ts";


interface RequestProps {
    data: GuiModel | undefined
    isFetching: boolean
}
const RequestPane: React.FC<RequestProps> = ({ data,isFetching }) => {

    useEffect(() => {
    }, [isFetching]);

    return (
        !isFetching &&
        <div className="RequestPane">
            <div className="headerContainer">
                <div>
                    <h2>Grunnlag</h2>
                </div>
            </div>
            <div id="requestView">
                <JsonParser data={data?.request[0]} isFetching={isFetching} />
            </div>
        </div>
    )
}

export default RequestPane
