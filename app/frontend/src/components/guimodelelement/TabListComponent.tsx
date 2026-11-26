import React, {useId, useRef, useState} from "react";
import {Tabs} from "@navikt/ds-react";
import {Position, TabListElement} from "@pensjon/domain";
import {JsonParser} from "./JsonParser.tsx";

export interface TabListProps {
    tabs: TabListElement;
}

const tabLabel = (name: string | undefined, index: number) => name?.trim() || `Fane ${index + 1}`;

const SideTabs = ({tabs}: TabListProps) => {
    const [selected, setSelected] = useState(0);
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const idPrefix = useId();

    const onKeyDown = (event: React.KeyboardEvent, index: number) => {
        const delta = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
        if (!delta) return;
        event.preventDefault();
        const next = (index + delta + tabs.data.length) % tabs.data.length;
        setSelected(next);
        buttons.current[next]?.focus();
    };

    return (
        <div className="side-tabs">
            <div role="tablist" aria-orientation="vertical" aria-label={tabs.name} className="side-tabs-list">
                {tabs.data.map((tab, index) => (
                    <button key={index}
                            ref={(el) => {
                                buttons.current[index] = el;
                            }}
                            type="button"
                            role="tab"
                            id={`${idPrefix}-tab-${index}`}
                            aria-selected={selected === index}
                            aria-controls={`${idPrefix}-panel-${index}`}
                            tabIndex={selected === index ? 0 : -1}
                            className="side-tab"
                            onClick={() => setSelected(index)}
                            onKeyDown={(event) => onKeyDown(event, index)}>
                        {tabLabel(tab.name, index)}
                    </button>
                ))}
            </div>
            {tabs.data.map((tab, index) => (
                <div key={index}
                     role="tabpanel"
                     id={`${idPrefix}-panel-${index}`}
                     aria-labelledby={`${idPrefix}-tab-${index}`}
                     hidden={selected !== index}
                     className="side-tabs-panel">
                    {selected === index && <JsonParser data={tab.data}/>}
                </div>
            ))}
        </div>
    );
};

export function TabListComponent({tabs}: TabListProps): React.ReactElement {
    if (tabs.position === Position.SIDE) return <SideTabs tabs={tabs}/>;

    return (
        <Tabs defaultValue="0" size="small" className="gui-tabs">
            <Tabs.List>
                {tabs.data.map((tab, index) => <Tabs.Tab key={index} value={String(index)} label={tabLabel(tab.name, index)}/>)}
            </Tabs.List>
            {tabs.data.map((tab, index) => (
                <Tabs.Panel key={index} value={String(index)} className="gui-tabs-panel">
                    <JsonParser data={tab.data}/>
                </Tabs.Panel>
            ))}
        </Tabs>
    );
}
