export enum ElementType {
    TABLIST = "TABLIST",
    TAB = "TAB",
    TABLE = "TABLE",
    NODE = "NODE",
    BEREGNINGNODE = "BEREGNINGNODE",
    ARCNODE = "ARCNODE",
    FORMELNODE = "FORMELNODE"
}

export enum PopoverType {
    NONE = "NONE",
    DESCRIPTION = "DESCRIPTION",
    FORMEL = "FORMEL",
    FAKTUM = "FAKTUM"
}

export type GuiModel = {
    request: Tab[] | TabList[];
    response: Tab[] | TabList[];
    metadata: Metadata;
    fromFile?: boolean;
}

export type Cell = {
    data: string;
    header: boolean;
    popoverType: PopoverType;
    popoverContent?: Table[];
    tooltip?: string;
}

export type Table = {
    type: string;
    name?: string;
    orientation: string;
    cells: Cell[];
}

export type Tab = {
    [key: string]: any;
    name: string;
    data: Table[];
    type: string;
}

export type TabList = {
    [key: string]: any;
    position: string;
    type: string;
    children: Tab[];
}

export type Metadata  = {
    status: string;
    info: string;
    bruktSats: string;
    debugLog: string;
}