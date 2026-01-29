
export enum ElementType {
    TABLIST = "TABLIST",
    TAB = "TAB",
    TABLE = "TABLE",
    NODE = "NODE",
    BEREGNINGNODE = "BEREGNINGNODE",
    ARCNODE = "ARCNODE",
    FORMELNODE = "FORMELNODE"
}

export enum Orientation {
    VERTICAL = "VERTICAL",
    HORIZONTAL = "HORIZONTAL"
}

export enum Position {
    TOP = "TOP",
    SIDE = "SIDE"
}

export enum PopoverType {
    NONE = "NONE",
    DESCRIPTION = "DESCRIPTION",
    FORMEL = "FORMEL",
    FAKTUM = "FAKTUM"
}

export interface BaseElement {
    type: ElementType;
    [key: string]: unknown;
}

export interface TabListElement extends BaseElement {
    name: string;
    position: Position;
    data: TabElement[];
}

export interface TabElement extends BaseElement {
    name: string;
    data: TableElement[];
}

export interface TableElement extends BaseElement {
    name: string;
    orientation: Orientation;
    cells: CellElement[][];
}

export interface CellElement extends BaseElement {
    header: boolean;
    popoverType: PopoverType;
    popoverContent?: NodeElement[];
    tooltip?: string;
    data: string;
}

export interface NodeElement extends BaseElement {
    name: string;
    used: boolean;
    children: NodeElement[];
}

export interface ArcNodeElement extends NodeElement {
}

export interface BeregningNodeElement extends NodeElement {
    data: TabElement[];
}

export interface FormelNodeElement extends NodeElement {
    notasjon?: string;
    innhold?: string;
    result?: string;
}

export type DataElement =
    | TabListElement
    | TabElement
    | TableElement
    | CellElement
    | NodeElement
    | ArcNodeElement
    | BeregningNodeElement
    | FormelNodeElement;

export interface GuiModelMetadata {
    className: string;
    status: string;
    info: string;
    bruktSats?: string;
    debugLog?: string;
}

export interface GuiModel {
    request: DataElement[];
    response: DataElement[];
    metadata: GuiModelMetadata;
}

export interface LogResponseMetadata {
    className: string;
    endpoint: string;
    cluster: string;
    penPersonId?: string;
    virk: string;
    satsTabell?: string;
    kontrollOk?: boolean;
    httpStatus?: number;
    saksId?: string;

}
export type LogResponse = {
    id: string;
    correlation_id: string;
    environment: string;
    cluster: string;
    created_at?: string;
    metadata: string;
    json?: string;
    type: string;
    transaction_id: string;


}