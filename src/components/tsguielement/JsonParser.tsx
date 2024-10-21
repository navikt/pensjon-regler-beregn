import {useState} from "react";
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
} from "../../api/domain/types/guimodel.ts";
import {TabListComponent} from "./TabListComponent.tsx";
import {TabComponent} from "./TabComponent.tsx";
import {TableComponent} from "./TableComponent.tsx";

function hasTypeProperty(obj: DataElement): obj is DataElement {
    return obj && typeof obj === "object" && "type" in obj;
}

const search = (current: DataElement | DataElement[]): React.ReactNode[] | undefined => {
    if (current === null) return [];

    let found: React.ReactNode[] = [];

    if (Array.isArray(current)) {
        for (const element of current) {
            if (hasTypeProperty(element)) {
                switch (element.type) {
                    case ElementType.TABLIST:
                        found = found.concat(<TabListComponent tabs={element as TabListElement} key={Math.random().toString(36).slice(2, 7)} />);
                        break;
                    case ElementType.TAB:
                        found = found.concat(<TabComponent tab={element as TabElement} key={Math.random().toString(36).slice(2, 7)} />);
                        break;
                    case ElementType.TABLE:
                        found = found.concat(<TableComponent table={element as TableElement} key={Math.random().toString(36).slice(2, 7)}/>);
                        break;
                    case ElementType.NODE:
                        found = found.concat(<TreeComponent tree={element as NodeElement} index={Math.random().toString(36).slice(2, 7)} key={Math.random().toString(36).slice(2, 7)} />);
                        break;
                    case ElementType.BEREGNINGNODE:
                        found = found.concat(<TreeComponent tree={element as BeregningNodeElement} index={Math.random().toString(36).slice(2, 7)} key={Math.random().toString(36).slice(2, 7)} />);
                        break;
                    case ElementType.ARCNODE:
                        found = found.concat(<ARCNODETreeComponent arcnodetree={element as ArcNodeElement} key={Math.random().toString(36).slice(2, 7)}/>);
                        break;
                    case ElementType.FORMELNODE:
                        found = found.concat(<FORMELTreeComponent formeltree={element as FormelNodeElement} key={Math.random().toString(36).slice(2, 7)}/>);
                        break;
                    default:
                        throw new Error("Unsupported elementType");
                }
            }
        }
    } else if (hasTypeProperty(current)) {
        switch (current.type) {
            case ElementType.TABLIST:
                found = found.concat(<TabListComponent tabs={current as TabListElement} key={Math.random().toString(36).slice(2, 7)} />);
                break;
            case ElementType.TAB:
                found = found.concat(<TabComponent tab={current as TabElement} key={Math.random().toString(36).slice(2, 7)} />);
                break;
            case ElementType.TABLE:
                found = found.concat(<TableComponent table={current as TableElement} key={Math.random().toString(36).slice(2, 7)} />);
                break;
            case ElementType.NODE:
                found = found.concat(<TreeComponent tree={current as NodeElement} index={Math.random().toString(36).slice(2, 7)} key={Math.random().toString(36).slice(2, 7)}/>);
                break;
            case ElementType.BEREGNINGNODE:
                found = found.concat(<TreeComponent tree={current as BeregningNodeElement} index={Math.random().toString(36).slice(2, 7)} key={Math.random().toString(36).slice(2, 7)}/>);
                break;
            case ElementType.ARCNODE:
                found = found.concat(<ARCNODETreeComponent arcnodetree={current as ArcNodeElement} key={Math.random().toString(36).slice(2, 7)}/>);
                break;
            case ElementType.FORMELNODE:
                found = found.concat(<FORMELTreeComponent formeltree={current as FormelNodeElement} key={Math.random().toString(36).slice(2, 7)}/>);
                break;
            default:
                throw new Error("Unsupported elementType");
        }
    }

    return found;
};

interface JsonParserProps {
    data: DataElement | DataElement[];
}

export function JsonParser(props: JsonParserProps) {
    const [data] = useState(props.data);

    return <div key={Math.random().toString(36).slice(2, 7)}>{search(data)}</div>;
}