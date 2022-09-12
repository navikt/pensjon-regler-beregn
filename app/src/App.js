import {HashRouter, Route, Routes, useParams} from "react-router-dom";
import './App.css';
import React, {useCallback, useState} from "react";
import ReactDOM from "react-dom";
import Split from "react-split"

import Header from "./components/Header";
import RequestPane from "./components/RequestPane";
import ResponsePane from "./components/ResponsePane";
import Footer from "./components/Footer";
import SatsDropdown from "./components/Navigation/SatsDropdown";
import Openfile from "./components/Navigation/Openfile";
import Run from "./components/Navigation/Run";
import Bruksanvisning from "./components/Navigation/Bruksanvisning";
import EnvironmentsDropdown from "./components/Navigation/EnvironmentsDropdown";
import * as ReactDOMClient from "react-dom/client";
//import { logger } from "./Logger";
//import { setUpErrorReporting } from '@navikt/frontendlogger';

export default function App() {

    //API fetch constants
    const [metaData, setMetadata] = useState([]);
    const [environment, setEnvironment] = useState("");
    const [satsTabell, setSatsTabell] = useState("");
    const [logResponse, setLogResponse] = useState([])

    const [result, setResult] = useState([]);
    const [body, setBody] = useState([]);
    const [name, setName] = useState([]);
    const [isFetched, setIsFetched] = useState(false)
    const [footer, setFooter] = useState("")

    function FetchByLogID() {
        const {id} = useParams();
        let logUrl = 'https://pensjon-regler-logviewer-api.dev-fss.nais.io/api/log/' + id;
        if (!isFetched) {
            const fetchLog = useCallback(async () => {
                try {
                    fetch(logUrl, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'accept': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(response => setLogResponse(response))
                        .then(() => setMetadata(JSON.parse(logResponse['metadata'])))
                        .then(() => setEnvironment(logResponse['environment']))
                        .then(() => setBody(logResponse['xml']))
                        .then(() => {setName(metaData['className'])})
                        .then(() => setIsFetched(true))
                } catch (error) {
                    console.log('Error:', error)
                }
            })
            fetchLog();

        }
        return (
            <div>
            </div>
        )
    }

    function Request() {
        return ( //Send request ID from url to component
            <RequestPane props={result.request}></RequestPane>
        );
    }

    function Response() {
        if(result.hasOwnProperty('response')) {
            console.log("Metadata")
            console.log(result.metadata)
            console.log("bruktSats")
            console.log(result.metadata['bruktSats'])
            const satser = result.metadata['bruktSats'] ? " - " + result.metadata['bruktSats'] : ""
            return <ResponsePane props={result.response} satstabell={satser}></ResponsePane>
        } else {
            return <ResponsePane props={result} satstabell={result}> </ResponsePane>
        }
    }

    return (
        <div className="App">

            <div>
                <div className="Header">
                    <div className="HeaderTitle">Beregn Pensjon</div>
                    <div className="HeaderButton"><EnvironmentsDropdown environmentsChanger={setEnvironment}></EnvironmentsDropdown>
                    </div>
                    <div className="HeaderButton"><SatsDropdown tabellChanger={setSatsTabell} onSetFooter={setFooter}></SatsDropdown></div>
                    <div className="HeaderButton"><Openfile satsTabell={satsTabell} onResultChange={setResult}
                                                            environment={environment} setFooter={setFooter}></Openfile></div>
                    <div className="HeaderButton"><Run name={name} body={body} environment={environment}
                                                       satsTabell={satsTabell} onResultChange={setResult}
                                                       contentType={'application/json'} setFooter={setFooter}/></div>
                    <div className="HeaderButton">
                        <Bruksanvisning/>
                    </div>
                </div>
            </div>
            <Split
                sizes={[85, 15]} gutterSize={15} dragInterval={15} direction="vertical" cursor="row-resize"
                style={{height: `calc(100vh)`}}>
                <div className="main-container">
                    <HashRouter>
                        <Routes>
                            <Route path="/:id" element={
                                <FetchByLogID/>}></Route> {/* routing to enable us to read parameter from URL */}
                        </Routes>
                    </HashRouter>
                    {<Request/>}
                    {<Response/>}
                </div>
                <div className="footerConsole"><Footer footer={footer}></Footer></div>
            </Split>
        </div>
    );
}

// const container = document.getElementById('root');
//
// const root = ReactDOMClient.createRoot(container);
// root.render(<App/>)
const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
