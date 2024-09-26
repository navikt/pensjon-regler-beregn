export enum ElementType {
    TABLIST = "TABLIST",
    TAB = "TAB",
    TABLE = "TABLE",
    NODE = "NODE",
    BEREGNINGNODE = "BEREGNINGNODE",
    ARCNODE = "ARCNODE",
    FORMELNODE = "FORMELNODE"
}

export interface Element {
    type: ElementType;
    children: Element[];
    data: Element[];
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

export interface GuiModel {
    request: Element[];
    response: Element[];
    metadata: Metadata;
    fromFile?: boolean;
}

export interface Cell extends Omit<Element, 'data'> {
    header: boolean;
    popoverType: PopoverType;
    popoverContent?: Element[];
    tooltip?: string;
    data: string;
}

export interface Node extends Element {
    name: string;
    used: boolean;
    children: Node[];
    elementType: ElementType;
}

export interface ArcNode extends Node {
}

export interface BeregningNode extends Node {
    data: Tab[];
}

export interface FormelNode extends Node {
    notasjon?: string;
    innhold?: string;
    result?: string;
}

export interface Table extends Element{
    name?: string;
    orientation: Orientation;
    cells: Cell[][];
}

export interface Tab extends Element {
    [key: string]: any;
    name: string;
    data: Element[];
}

export interface TabList extends Element {
    [key: string]: any;
    position: Position;
    children: Tab[];
}

export interface Metadata {
    status: string;
    info: string;
    bruktSats: string;
    debugLog: string;
}
