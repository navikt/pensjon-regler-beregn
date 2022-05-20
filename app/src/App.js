import { Route, Routes, HashRouter,useParams } from "react-router-dom";
import './App.css';
import React, {useEffect, useState, useRef, useCallback} from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header";
import RequestPane from "./components/RequestPane";
import ResponsePane from "./components/ResponsePane";
import Footer from "./components/Footer";
import SatsDropdown from "./components/Small/SatsDropdown";
import Openfile from "./components/Small/Openfile";
import Run from "./components/Small/Run";
import EnvironmentsDropdown from "./components/Small/EnvironmentsDropdown";


export default function App() {
  //API fetch constants
  const [metaData, setMetadata] = useState([]);
  const [environment, setEnvironment] = useState("");
  const [satsTabell,setSatsTabell] = useState("");
  const [logResponse, setLogResponse] = useState([])

  const [result, setResult] = useState([]);
  const [body, setBody] = useState([]);
  const [name, setName] = useState([]);
  const [isFetched, setIsFetched] = useState(false)


  function FetchByLogID() {
    const {id} = useParams();
    let logUrl = 'https://pensjon-regler-logviewer-api.dev-fss.nais.io/api/log/'+id;
    if (!isFetched){
    const fetchLog = useCallback(async() => {
      try {
        fetch(logUrl, {
          method: 'GET',
          headers: {
            'Content-Type':  'application/json',
            'accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(response => setLogResponse(response))
        .then(() => setMetadata(JSON.parse(logResponse['metadata'])))
        .then(() => setEnvironment(logResponse['environment']))
        .then(() => setBody(logResponse['xml']))
        .then(() => setName(metaData['className']))
        .then(() => setIsFetched(true))
      } catch(error) {
        console.log('Error:',error)
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
        <RequestPane request = {result.request} name = {name}></RequestPane>
    );
  }

  function Response() {
    return (
      <ResponsePane response = {result.response}></ResponsePane>
    );
  }

  return (
    <div className = "App">

      <div>
        <div className="Header">
          <div className="HeaderTitle">Beregn Pensjon</div>
          <div className="HeaderButton"> <EnvironmentsDropdown environmentsChanger = {setEnvironment}  innitialEnvironment={environment}></EnvironmentsDropdown></div>
          <div className="HeaderButton"> <SatsDropdown tabellChanger = {setSatsTabell}></SatsDropdown></div>
          <div className="HeaderButton"><Openfile satsTabell={satsTabell} onResultChange={setResult} environment={environment}></Openfile></div>
          <div className="HeaderButton"><Run  name = {name} body={body} environment={environment} satsTabell={satsTabell} onResultChange={setResult} contentType={'application/json'}/></div>
          {/*<div className="HeaderSpace"></div>*/}
          {/*<div className="HeaderEnvironment"><p>Nåværende Miljø:</p><p id="insertEnvironment">{{environment}?"-NA-":{environment}}</p></div>*/}
        </div>
      </div>
      <div className = "main-container">
        <HashRouter>
          <Routes>
            <Route path="/:id" element = {<FetchByLogID/>}></Route> {/* routing to enable us to read parameter from URL */}
          </Routes>
        </HashRouter>
        {<Request />}
        {<Response />}
      </div>
      <div className = "footeConsole"><Footer></Footer></div>
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
