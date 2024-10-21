import React, {useState} from "react";
import {JsonParser} from "./JsonParser.tsx";
import {Tabs} from '@navikt/ds-react';
import './CSS/TabList.css'
import {Position, TableElement, TabListElement} from "../../api/domain/types/guimodel.ts";

export interface TabListProps {
    tabs: TabListElement;
}

export function TabListComponent(props: TabListProps): React.ReactElement {

    const [tabs] = useState(props.tabs);
    const position = tabs.position;
    const [value, setValue] = useState(tabs?.data[0]?.name)
    const [sideTabValue, setSideTabValue] = useState(tabs?.data[0]?.name + '0');

    const onHandleChange = (newValue: string) => {
        setValue(newValue);
        setSideTabValue(tabs?.data[0]?.name + '0');
    }

    switch (position) {
        case Position.TOP:
            return (
                <>
                    <Tabs value={value} onChange={onHandleChange} size="small">
                        <Tabs.List>
                            {tabs.data.map((tab, key) => {

                                return (
                                    <Tabs.Tab as={"button"}
                                              style={{
                                                  backgroundColor: value === tab.name? "white" : "#a8a1a6",
                                                  borderLeft: '1px solid grey',
                                                  borderRight: '1px solid grey',
                                                  borderTop: '1px solid grey',
                                                  borderBottom: value === tab.name? "" : "1px solid grey",
                                                  borderRadius: '10px 10px 1px 1px',
                                                  width: '200px',
                                                  height: '50px',
                                                  overflow: 'hidden'
                                              }}

                                              value={tab.name}
                                              label={tab.name}
                                              key={tab.name + key}
                                              id={tab.name + '-tab'}
                                              aria-controls={tab.name + '-panel'}
                                    >
                                        {tab.name}
                                    </Tabs.Tab>
                                )
                            })}
                        </Tabs.List>
                    </Tabs>
                    {tabs.data.map((tab, key) => {

                        return (
                            <div
                                role="tabpanel"
                                hidden={value !== tab.name}
                                aria-labelledby={tab.name + '-tab'}
                                key={tab.name + key}
                                id={tab.name + key}
                            >
                                <JsonParser data={tab.data as TableElement[]} key={tab.name + key}/>
                            </div>
                        )
                    })}
                </>
            );
        case Position.SIDE:
            return (
                <div className='sidetab-container'>
                    <div className="sidetab-menu-container">
                        {tabs.data.map((tab, key) => {
                            return (
                                <div
                                    className="sidetab-button"
                                    onClick={() => setSideTabValue(tab.name + key)}
                                    style={{
                                        backgroundColor: sideTabValue === tab.name + key ? "white" : "#a8a1a6",
                                        borderBottom: sideTabValue === tab.name + key ? "" : "1px solid grey",
                                        color: sideTabValue === tab.name + key ? "black" : "lightslategrey",
                                    }}
                                    key={tab.name + key}
                                    id={tab.name + key}
                                    aria-controls={tab.name + '-panel'}
                                >
                                    <span className="sidetab-button-text">{tab.name}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className='sidetab-content-container'>
                        {tabs.data.map((tab, key) => {
                            return (
                                <div
                                    role="tabpanel"
                                    hidden={sideTabValue !== tab.name + key}
                                    aria-labelledby={tab.name + '-tab'}
                                    key={tab.name + key}
                                    id={tab.name + key}>
                                    <JsonParser
                                        data={tab.data as TableElement[]} key={tab.name+key}/>
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