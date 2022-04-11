import React, {useEffect, useState} from "react";

export function Table(props){
    let [table] = useState(props.table)

    function log(){
        console.log("Inside table")
    }
    return (
        <div>
            {log()}
            I'm a table: {table['name']}
        </div>
    )
}