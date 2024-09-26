import { useEffect, useState } from "react";
import { EnTable } from "../tsguielement/TableComponent.tsx";
import { TreeComponent } from "../tsguielement/TreeComponent.tsx"
import { ARCNODETreeComponent } from "../tsguielement/ARCNODETreeComponent.tsx";
import { FORMELTreeComponent } from "../tsguielement/FORMELTreeComponent.tsx";
import {
    ArcNode,
    BeregningNode,
    Element,
    ElementType,
    FormelNode,
    Node,
    Tab,
    Table,
    TabList
} from "../../api/domain/types/guimodel.ts";
import {TabListComponent} from "./TabListComponent.tsx";
import {TabComponent} from "./TabComponent.tsx";


const search = (current: Element ): React.ReactElement | null => {
    let element: Element | null = null;
    for (const child of current.data) {

        let found: React.ReactElement | null = null;

        if (child.type) {
            element = child;
        } else if (current.type) {
            element = current;
        }
        if (element && ( child.type || current.type)) {
            switch (element.type) {
                case ElementType.TABLIST:
                    found = <TabListComponent tabs={element as TabList} />;
                    return found;
                case ElementType.TAB:
                    found = <TabComponent tab={element as Tab} />;
                    return found;
                case ElementType.TABLE:
                    found = <EnTable table={element as Table} />;
                    return found;
                case ElementType.NODE:
                    found = <TreeComponent tree={element as Node} index={Math.random().toString(36).slice(2, 7)} />;
                    return found;
                case ElementType.BEREGNINGNODE:
                    found = <TreeComponent tree={element as BeregningNode} index={Math.random().toString(36).slice(2, 7)} />;
                    return found;
                case ElementType.ARCNODE:
                    found = <ARCNODETreeComponent arcnodetree={element as ArcNode} />;
                    return found;
                case ElementType.FORMELNODE:
                    found = <FORMELTreeComponent formeltree={element as FormelNode} />;
                    return found;
                default:
                    throw new Error("Unsupported elementType");
            }
        } else if (Array.isArray(child)) {
            found = search(child as Element);
        }
        if (found != null) {
            return found;
        }
    }
    return null;
};

interface JsonParserProps {
    data:  Element[] | Element;
    isFetching?: boolean;
}

export function JsonParser(props: JsonParserProps): React.ReactElement | null {
    const [data] = useState(props.data);
    const [isFetching] = useState(props.isFetching);

    useEffect(() => {
        // Add any side effects here if needed
    }, [isFetching]);

    return (
        <div>
            {Array.isArray(data) ? data.map((element: Element) => search(element)) : search(data)}
        </div>
    );
}