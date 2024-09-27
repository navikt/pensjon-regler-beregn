import {useEffect, useState} from "react";
import {EnTable} from "../tsguielement/TableComponent.tsx";
import {TreeComponent} from "../tsguielement/TreeComponent.tsx"
import {ARCNODETreeComponent} from "../tsguielement/ARCNODETreeComponent.tsx";
import {FORMELTreeComponent} from "../tsguielement/FORMELTreeComponent.tsx";
import {
    ArcNodeElement,
    BeregningNodeElement,
    DataElement,
    ElementType,
    FormelNodeElement,
    TabElement,
    TableElement,
    TabListElement
} from "../../api/domain/types/guimodelx.ts";
import {TabListComponent} from "./TabListComponent.tsx";
import {TabComponent} from "./TabComponent.tsx";
import {DataElement} from "../../api/domain/types/guimodelx.ts";

function hasTypeProperty(obj: any): obj is DataElement {
    return obj && typeof obj === "object" && "type" in obj;
}

const search = (current: DataElement): React.ReactNode | null => {

    if (current === null) return null;

    for (const child in current) {
        let element: unknown = null;
        let found : React.ReactNode = null;

        if (current[child] && hasTypeProperty(current[child])) {
            element = current[child];
        } else if (hasTypeProperty(current)) {
            element = current;
        }
        if (element) {
            // @ts-ignore
            switch (element.type) {
                case ElementType.TABLIST:
                    found = <TabListComponent tabs={element as TabListElement}/>;
                    return found;
                case ElementType.TAB:
                    found = <TabComponent tab={element as TabElement}/>;
                    return found;
                case ElementType.TABLE:
                    found = <EnTable table={element as TableElement}/>;
                    return found;
                case ElementType.NODE:
                    found = <TreeComponent tree={element as Node} index={Math.random().toString(36).slice(2, 7)}/>;
                    return found;
                case ElementType.BEREGNINGNODE:
                    found =
                        <TreeComponent tree={element as BeregningNodeElement} index={Math.random().toString(36).slice(2, 7)}/>;
                    return found;
                case ElementType.ARCNODE:
                    found = <ARCNODETreeComponent arcnodetree={element as ArcNodeElement}/>;
                    return found;
                case ElementType.FORMELNODE:
                    found = <FORMELTreeComponent formeltree={element as FormelNodeElement}/>;
                    return found;
                default:
                    throw new Error("Unsupported elementType");
            }
        }
        // @ts-ignore
        else if (Array.isArray(current[child])) {
            //@ts-ignore
            found = search(current[child]);
        }

        if (found != null) {
            return found;
        }
    }
    return null;
};

interface JsonParserProps {
    data: DataElement;
    isFetching: boolean;
}

export function JsonParser(props: JsonParserProps) {
    const [data] = useState(props.data);
    const [isFetching] = useState(props.isFetching);

    useEffect(() => {
        // Your effect logic here
    }, [isFetching]);

    return <div>{search(data)}</div>;
}