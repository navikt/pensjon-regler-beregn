import { JsonParser } from "../guimodelelement/JsonParser.tsx"
import {useEffect} from "react";
import {DataElement} from "@pensjon/domain";


interface RequestProps {
    data: DataElement[] | undefined
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
                {data && <JsonParser data={data} />}
            </div>
        </div>
    )
}

export default RequestPane
