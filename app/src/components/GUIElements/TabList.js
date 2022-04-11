import {Tab} from './Tab';
import React, {useEffect, useState} from "react";
import {JsonParser} from './JsonParser';

export function TabList(props){
    
    let [tabs] = useState(props.tabs);

    function log(){
    console.log("Inside TabList")
    }
return(
    <div class = "TabList">
        <p>{log()}</p>
        This is a tablist
        
        Here are my tabs:
        {tabs['data'].map((data,key) => {
            return(
                <JsonParser data = {data}/>
            )})}
    </div>
);

}
