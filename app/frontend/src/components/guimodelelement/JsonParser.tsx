import {InlineMessage} from "@navikt/ds-react";
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
import {TreeComponent} from "./TreeComponent.tsx";
import {ArcNodeTreeComponent} from "./ArcNodeTreeComponent.tsx";
import {FormelTreeComponent} from "./FormelTreeComponent.tsx";
import {TabListComponent} from "./TabListComponent.tsx";
import {TabComponent} from "./TabComponent.tsx";
import {TableComponent} from "./TableComponent.tsx";
import {hasTypeProperty} from "../../util/index.ts";

const GuiElement = ({element}: { element: DataElement }) => {
    switch (element.type) {
        case ElementType.TABLIST:
            return <TabListComponent tabs={element as TabListElement}/>;
        case ElementType.TAB:
            return <TabComponent tab={element as TabElement}/>;
        case ElementType.TABLE:
            return <TableComponent table={element as TableElement}/>;
        case ElementType.NODE:
        case ElementType.BEREGNINGNODE:
            return <TreeComponent tree={element as NodeElement | BeregningNodeElement}/>;
        case ElementType.ARCNODE:
            return <ArcNodeTreeComponent arcnodetree={element as ArcNodeElement}/>;
        case ElementType.FORMELNODE:
            return <FormelTreeComponent formeltree={element as FormelNodeElement}/>;
        default:
            return <InlineMessage status="warning" size="small">Ukjent elementtype: {String(element.type)}</InlineMessage>;
    }
};

interface JsonParserProps {
    data: DataElement | DataElement[] | undefined;
}

/**
 * Rendrer et GuiModel-element (eller en liste av dem) rekursivt: hver komponent
 * kaller JsonParser igjen for sine barn.
 */
export function JsonParser({data}: JsonParserProps) {
    if (!data) return null;
    const elements = (Array.isArray(data) ? data : [data]).filter(hasTypeProperty);
    return (
        <div className="gui-stack">
            {elements.map((element, index) => <GuiElement key={`${element.type}-${index}`} element={element}/>)}
        </div>
    );
}
