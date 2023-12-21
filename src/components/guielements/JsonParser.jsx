import React, { useState } from "react";
import { Tab } from "./Tab";
import { TabList } from "./TabList";
import { EnTable } from "./Table";
import { Tree } from "./Tree";
import { ARCNODETree } from "./ARCNODETree";
import { FORMELTree } from "./FORMELTree";

const search = (current) => {
    let element = [];
    const elementType = {
        TABLIST: "TABLIST",
        TAB: "TAB",
        TABLE: "TABLE",
        NODE: "NODE",
        BEREGNINGNODE: "BEREGNINGNODE",
        ARCNODE: "ARCNODE",
        FORMELNODE: "FORMELNODE"
    }

    for (let child in current) {
        let found = [];
        if (current[child].hasOwnProperty('type')) {
            element = current[child];
        } else if (current.hasOwnProperty('type')) {
            element = current;
        }
        if (current[child].hasOwnProperty('type') || current.hasOwnProperty('type')) {
            switch (element['type']) {
                case elementType.TABLIST:
                    found = <TabList tabs={element}></TabList>
                    return found
                case elementType.TAB:
                    found = <Tab tab={element}></Tab>
                    return found
                case elementType.TABLE:
                    found = <EnTable table={element}></EnTable>
                    return found
                case elementType.NODE:
                    found = <Tree tree={element} index={Math.random().toString(36).slice(2, 7)}></Tree>
                    return found
                case elementType.BEREGNINGNODE:
                    found = <Tree tree={element} index={Math.random().toString(36).slice(2, 7)}></Tree>
                    return found
                case elementType.ARCNODE:
                    found = <ARCNODETree arcnodetree={element}></ARCNODETree>
                    return found
                case elementType.FORMELNODE:
                    found = <FORMELTree formeltree={element}></FORMELTree>
                    return found
                default:
                    throw new Error("Unsupported elementType")
            }

        } else if (Array.isArray(current[child])) {
            found = search(current[child]);
        }
        if (found != null && found.length !== 0) {
            return found
        }

    }
}

export function JsonParser(props) {
    let [data] = useState(props.data)
    return (
        <div>
            {search(data)}
        </div>
    );
}