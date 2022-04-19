import {Tab} from './Tab';
import React, {useEffect, useState} from "react";
import {JsonParser} from './JsonParser';
import { Tabs } from '@navikt/ds-react';
import {Nav} from 'react-bootstrap'

export function TabList(props){
    
    let [tabs] = useState(props.tabs);
    const [value, setValue] = useState(props.tabs['name'])

    function log(){
    console.log("Inside TabList")
    console.log(tabs)
    }
    if(tabs['position'] == "TOP") {
        return(
            <>
                <Tabs value = {value} onChange={setValue}> {/* notat til etter påske, dele opp Tab headers inne i Tab.List og Tab content etter Tab.list slik at
                det ikke ødelegger CSS*/}
                    {log()}
                    <Tabs.List>
                        {tabs['data'][1].map((data,key) => {
                            return (
                                <Tabs.Tab
                                    value = {data['name']}
                                    label = {data['name']}
                                    id = {data['name'] + '-tab'}
                                    aria-controls = {data['name'] + '-panel'}
                                    >
                                </Tabs.Tab>
                            )
                        })}
                    </Tabs.List>
                </Tabs>
                {tabs['data'][1].map((data,key) => {
                  return (
                    <div
                    role = "tabpanel"
                    hidden = {value !== data['name'] }
                    aria-labelledby = {data['name'] + '-tab'}
                    id = {data['name'] + '-panel'}
                    tabIndex = {0}
                    >
                      <JsonParser data = {data}></JsonParser>
                      </div>
                  )
                })}
            </>
        );
    } else if(tabs['position'] == "SIDE") {
        return(
            <Nav defaultActiveKey="/home" className="flex-column">
                                        {tabs['data'][1].map((data,key) => {
                            return (
                                <JsonParser data = {data}></JsonParser>
                            )
                        })}
            </Nav>
        );
    }

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