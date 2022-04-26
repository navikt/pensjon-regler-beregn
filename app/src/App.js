import { Route, Routes, HashRouter } from "react-router-dom";
import './App.css';
import React, {useEffect, useState, useRef, useCallback} from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router";

import Header from "./components/Header";
import HeaderButton from "./components/Small/HeaderButton";
import RequestPane from "./components/RequestPane";
import ResponsePane from "./components/ResponsePane";
import Footer from "./components/Footer";


   

var servicetype= 'BeregnAlderspensjon2011ForsteUttakRequest'; //http://localhost:3000/#/246355100/
//var servicetype = 'BeregnUforetrygdRequest'
var url = 'http://localhost:8080/api/beregn?requestType='+servicetype;
const d = require('./components/Testdata/RequestData.json');
//const d = require('./components/Testdata/RequestWithTree.json');







export default function App() {
  //API fetch constants
  const [result, setResult] = useState([]);
  const [isSending, setIsSending] = useState(false)
  const isMounted = useRef(true)

  function Request() {
    let {id} = useParams();
    return ( //Send request ID from url to component
        <RequestPane id = {id} request = {result.request}></RequestPane>
    );
  } 

  function Response() {
    console.log("Response called")
    console.log((result))
    return (
      <ResponsePane response = {result.response}></ResponsePane>
    );
  }

  // set isMounted to false when we unmount the component, usnure if neccessary
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

const fetchData = useCallback(async() => {
  if (isSending) return
  setIsSending(true)
  try {
    fetch(url, {
      method: 'POST',
      headers:  {
          'Content-Type':  'application/json',
          'accept': 'application/json',
          'X-pensjonregler-log': 'disabled'
      },
      body: JSON.stringify(d)
    })
    .then(response => response.json())
    .then(response => setResult(response));
    } catch(error) {
        console.log('Error:', error)
    }
    if (isMounted.current) // only update if we are still mounted
    setIsSending(false)
},[isSending])
  
  return (
    <div className = "App">

      <div>
        <div className="Header">
          <div className="HeaderTitle">Beregn Pensjon</div>
          <div className="HeaderButton"> Åpne </div>
          <div className="HeaderButton"> Sats </div>
          <div className="HeaderButton" disabled = {isSending} onClick = {fetchData}> Run </div>
        </div>
      </div>
      <div className = "main-container">
        <HashRouter>
          <Routes>
            <Route path="/:id" element={<Request />}></Route> {/* routing to enable us to read parameter from URL */}
          </Routes>
        </HashRouter>
        {<Response />}
      </div>
      <div className = "footer"><Footer></Footer></div>
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);