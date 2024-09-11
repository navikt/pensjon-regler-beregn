import React, {useState} from "react";
import {JsonParser} from "./JsonParser";

export function Tab(props) {
    let [tab] = useState(props.tab);

    return (
        <div>
            {tab['data'].map((data, key) => {
                return (
                    <div
                        key={key}
                    >
                        <JsonParser data={data}></JsonParser>
                    </div>
                )
            })}
        </div>
    )

}