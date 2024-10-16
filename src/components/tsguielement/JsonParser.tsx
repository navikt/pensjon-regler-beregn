import {useEffect, useState} from "react";
import {TreeComponent} from "../tsguielement/TreeComponent.tsx"
import {ARCNODETreeComponent} from "../tsguielement/ARCNODETreeComponent.tsx";
import {FORMELTreeComponent} from "../tsguielement/FORMELTreeComponent.tsx";
import {
    ArcNodeElement,
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
import {Table2Component} from "./Table2Component.tsx";

function hasTypeProperty(obj: DataElement): obj is DataElement {
    return obj && typeof obj === "object" && "type" in obj;
}

const search = (current: DataElement | DataElement[]): React.ReactElement[] => {
    if (current === null) return [];

    let foundElements: React.ReactNode[] = [];

    for (const child in current) {
        let element: DataElement | DataElement[] | null = null;

        // @ts-ignore
        if (current[child] && !Array.isArray(current[child]) && hasTypeProperty(current[child])) {
            // @ts-ignore
            element = current[child];
        } else if (hasTypeProperty(current)) {
            element = current;
        }

        if (element) {
            // @ts-ignore
            switch (element.type) {
                case ElementType.TABLIST:
                    return [<TabListComponent tabs={element as TabListElement} />];
                    break;
                case ElementType.TAB:
                    return [<TabComponent tab={element as TabElement} />];
                    break;
                case ElementType.TABLE:
                    return [<Table2Component table={element as TableElement} />];
                    break;
                case ElementType.NODE:
                    return [<TreeComponent tree={element as NodeElement} index={Math.random().toString(36).slice(2, 7)} />];
                    break;
                case ElementType.BEREGNINGNODE:
                    return [<TreeComponent tree={element as BeregningNodeElement} index={Math.random().toString(36).slice(2, 7)} />];
                    break;
                case ElementType.ARCNODE:
                    return [<ARCNODETreeComponent arcnodetree={element as ArcNodeElement} />];
                    break;
                case ElementType.FORMELNODE:
                    return [<FORMELTreeComponent formeltree={element as FormelNodeElement} />];
                    break;
                default:
                    throw new Error("Unsupported elementType");
            }
            // @ts-ignore
        } else if (Array.isArray(current[child])) {
            // @ts-ignore
            foundElements = search(current[child]);
        }
    }
    return foundElements;
};

interface JsonParserProps {
    data: DataElement | DataElement[];
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