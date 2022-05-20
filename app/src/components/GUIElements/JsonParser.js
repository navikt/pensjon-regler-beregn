import React, {useState} from "react";
import { Tab } from "./Tab";
import { TabList } from "./TabList";
import { EnTable } from "./EnTable";
import { Tree } from "./Tree";

const search = (current, target, parent) => {
    var element = []

    for (var child in current) {
        var found = []
        if(current[child].hasOwnProperty('type')) {
            element = current[child];
        } else if (current.hasOwnProperty('type')) {
            element = current;
        }
        // find TOP ,then data, then recursive , last is type....  In the   model of backend.. move type to the beginning.
        //one level can only has recursive when child = data.
        if(current[child].hasOwnProperty('type') || current.hasOwnProperty('type')) {
            if(  element['type'] == 'TABLIST') {
                //parseTabList(name, current['data'], parent)
                found= <TabList tabs = {element}></TabList>
                return found
            }
            else if( element['type'] == 'TAB') {
                //parseTab(name, current['data'], parent)
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
            found = search(current[child], target, current);
        }

        //console.log("found:" +found)
        if(found!=null&&found.length != 0) {
            return found
        }

    }
  }

export function JsonParser(props){
            let [data] = useState(props.data)
            return (
                <div>
                    {search(data, 'xyzzt', [])}
                </div>

            );
        }


