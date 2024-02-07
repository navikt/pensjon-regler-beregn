import { JsonParser } from "./guielements/JsonParser"
import {useEffect} from "react";


interface RequestProps {
    request: string[]
    isFetching: boolean
}
const RequestPane: React.FC<RequestProps> = ({ request,isFetching }) => {

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
                <JsonParser data={request} isFetching={isFetching} />
            </div>
        </div>
    )
}

export default RequestPane
