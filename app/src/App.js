import { Route, Routes, HashRouter } from "react-router-dom";
import './App.css';
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router";

import Header from "./components/Header";
import HeaderButton from "./components/Small/HeaderButton";
import RequestPane from "./components/RequestPane";
import ResponsePane from "./components/ResponsePane";
import Footer from "./components/Footer";


   

var servicetype= 'BeregnOpptjeningRequest';
var url = 'http://localhost:8080/api/beregn?requestType='+servicetype;
const d = require('./components/Testdata/RequestData.json');







export default function App() {
  const [result, setResult] = useState([]);

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

 useEffect(() => {
    const fetchData = async() => {
        try {
            fetch(url, {
                method: 'POST',
                headers:  {
                    'Content-Type':  'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(d)
                })
            .then(response => response.json())
            .then(response => setResult(response));
        } catch(error) {
            console.log('Error:', error)
    }
  };
  fetchData();
  }, []);
  return (
    <div className = "App">
      <div>
        <div className="Header">
          <div className="HeaderTitle">Beregn Pensjon</div>
          <HeaderButton text = {"Åpne"}></HeaderButton>
          <HeaderButton text = {"Sats"}></HeaderButton>
          <HeaderButton text = {"Run"}></HeaderButton>
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