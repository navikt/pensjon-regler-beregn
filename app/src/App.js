import { Route, Routes, HashRouter,useParams } from "react-router-dom";
import './App.css';
import React, {useEffect, useState, useRef, useCallback} from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header";
import HeaderButton from "./components/Small/HeaderButton";
import RequestPane from "./components/RequestPane";
import ResponsePane from "./components/ResponsePane";
import Footer from "./components/Footer";
import FindService from "./components/FindService";
import {Openfile} from "./components/Openfile";

//var servicetype= 'BeregnAlderspensjon2011ForsteUttakRequest'; //http://localhost:3000/#/246355100/
//var servicetype = 'RevurderingAlderspensjon2016Request'
//var url = 'http://localhost:8080/api/beregn?requestType='+servicetype;
//const d = require('./components/Testdata/RequestData.json');
//const d = require('./components/Testdata/RequestWithTree.json');

export default function App() {
  //API fetch constants
  const [metaData, setMetadata] = useState([]);
  const [serviceType, setServiceType] = useState("")
  const [environment, setEnvironment] = useState("");

  const [result, setResult] = useState([]);
  const [isSending, setIsSending] = useState(false)
  const [isFetched, setIsFetched] = useState(false)
  const isMounted = useRef(true)

  function FetchByLogID() {
    const {id} = useParams();
    let logUrl = 'https://pensjon-regler-logviewer-api.dev-fss.nais.io/api/log/'+id;
    console.log("fetched outer: "+isFetched)
    if (!isFetched){
    console.log("fetched inner: "+isFetched)
    const fetchLog = useCallback(async() => {
    console.log('fetching')
      try {
        fetch(logUrl, {
          method: 'GET',
          headers: {
            'Content-Type':  'application/json',
            'accept': 'application/json' 
          }
        })
        .then(response => response.json())
        .then(response => setMetadata(response))
        .then(() => setServiceType(metaData['method']))
        .then(() => setEnvironment(metaData['environment']))
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
        <RequestPane request = {result.request}></RequestPane>
    );
  } 

  function Response() {
    return (
      <ResponsePane response = {result.response}></ResponsePane>
    );
  }

// set isMounted to false when we unmount the component, unsure if neccessary
useEffect(() => {
  return () => {
    isMounted.current = false
  }
}, [])

const fetchGuiModel = useCallback(async() => {
  if (isSending) return
  setIsSending(true)
  let request = FindService(serviceType)
  //let url = 'http://localhost:8080/api/beregn?requestType='+request
  let url = 'https://pensjon-regler-q4.dev.adeo.no/api/beregn?requestType='+request
  let body = metaData['xml']
  console.log(body)
  try {
    fetch(url, {
      method: 'POST',
      headers:  {
          'Content-Type':  'application/json',
          'accept': 'application/json',
          'X-pensjonregler-log': 'disabled'
      },
      body: (body)
    })
    .then(response => response.json())
    .then(response => setResult(response));
    } catch(error) {
        console.log('Error:', error)
    }
    if (isMounted.current) // only update if we are still mounted
    setIsSending(false)
},[isSending, environment, serviceType])
  
  return (
    <div className = "App">

      <div>
        <div className="Header">
          <div className="HeaderTitle">Beregn Pensjon</div>
          <div className="HeaderButton"><Openfile></Openfile></div>
          <div className="HeaderButton"> Sats </div>
          <div className="HeaderButton" disabled = {isSending} onClick = {fetchGuiModel}> Run </div>
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
      <div className = "footer"><Footer></Footer></div>
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);