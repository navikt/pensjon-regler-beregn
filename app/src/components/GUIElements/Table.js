import React, {useEffect, useState} from "react";

export function Table(props){
    let [table] = useState(props.table)

    return (
        <div>
            I'm a table: {table['name']}
        </div>
    )
}