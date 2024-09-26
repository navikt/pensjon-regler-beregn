import React, {useState} from "react";
import {JsonParser} from "./JsonParser.tsx";
import {Tabs} from '@navikt/ds-react';
import './CSS/TabList.css'
import {Position, TabList} from "../../api/domain/types/guimodel.ts";

export interface TabListProps {
    tabs: TabList;
}

export function TabListComponent(props: TabListProps): React.ReactElement {

    const [tabs] = useState(props.tabs);
    const position = tabs.position;
    const [value, setValue] = useState(tabs.children[0].name + "0")

    switch (position) {
        case Position.TOP:
            return (
                <>
                    <Tabs value={value} onChange={setValue} size="small">
                        <Tabs.List>
                            {tabs.children.map((tab, key) => { //Creating header buttons for each TabComponent
                                return (
                                    <Tabs.Tab as={"button"}
                                              style={{
                                                  backgroundColor: value === tab.name + key ? "white" : "#a8a1a6",
                                                  borderLeft: '1px solid grey',
                                                  borderRight: '1px solid grey',
                                                  borderTop: '1px solid grey',
                                                  borderBottom: value === tab.name + key ? "" : "1px solid grey",
                                                  borderRadius: '10px 10px 1px 1px',
                                                  width: '200px',
                                                  height: '50px',
                                                  overflow: 'hidden'
                                              }}

                                              value={tab.name + key}
                                              label={tab.name + key}
                                              key={key}
                                              id={tab.name + '-tab'} //Creating references from header button to tab content
                                              aria-controls={tab.name + '-panel'}
                                    >
                                        {tab.name}
                                    </Tabs.Tab>
                                )
                            })}
                        </Tabs.List>
                    </Tabs>
                    {tabs.children.map((tab, key) => { //Creating div for each tab with reference to header button
                        return (
                            <div
                                role="tabpanel"
                                hidden={value !== tab.name + key}
                                aria-labelledby={tab.name + '-tab'}
                                key={key}
                                id={tab.name + '-panel'}
                            >
                                <JsonParser data={tab.data}/> {/*Sending tab content back to parser function*/}
                            </div>
                        )
                    })}
                </>
            );
        case Position.SIDE:
            return (
                <div className='sidetab-container'>
                    <div className="sidetab-menu-container">
                        {tabs.children.map((tab, key) => {
                            return (
                                <div
                                    className="sidetab-button"
                                    onClick={() => setValue(tab.name + key)}
                                    style={{
                                        backgroundColor: value === tab.name + key ? "white" : "#a8a1a6",
                                        borderBottom: value === tab.name + key ? "" : "1px solid grey",
                                        color: value === tab.name + key ? "black" : "grey"
                                    }}
                                    key={key}
                                    id={tab.name + '-tab'} //Creating references from header button to tab content
                                    aria-controls={tab.name + '-panel'}
                                >
                                    {tab.name}
                                </div>
                            )
                        })}
                    </div>
                    <div className='sidetab-content-container'>
                        {tabs.children.map((tab, key) => {
                            return (
                                <div
                                    role="tabpanel"
                                    hidden={value !== tab.name + key}
                                    aria-labelledby={tab.name + '-tab'}
                                    key={key}
                                    id={tab.name + '-panel'}>
                                    <JsonParser
                                        data={tab.data}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            );
        default:
            throw new Error("Unsupported position")
    }
}