import {
    ArcNodeElement,
    BeregningNodeElement,
    CellElement,
    DataElement,
    ElementType,
    FormelNodeElement,
    NodeElement,
    Orientation,
    Position,
    PopoverType,
    TabElement,
    TableElement,
    TabListElement
} from "@pensjon/domain";

const headerCell = (text: string): CellElement => ({
    type: ElementType.TABLE,
    header: true,
    popoverType: PopoverType.NONE,
    data: text
});

const cell = (text: string, tooltip?: string): CellElement => ({
    type: ElementType.TABLE,
    header: false,
    popoverType: tooltip ? PopoverType.DESCRIPTION : PopoverType.NONE,
    tooltip,
    data: text
});

const mockTable = (name: string): TableElement => ({
    type: ElementType.TABLE,
    name,
    orientation: Orientation.HORIZONTAL,
    cells: [
        [headerCell("Felt"), headerCell("Verdi")],
        [cell("Fødselsdato"), cell("01.01.1960")],
        [cell("Sivilstand"), cell("Gift", "Hentet fra folkeregisteret")],
        [cell("Trygdetid"), cell("40 år")]
    ]
});

const mockTab = (name: string): TabElement => ({
    type: ElementType.TAB,
    name,
    data: [mockTable(`${name} - grunnlag`), mockTable(`${name} - detaljer`)]
});

const mockTabList = (name: string, tabNames: string[]): TabListElement => ({
    type: ElementType.TABLIST,
    name,
    position: Position.TOP,
    data: tabNames.map(mockTab)
});

const mockFormelNode = (name: string): FormelNodeElement => ({
    type: ElementType.FORMELNODE,
    name,
    used: true,
    children: [],
    notasjon: "G x 2.4",
    innhold: "Grunnbeløp multiplisert med faktor",
    result: "241 656"
});

const mockNode = (name: string, depth: number): NodeElement => ({
    type: ElementType.NODE,
    name,
    used: true,
    children: depth > 0
        ? [mockNode(`${name}.1`, depth - 1), mockNode(`${name}.2`, depth - 1)]
        : [mockFormelNode(`${name} - formel`)]
});

const mockBeregningNode = (name: string): BeregningNodeElement => ({
    type: ElementType.BEREGNINGNODE,
    name,
    used: true,
    children: [mockNode(`${name}.Alderspensjon`, 2)],
    data: [mockTab(`${name} - resultat`)]
});

const mockArcNode = (name: string): ArcNodeElement => ({
    type: ElementType.ARCNODE,
    name,
    used: true,
    children: [mockNode(`${name}.Grunnlag`, 1)]
});

export const mockRequestData: DataElement[] = [
    mockTabList("Personopplysninger", ["Grunnlag", "Trygdetid", "Historikk"]),
    mockArcNode("Beregningsgrunnlag")
];

export const mockResponseData: DataElement[] = [
    mockBeregningNode("Alderspensjon"),
    mockTabList("Resultatoversikt", ["Utbetaling", "Fradrag", "Vedtaksdetaljer"])
];

export const mockSatsTabeller: string[] = [
    "Sats 2024",
    "Sats 2023",
    "Sats 2022"
];

export const mockDebugLog = `[MOCK] Beregning kjørt lokalt uten backend.
Klasse: no.nav.pensjon.regler.beregn.AlderspensjonRequest
Miljø: pensjon-regler-q1
Sats: Sats fra miljø
Status: OK`;
