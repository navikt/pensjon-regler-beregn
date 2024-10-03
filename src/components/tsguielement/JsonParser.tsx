import {useEffect, useState} from "react";
import {EnTable} from "../tsguielement/TableComponent.tsx";
import {TreeComponent} from "../tsguielement/TreeComponent.tsx"
import {ARCNODETreeComponent} from "../tsguielement/ARCNODETreeComponent.tsx";
import {FORMELTreeComponent} from "../tsguielement/FORMELTreeComponent.tsx";
import {
    ArcNodeElement, BaseElement,
    BeregningNodeElement,
    DataElement,
    ElementType,
    FormelNodeElement,
    NodeElement,
    TabElement,
    TableElement,
    TabListElement
} from "../../api/domain/types/guimodelx.ts";
import {TabListComponent} from "./TabListComponent.tsx";
import {TabComponent} from "./TabComponent.tsx";

function hasTypeProperty(obj: DataElement): obj is DataElement {
    return obj && typeof obj === "object" && "type" in obj;
}

const search = (current: DataElement): React.ReactNode | null => {

    if (current === null) return null;

    for (const child in current) {
        let element: BaseElement | null = null;
        let foundElements : React.ReactNode[] = [];

        // @ts-ignore
        if (current[child] && hasTypeProperty(current[child])) {
            // @ts-ignore
            element = current[child];
        } else if (hasTypeProperty(current)) {
            element = current;
        }
        if (element) {
            // @ts-ignore
            switch (element.type) {
                case ElementType.TABLIST:
                    foundElements.push(<TabListComponent tabs={element as TabListElement}/>);
                    return foundElements;
                case ElementType.TAB:
                    foundElements.push(<TabComponent tab={element as TabElement}/>)
                    return foundElements;
                case ElementType.TABLE:
                    foundElements.push(<EnTable table={element as TableElement}/>);
                    return foundElements;
                case ElementType.NODE:
                    foundElements.push(<TreeComponent tree={element as NodeElement} index={Math.random().toString(36).slice(2, 7)}/>);
                    return foundElements;
                case ElementType.BEREGNINGNODE:
                    foundElements.push(
                        <TreeComponent tree={element as BeregningNodeElement} index={Math.random().toString(36).slice(2, 7)}/>);
                    return foundElements;
                case ElementType.ARCNODE:
                    foundElements.push(<ARCNODETreeComponent arcnodetree={element as ArcNodeElement}/>);
                    return foundElements;
                case ElementType.FORMELNODE:
                    foundElements.push(<FORMELTreeComponent formeltree={element as FormelNodeElement}/>);
                    return foundElements;
                default:
                    throw new Error("Unsupported elementType");
            }
        }
        // @ts-ignore
        else if (Array.isArray(current[child])) {
            //@ts-ignore
            foundElements = search(current[child]);
        }

        if (foundElements != null) {
            return foundElements;
        }
    }
    return null;
};

interface JsonParserProps {
    data: DataElement;
    isFetching?: boolean;
}

export function JsonParser(props: JsonParserProps) {
    const [data] = useState(props.data);
    const [isFetching] = useState(props.isFetching);

    useEffect(() => {
        // Your effect logic here
    }, [isFetching]);

    return <div>{search(data)}</div>;
}