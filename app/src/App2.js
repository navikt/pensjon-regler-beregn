import React, {useState} from "react";
import {HashRouter, Route, Routes, useParams} from "react-router-dom";
import LogFetcher from "./components/fetcher/LogFetcher";
import SatserDropDown from "./components/header/SatserDropDown";

export const CHOOSE_ENVIRONMENT = "Velg miljø";
export const LOCAL_ENVIRONMENT = "local";

export default function App2() {

    function LogFetcherWrapper() {
        const {id} = useParams();
        console.log("logFetcherWrapper id => ", id);
        return <LogFetcher id={id}/>
    };

    return (
        <div className="App">
            <div>
                <div className="header">
                    <div className="headTitle">Beregn Pensjon</div>
                    <div className="HeaderButton">
                        <SatserDropDown />
                    </div>
                    <div className="HeaderButton">

                    </div>
                </div>
                <div className="main-container">
                    <HashRouter>
                        <Routes>
                            <Route path="/:id" element={<LogFetcherWrapper/>}></Route>
                        </Routes>
                    </HashRouter>
                </div>
            </div>
        </div>
    )
}