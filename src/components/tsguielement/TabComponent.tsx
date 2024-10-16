import {useState} from "react";
import {JsonParser} from "./JsonParser.tsx";
import {TabElement,} from "../../api/domain/types/guimodelx.ts";

interface TabProps {
    tab: TabElement;
}

export const TabComponent = (tabProps: TabProps)  =>{
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