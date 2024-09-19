import {useState} from "react";
import {JsonParser} from "./../../tsguielement/JsonParser.tsx";
import {Tab} from "../../api/domain/types/guimodel.ts";

interface TabProps {
    tab: Tab;
}

export function Tab(tabProps: TabProps) {
    const [tab] = useState(tabProps.tab);


    return (
        <div>
            {tab.data.map((element, key) => {
                return (
                    <div
                        key={key}
                    >
                        <JsonParser data={element}></JsonParser>
                    </div>
                )
            })}
        </div>
    )

}