import { Route, Routes, HashRouter } from "react-router-dom";
import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router";

import Header from "./components/Header";
import RequestPane from "./components/RequestPane";
import ResponsePane from "./components/ResponsePane";
import Footer from "./components/Footer";

function Request() {
  let {id} = useParams();
  return ( //Send request ID from url to component
      <RequestPane id = {id}></RequestPane>
  );
}

export default function App() {
  return (
    <div className = "App">
      <div className = "header"><Header></Header></div>
      <div className = "main-container">
        <HashRouter>
          <Routes>
            <Route path="/:id" element={<Request />}></Route> {/* routing to enable us to read parameter from URL */}
          </Routes>
        </HashRouter>
        <ResponsePane></ResponsePane>
      </div>
      <div className = "footer"><Footer></Footer></div>
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);