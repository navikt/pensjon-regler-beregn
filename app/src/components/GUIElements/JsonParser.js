import React, {useState} from "react";
import { Tab } from "./Tab";
import { TabList } from "./TabList";
import { EnTable } from "./Table";
import { Tree } from "./Tree";

const search = (current) => {
    var element = []

    for (var child in current) {
        var found = []
        if(current[child].hasOwnProperty('type')) {
            element = current[child];
        } else if (current.hasOwnProperty('type')) {
            element = current;
        }
        if(current[child].hasOwnProperty('type') || current.hasOwnProperty('type')) {
            if(  element['type'] == 'TABLIST') {
                found= <TabList tabs = {element}></TabList>
                return found
            }
            else if( element['type'] == 'TAB') {
                found= <Tab tab = {element}></Tab>
                return found
            }
            else if( element['type']== 'TABLE') {
                found= <EnTable table = {element}></EnTable>
                return found
            } else if( element['type'] == 'NODE') {
                found = <Tree tree = {element}  index = {Math.random().toString(36).slice(2, 7)}></Tree>
                return found
            }

        }
        else if(Array.isArray(current[child])) {
            found = search(current[child]);
        }
        if(found != null && found.length != 0) {
            return found
        }

    }
  }

export function JsonParser(props){
            let [data] = useState(props.data)
            return (
                <div>
                    {search(data)}
                </div>

            );
        }


