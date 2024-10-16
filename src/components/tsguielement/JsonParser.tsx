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

const search = (current: DataElement | DataElement[]): React.ReactNode[] => {
    if (current === null) return [];

    let element: DataElement | DataElement[] | null = null;

    let found: React.ReactNode[] = [];

    for (const child in current) {

        if (current[child] && !Array.isArray(current[child]) && hasTypeProperty(current[child])) {
            element = current[child];
        } else if (hasTypeProperty(current)) {
            element = current;
        }

        if (element) {
            // @ts-ignore
            switch (element.type) {
                case ElementType.TABLIST:
                    found = found.concat(<TabListComponent tabs={element as TabListElement} />);
                    break;
                case ElementType.TAB:
                    found = found.concat( <TabComponent tab={element as TabElement} />);
                    break;
                case ElementType.TABLE:
                    found = found.concat(<Table2Component table={element as TableElement} />);
                    break;
                case ElementType.NODE:
                    found = found.concat(<TreeComponent tree={element as NodeElement} index={Math.random().toString(36).slice(2, 7)} />);
                    break;
                case ElementType.BEREGNINGNODE:
                    found = found.concat(<TreeComponent tree={element as BeregningNodeElement} index={Math.random().toString(36).slice(2, 7)} />);
                    break;
                case ElementType.ARCNODE:
                    found = found.concat(<ARCNODETreeComponent arcnodetree={element as ArcNodeElement} />);
                    break;
                case ElementType.FORMELNODE:
                    found = found.concat(<FORMELTreeComponent formeltree={element as FormelNodeElement} />);
                    break;
                default:
                    throw new Error("Unsupported elementType");
            }
        } else if (Array.isArray(current[child])) {
            found = search(current[child]);
        }
    }
    return found;
};

interface JsonParserProps {
    data: DataElement | DataElement[];
    isFetching?: boolean;
}

export function JsonParser(props: JsonParserProps) {
    const [data] = useState(props.data);
    const [isFetching] = useState(props.isFetching);

    useEffect(() => {
    }, [isFetching]);

    return <div>{search(data)}</div>;
}