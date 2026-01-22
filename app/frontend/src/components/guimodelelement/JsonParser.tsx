import {useState} from "react";
import {TreeComponent} from "./TreeComponent.tsx"
import {ArcNodeTreeComponent} from "./ArcNodeTreeComponent.tsx";
import {FormelTreeComponent} from "./FormelTreeComponent.tsx";
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
} from "@pensjon/domain";
import {TabListComponent} from "./TabListComponent.tsx";
import {TabComponent} from "./TabComponent.tsx";
import {TableComponent} from "./TableComponent.tsx";
import {generateKey, hasTypeProperty} from "../../util";

const search = (current: DataElement | DataElement[]): React.ReactNode[] | undefined => {
    if (current === null) return [];

    let found: React.ReactNode[] = [];

    if (Array.isArray(current)) {
        for (const element of current) {
            if (hasTypeProperty(element)) {
                switch (element.type) {
                    case ElementType.TABLIST:
                        found = found.concat(<TabListComponent tabs={element as TabListElement} key={generateKey()} />);
                        break;
                    case ElementType.TAB:
                        found = found.concat(<TabComponent tab={element as TabElement} key={generateKey()} />);
                        break;
                    case ElementType.TABLE:
                        found = found.concat(<TableComponent table={element as TableElement} key={generateKey()}/>);
                        break;
                    case ElementType.NODE:
                        found = found.concat(<TreeComponent tree={element as NodeElement} index={generateKey()} key={generateKey()} />);
                        break;
                    case ElementType.BEREGNINGNODE:
                        found = found.concat(<TreeComponent tree={element as BeregningNodeElement} index={generateKey()} key={generateKey()} />);
                        break;
                    case ElementType.ARCNODE:
                        found = found.concat(<ArcNodeTreeComponent arcnodetree={element as ArcNodeElement} key={generateKey()}/>);
                        break;
                    case ElementType.FORMELNODE:
                        found = found.concat(<FormelTreeComponent formeltree={element as FormelNodeElement} key={generateKey()}/>);
                        break;
                    default:
                        throw new Error("Unsupported elementType");
                }
            }
        }
    } else if (hasTypeProperty(current)) {
        switch (current.type) {
            case ElementType.TABLIST:
                found = found.concat(<TabListComponent tabs={current as TabListElement} key={generateKey()} />);
                break;
            case ElementType.TAB:
                found = found.concat(<TabComponent tab={current as TabElement} key={generateKey()} />);
                break;
            case ElementType.TABLE:
                found = found.concat(<TableComponent table={current as TableElement} key={generateKey()} />);
                break;
            case ElementType.NODE:
                found = found.concat(<TreeComponent tree={current as NodeElement} index={generateKey()}/>);
                break;
            case ElementType.BEREGNINGNODE:
                found = found.concat(<TreeComponent tree={current as BeregningNodeElement} index={generateKey()}/>);
                break;
            case ElementType.ARCNODE:
                found = found.concat(<ArcNodeTreeComponent arcnodetree={current as ArcNodeElement} key={generateKey()}/>);
                break;
            case ElementType.FORMELNODE:
                found = found.concat(<FormelTreeComponent formeltree={current as FormelNodeElement} key={generateKey()}/>);
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

    return <div key={generateKey()}>{search(data)}</div>;
}