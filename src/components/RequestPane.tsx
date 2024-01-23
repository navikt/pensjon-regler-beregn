import { JsonParser } from "./guielements/JsonParser"


interface RequestProps {
    request: string[]
}
const RequestPane: React.FC<RequestProps> = ({ request }) => {

    return (
        !!request &&
        <div className="RequestPane">
            <div className="headerContainer">
                <div>
                    <h2>Grunnlag</h2>
                </div>
            </div>
            <div id="requestView">
                <JsonParser data={request} />
            </div>
        </div>
    )
}

export default RequestPane
