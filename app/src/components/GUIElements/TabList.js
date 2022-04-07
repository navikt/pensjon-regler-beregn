import {Tab} from './Tab';
import React, {useEffect, useState} from "react";

export function TabList(props){
    
    let [tabs] = useState(props.tabs);

    function log(){
    console.log("Inside TabList")
    console.log(tabs)
    }
return(
    <div class = "TabList">
        <p>{log()}</p>
        {tabs['data'][1].map((data,key) => {
            return(
                <div>
                This is a tablist
                Here are my tabs:
                <Tab data = {data}></Tab>
                </div>
            )})}
    </div>
);

}
