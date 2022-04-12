import {Tab} from './Tab';
import React, {useEffect, useState} from "react";
import {JsonParser} from './JsonParser';
import { Tabs } from '@navikt/ds-react';

export function TabList(props){
    
    let [tabs] = useState(props.tabs);
    const [value, setValue] = useState(props.tabs['name'])

    function log(){
    console.log("Inside TabList")
    console.log(tabs)
    }
return(
    /*<div class = "TabList">
        <p>{log()}</p>
        This is a tablist
        
        Here are my tabs:
        {tabs['data'].map((data,key) => {
            return(
                <JsonParser data = {data}/>
            )})}
    </div>*/
    <>
    <Tabs value = {value} onChange={setValue}>
        {log()}
        <Tabs.List>
            {tabs['data'][1].map((data,key) => {
                return (
                    <JsonParser data = {data}></JsonParser>
                )
            })}
        </Tabs.List>
    </Tabs>

    </>
);

}


/*
const [value, setValue] = useState("skap");
return (
  <>
    <Tabs value={value} onChange={setValue}>
      <Tabs.List>
        <Tabs.Tab
          value="skap"
          label="Skap"
          id="skap-tab"
          aria-controls="skap-panel"
        />
        <Tabs.Tab
          value="oppvaskmaskin"
          label="Oppvaskmaskin"
          id="oppvaskmaskin-tab"
          aria-controls="oppvaskmaskin-panel"
        />
        <Tabs.Tab
          value="fryser"
          label="Fryser"
          id="fryser-tab"
          aria-controls="fryser-panel"
        />
      </Tabs.List>
    </Tabs>
    <div
      role="tabpanel"
      hidden={value !== "skap"}
      aria-labelledby="skap-tab"
      id="skap-panel"
      tabIndex={0}
    >
      Innhold skap
    </div>
    <div
      role="tabpanel"
      hidden={value !== "oppvaskmaskin"}
      aria-labelledby="oppvaskmaskin-tab"
      id="oppvaskmaskin-panel"
      tabIndex={0}
    >
      Innhold oppvaskmaskin
    </div>
    <div
      role="tabpanel"
      hidden={value !== "fryser"}
      aria-labelledby="fryser-tab"
      id="fryser-panel"
      tabIndex={0}
    >
      Innhold fryser
    </div>
  </>
);*/