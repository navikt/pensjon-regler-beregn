import {HashRouter, Route, Routes, useParams} from "react-router-dom";
import './App.css';
import React, {useCallback, useState} from "react";
import ReactDOM from "react-dom";
import Split from "react-split"

// noinspection ES6UnusedImports
import Header from "./components/Header";
import RequestPane from "./components/RequestPane";
import ResponsePane from "./components/ResponsePane";
import Footer from "./components/Footer";
import SatsDropdown from "./components/Navigation/SatsDropdown";
import Openfile from "./components/Navigation/Openfile";
import Run from "./components/Navigation/Run";
import Bruksanvisning from "./components/Navigation/Bruksanvisning";
import EnvironmentsDropdown from "./components/Navigation/EnvironmentsDropdown";
import FetchGUIModel from "./components/Navigation/FetchGUIModel";

import Loading from "./components/Navigation/Loading";
import WarningToast from "./components/WarningToast";

export default function App() {

    //API fetch constants
    const [metaData, setMetadata] = useState([]);
    const [environment, setEnvironment] = useState("");
    const [satsTabell, setSatsTabell] = useState("");
    const [logResponse, setLogResponse] = useState([])

    const [result, setResult] = useState([]);
    const [body, setBody] = useState([]);
    const [name, setName] = useState([]);
    const [fileName, setFileName] = useState([]);
    const [isFetched, setIsFetched] = useState(false)
    const [isGUIModelFetched, setIsGUIModelFetched] = useState(false)
    // const [detailView, setDetailView] = useState("")
    const [footer, setFooter] = useState("")
    let contentType = 'application/json'

    const [isLoading, setIsLoading] = useState(false)

    const [showWarning, setShowWarning] = useState(false)

    function FetchByLogID() {
        const {id} = useParams();
        let logUrl = 'https://pensjon-regler-logviewer-api.dev.adeo.no/api/log/' + id;
        if (!isFetched) {
            const fetchLog = useCallback(async () => {
                try {
                    setIsLoading(true)
                    fetch(logUrl, {
                        method: 'GET',
                        headers: {
                            'Content-Type': contentType,
                            'accept': contentType
                        }
                    })
                        .then(response => response.json())
                        .then(response => {
                            setIsLoading(false)
                            setLogResponse(response)
                        })
                        .then(() => {
                            if(logResponse['metadata']==undefined)
                                throw new Error("retry connecting")
                            setMetadata(JSON.parse(logResponse['metadata']))
                        })
                        .then(() => setEnvironment(logResponse['environment']))
                        .then(() => setBody(logResponse['xml']))
                        .then(() => setName(metaData['className']))
                        .then(() => setIsFetched(true))
                } catch (error) {
                    console.log('Error:', error)
                }
            })

            fetchLog();

        }
        if (isFetched) {
            if (!isGUIModelFetched) {
                const fetchGUIModel = useCallback(async () => {
                    let className = name
                    let onResultChange = setResult
                    FetchGUIModel({
                        body,
                        className,
                        environment,
                        satsTabell,
                        onResultChange,
                        contentType,
                        setFooter,
                        setIsGUIModelFetched,
                        setIsLoading
                    })
                })
                fetchGUIModel()
            }
        }
        return (
            <div>
            </div>
        )
    }

    function Request() {
        if (isLoading) {
            return <div/>
        }
        return ( //Send request ID from url to component
            <RequestPane props={result.request}></RequestPane>
        );
    }

    function Response() {
        if (isLoading) {
            return <Loading/>
        }
        if (result.hasOwnProperty('response')) {
            const satser = result.metadata['bruktSats'] ? " - " + result.metadata['bruktSats'] : ""
            return <ResponsePane props={result.response} satstabell={satser}></ResponsePane>
        } else {
            return <ResponsePane props={result} satstabell={result}> </ResponsePane>
        }
    }

    return (
        <div>
            <WarningToast footer={footer} showWarning={showWarning} setShowWarning = {setShowWarning} ></WarningToast>
            <div className="App">
                <div>
                    <div className="Header">
                        <div className="HeaderTitle">Beregn Pensjon</div>
                        <div className="HeaderButton"><EnvironmentsDropdown
                            environmentsChanger={setEnvironment} satsTabell={satsTabell} onResultChange={setResult}
                            setFooter={setFooter} setIsGUIModelFetched = {setIsGUIModelFetched} setIsLoading = {setIsLoading} setShowWarning = {setShowWarning} body={body} name={name} fileName = {fileName}></EnvironmentsDropdown>
                        </div>
                        <div className="HeaderButton"><SatsDropdown tabellChanger={setSatsTabell}
                                                                    onResultChange={setResult}
                                                                    environment={environment} setFooter={setFooter} setIsGUIModelFetched = {setIsGUIModelFetched} setIsLoading = {setIsLoading} setShowWarning = {setShowWarning} body={body} name={name} fileName = {fileName}></SatsDropdown></div>
                        <div className="HeaderButton"><Openfile satsTabell={satsTabell} onResultChange={setResult}
                                                                environment={environment} setFooter={setFooter} setIsGUIModelFetched = {setIsGUIModelFetched} setIsLoading = {setIsLoading} setShowWarning = {setShowWarning} setBody = {setBody} setName = {setName} setFileName = {setFileName}></Openfile>
                        </div>
                        {/*<div className="HeaderButton"><Run name={name} body={body} environment={environment}*/}
                        {/*                                   satsTabell={satsTabell} onResultChange={setResult}*/}
                        {/*                                   contentType={'application/json'} setFooter={setFooter} setIsGUIModelFetched = {setIsGUIModelFetched} setIsLoading = {setIsLoading} setShowWarning = {setShowWarning}/></div>*/}
                        <div className="HeaderButton">
                            <Bruksanvisning/>
                        </div>
                    </div>
                </div>
                <Split
                    sizes={[80, 20]} gutterSize={15} dragInterval={15} direction="vertical" cursor="row-resize"
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
                    {/*<div className="detailView"><DetailView footer={footer}></DetailView></div>*/}
                    <div className="footerConsole"><Footer footer={footer}></Footer></div>
                </Split>
            </div>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
