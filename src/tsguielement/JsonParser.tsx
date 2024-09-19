// src/components/guielements/JsonParser.tsx
import {useEffect, useState} from "react";
import {EnTable} from "../components/guielements/Table";
import {Tree} from "../components/guielements/Tree";
import {ARCNODETree} from "../components/guielements/ARCNODETree";
import {FORMELTree} from "../components/guielements/FORMELTree";
import { ElementType, Tab, Table, TabList} from "../api/domain/types/guimodel";
import {TabList as TabListElement} from "../components/guielements/TabList";
import {Tab as TabElement} from "../components/guielements/Tab";

const search = (current: Tab | TabList | Table ): JSX.Element | null => {
    let element: Tab | TabList | Table | null = null;

    for (const child in current) {
        let found: JSX.Element | null = null;
        if (Object.prototype.hasOwnProperty.call(current[child], 'type')) {
            element = current[child] as Tab | TabList;
        } else if (Object.prototype.hasOwnProperty.call(current, 'type')) {
            element = current as Tab | TabList;
        }
        if (element && (Object.prototype.hasOwnProperty.call(current[child], 'type') || Object.prototype.hasOwnProperty.call(current, 'type'))) {
            console.log(element.type);
            switch (element.type) {
                case ElementType.TABLIST:
                    found = <TabListElement tabs={element as TabList} />;
                    return found;
                case ElementType.TAB:
                    found = <TabElement tab={element as Tab}/>;
                    return found;
                case ElementType.TABLE:
                    found = <EnTable table={element as Table | unknown} />; // Adjust as needed
                    return found;
                case ElementType.NODE:
                    found = <Tree tree={element as unknown} index={Math.random().toString(36).slice(2, 7)} />; // Adjust as needed
                    return found;
                case ElementType.BEREGNINGNODE:
                    found = <Tree tree={element as unknown} index={Math.random().toString(36).slice(2, 7)} />; // Adjust as needed
                    return found;
                case ElementType.ARCNODE:
                    found = <ARCNODETree arcnodetree={element as unknown} />; // Adjust as needed
                    return found;
                case ElementType.FORMELNODE:
                    found = <FORMELTree formeltree={element as unknown} />; // Adjust as needed
                    return found;
                default:
                    throw new Error("Unsupported elementType");
            }
        } else if (Array.isArray(current[child])) {
            found = search(current[child] as Tab | TabList);
        }
        if (found != null) {
            return found;
        }
    }
    return null;
};

interface JsonParserProps {
    data:  Tab | TabList | Table | undefined;
    isFetching?: boolean;
}

export function JsonParser(props: JsonParserProps): JSX.Element {
    const [data] = useState(props.data);
    const [isFetching] = useState(props.isFetching);

    useEffect(() => {
        // Add any side effects here if needed
    }, [isFetching]);

    return (
        <div>
            {search(data as Tab | TabList | Table)}
        </div>
    );
}