import { JsonParser } from "./guielements/JsonParser"

interface ResponsePaneProps {
    response: any[]
    satstabell: string
}
const ResponsePane: React.FC<ResponsePaneProps> = ({ response, satstabell }) => {

    return (
        <div className="ResponsePane">
            <div className="headerContainer">
                <div>
                    <h2>Resultat {satstabell}</h2>
                </div>
            </div>
            <div id="responseView">
                <JsonParser data={response} />
            </div>
        </div>
    )
}

export default ResponsePane