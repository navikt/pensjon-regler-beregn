import {
    ArcNodeElement,
    BeregningNodeElement,
    CellElement,
    DataElement,
    ElementType,
    FormelNodeElement,
    GuiModel,
    LogResponse,
    NodeElement,
    Orientation,
    PopoverType,
    Position,
    TabElement,
    TableElement,
    TabListElement
} from "@pensjon/domain";

/*
 * Mockdata for lokal utvikling uten BFF/backend (VITE_MOCK_BEREGN=true, `pnpm dev:mock`).
 * Logg-ID «feil» gir en beregning som feiler, slik at feilvisningen kan testes.
 */

export const isMockMode = import.meta.env.VITE_MOCK_BEREGN === "true";

export const mockDelay = <T>(value: T, ms = 450): Promise<T> =>
    new Promise((resolve) => setTimeout(() => resolve(value), ms));

const header = (data: string, tooltip?: string): CellElement => ({
    type: ElementType.TABLE, header: true, popoverType: PopoverType.NONE, data, tooltip
});

const cell = (data: string, extra: Partial<CellElement> = {}): CellElement => ({
    type: ElementType.TABLE, header: false, popoverType: PopoverType.NONE, data, ...extra
});

const table = (name: string, rows: CellElement[][], orientation = Orientation.HORIZONTAL): TableElement => ({
    type: ElementType.TABLE, name, orientation, cells: rows
});

const keyValueTable = (name: string, rows: [string, string | CellElement][]): TableElement =>
    table(name, rows.map(([key, value]) => [header(key), typeof value === "string" ? cell(value) : value]), Orientation.VERTICAL);

const tab = (name: string, data: DataElement[]): TabElement => ({
    type: ElementType.TAB, name, data: data as TableElement[]
});

const tabList = (name: string, position: Position, tabs: TabElement[]): TabListElement => ({
    type: ElementType.TABLIST, name, position, data: tabs
});

const formel = (name: string, notasjon: string, innhold: string, result: string, children: FormelNodeElement[] = []): FormelNodeElement => ({
    type: ElementType.FORMELNODE, name, used: true, notasjon, innhold, result, children
});

const formelCell = (data: string, tree: FormelNodeElement): CellElement =>
    cell(data, {popoverType: PopoverType.FORMEL, popoverContent: [tree]});

const faktumCell = (data: string, details: TableElement): CellElement =>
    cell(data, {popoverType: PopoverType.FAKTUM, popoverContent: [details as unknown as NodeElement]});

const G = "124 028";

const grunnpensjonFormel = formel("Grunnpensjon", "GP = G × sats × TT/40", `${G} × 0,90 × 40/40`, "111 625", [
    formel("Grunnbeløp", "G", "Grunnbeløp per 2025-05-01", G),
    formel("Sats", "sats", "Gift med pensjonist", "0,90"),
    formel("Trygdetidsfaktor", "TT/40", "40 / 40", "1,00"),
]);

const tilleggspensjonFormel = formel("Tilleggspensjon", "TP = G × SPT × 0,45 × FPP-andel", `${G} × 5,42 × 0,45 × 1`, "302 504", [
    formel("Sluttpoengtall", "SPT", "Snitt av 20 beste poengår", "5,42", [
        formel("Poengår før 1992", "", "Poengår med 45 % opptjening", "18"),
        formel("Poengår etter 1991", "", "Poengår med 42 % opptjening", "22"),
    ]),
]);

const personTable = keyValueTable("Person", [
    ["Fødselsdato", "14.03.1961"],
    ["Sivilstand", cell("Gift", {tooltip: "Hentet fra Folkeregisteret 2025-01-02"})],
    ["Ektefelle mottar pensjon", "Ja"],
    ["Uttaksgrad", "100 %"],
    ["Virkningstidspunkt", "2025-04-01"],
    ["Bostedsland", "Norge"],
]);

const trygdetidTable = table("Trygdetidsperioder", [
    [header("Fra og med"), header("Til og med"), header("Land"), header("Poengår", "Brukes ved beregning av tilleggspensjon")],
    [cell("14.03.1977"), cell("31.12.1984"), cell("Norge"), cell("Nei")],
    [cell("01.01.1985"), cell("30.06.1990"), cell("Sverige"), cell("Nei")],
    [cell("1990-07-01"), cell("2024-12-31"), cell("Norge"), cell("Ja")],
    [header("Sum faktisk trygdetid"), cell(""), cell(""), faktumCell("40 år", keyValueTable("Trygdetid", [
        ["Faktisk trygdetid Norge", "34 år 2 mnd"],
        ["Avtaleland (Sverige)", "5 år 6 mnd"],
        ["Avrundet", "40 år"],
    ]))],
]);

const opptjeningRows = (from: number, to: number) => Array.from({length: to - from + 1}, (_, i) => {
    const year = from + i;
    const inntekt = 380_000 + i * 21_500;
    const poeng = (4.2 + (i % 7) * 0.31).toFixed(2).replace(".", ",");
    return [cell(String(year)), cell(inntekt.toLocaleString("nb-NO") + " kr"), cell(poeng), cell(i % 5 === 0 ? "Nei" : "Ja")];
});

const opptjeningTabs = tabList("Opptjening per tiår", Position.SIDE, [
    tab("1990–1999", [table("Pensjonspoeng 1990–1999", [[header("År"), header("Inntekt"), header("Poengtall"), header("Blant 20 beste")], ...opptjeningRows(1990, 1999)])]),
    tab("2000–2009", [table("Pensjonspoeng 2000–2009", [[header("År"), header("Inntekt"), header("Poengtall"), header("Blant 20 beste")], ...opptjeningRows(2000, 2009)])]),
    tab("2010–2024", [table("Pensjonspoeng 2010–2024", [[header("År"), header("Inntekt"), header("Poengtall"), header("Blant 20 beste")], ...opptjeningRows(2010, 2024)])]),
]);

const arc = (name: string, used: boolean, children: ArcNodeElement[] = []): ArcNodeElement => ({
    type: ElementType.ARCNODE, name, used, children
});

const regelflyt = arc("BeregnAlderspensjon2011", true, [
    arc("FastsettTrygdetid", true, [arc("TrygdetidNorge", true), arc("TrygdetidAvtaleland", true), arc("TrygdetidEOS", false)]),
    arc("BeregnGrunnpensjon", true),
    arc("BeregnTilleggspensjon", true, [arc("Sluttpoengtall", true), arc("Overkompensasjon", false)]),
    arc("BeregnPensjonstillegg", false),
    arc("BeregnMinstenivatillegg", false),
]);

export const mockRequestData: DataElement[] = [
    tabList("Grunnlag", Position.TOP, [
        tab("Persongrunnlag", [personTable]),
        tab("Trygdetid", [trygdetidTable]),
        tab("Opptjening", [opptjeningTabs]),
        tab("Regelflyt", [regelflyt]),
    ]),
];

const beregningNode = (name: string, used: boolean, data: DataElement[], children: BeregningNodeElement[] = []): BeregningNodeElement => ({
    type: ElementType.BEREGNINGNODE, name, used, children, data: data as TabElement[]
});

const sammendrag = table("Sammendrag per måned", [
    [header("Ytelse"), header("Brutto per år"), header("Brutto per måned")],
    [cell("Grunnpensjon"), formelCell("111 625 kr", grunnpensjonFormel), cell("9 302 kr")],
    [cell("Tilleggspensjon"), formelCell("302 504 kr", tilleggspensjonFormel), cell("25 209 kr")],
    [cell("Pensjonstillegg"), cell("0 kr", {tooltip: "Ikke innvilget – tilleggspensjon overstiger særtillegget"}), cell("0 kr")],
    [header("Sum"), header("414 129 kr"), header("34 511 kr")],
]);

const alderspensjon = beregningNode("Alderspensjon 2011", true, [
    tab("Sammendrag", [sammendrag]),
], [
    beregningNode("Grunnpensjon", true, [tab("Grunnpensjon", [
        keyValueTable("Grunnpensjon", [["Sats", "0,90"], ["Trygdetid", "40/40"], ["Årsbeløp", formelCell("111 625 kr", grunnpensjonFormel)]]),
    ])]),
    beregningNode("Tilleggspensjon", true, [tab("Tilleggspensjon", [
        keyValueTable("Tilleggspensjon", [["Sluttpoengtall", "5,42"], ["Poengår", "40"], ["Årsbeløp", formelCell("302 504 kr", tilleggspensjonFormel)]]),
    ])], [
        beregningNode("Sluttpoengtall", true, [tab("Sluttpoengtall", [
            keyValueTable("Sluttpoengtall", [["Antall poengår", "40"], ["20 beste år (snitt)", "5,42"]]),
        ])]),
        beregningNode("Overkompensasjon", false, []),
    ]),
    beregningNode("Pensjonstillegg", false, [tab("Pensjonstillegg", [
        keyValueTable("Pensjonstillegg", [["Status", "Ikke innvilget"], ["Årsak", "Tilleggspensjon overstiger særtillegg"]]),
    ])]),
    beregningNode("Minstenivåtillegg", false, []),
]);

export const mockResponseData: DataElement[] = [
    alderspensjon,
    tabList("Resultatoversikt", Position.TOP, [
        tab("Utbetaling", [table("Utbetalingsperioder", [
            [header("Fra og med"), header("Til og med"), header("Brutto"), header("Skatt"), header("Netto")],
            [cell("2025-04-01"), cell("2025-04-30"), cell("34 511 kr"), cell("9 318 kr"), cell("25 193 kr")],
            [cell("2025-05-01"), cell(""), cell("35 120 kr"), cell("9 482 kr"), cell("25 638 kr")],
        ])]),
        tab("Formler", [grunnpensjonFormel, tilleggspensjonFormel]),
    ]),
];

export const mockSatsTabeller: string[] = ["SATS_2025_05", "SATS_2024_05", "SATS_2023_05", "TEST_G_150000"];

interface RealFixture {
    service: string;
    virk: string;
    load: () => Promise<{ default: unknown }>;
}

/** Logg-ID-er som gir ekte GuiModel-svar fra pensjon-regler (lastes dynamisk, så de ikke havner i hovedbundelen). */
export const REAL_FIXTURES: Record<string, RealFixture> = {
    trygdetid: {
        service: "FastsettTrygdetid",
        virk: "2027-01-01",
        load: () => import("./mock/fastsettTrygdetid.json"),
    },
    revurdering: {
        service: "RevurderingAlderspensjon2011",
        virk: "2026-05-01",
        load: () => import("./mock/revurderingAlderspensjon2011.json"),
    },
};

const lowerFirst = (value: string) => value.charAt(0).toLowerCase() + value.slice(1);

const mockLogMetadata = (id: string) => {
    const fixture = REAL_FIXTURES[id];
    if (fixture) {
        return {
            className: `no.nav.pensjon.regler.domain.api.request.${fixture.service}Request`,
            endpoint: `/api/${lowerFirst(fixture.service)}`,
            penPersonId: "6850113",
            saksId: "25106433",
            virk: fixture.virk,
            satsTabell: "PROD_20260904",
        };
    }
    return {
        className: id === "feil"
            ? "no.nav.pensjon.regler.domain.api.request.RevurderingAlderspensjon2016Request"
            : "no.nav.pensjon.regler.domain.api.request.BeregnAlderspensjon2011ForsteUttakRequest",
        endpoint: id === "feil" ? "/api/revurderingAlderspensjon2016" : "/api/beregnAlderspensjon2011ForsteUttak",
        penPersonId: "22948167",
        saksId: "25106433",
        virk: "2025-04-01",
        satsTabell: "SATS_2024_05",
    };
};

export const mockLogResponse = (id: string): LogResponse => ({
    id,
    correlation_id: "mock-correlation-1",
    environment: "pensjon-regler-q2",
    cluster: "dev-gcp",
    created_at: "2025-03-28T09:14:22.512Z",
    type: "I",
    transaction_id: "mock-transaction-1",
    json: JSON.stringify({mock: true, id}),
    metadata: JSON.stringify({...mockLogMetadata(id), cluster: "dev-gcp"}),
});

const realGuiModel = async (fixture: RealFixture, className: string, sats: string): Promise<GuiModel> => {
    const real = (await fixture.load()).default as GuiModel;
    return {...real, metadata: {...real.metadata, className, bruktSats: sats || real.metadata.bruktSats}};
};

export const mockGuiModelAsync = (id: string, className: string, environment: string, sats: string): Promise<GuiModel> =>
    REAL_FIXTURES[id]
        ? realGuiModel(REAL_FIXTURES[id], className, sats)
        : Promise.resolve(mockGuiModel(id, className, environment, sats));

const mockGuiModel = (id: string, className: string, environment: string, sats: string): GuiModel => {
    const debugLog = [
        `[${new Date().toISOString()}] Starter ${className.split(".").pop()} i ${environment}`,
        `Satstabell: ${sats || "fra miljø (SATS_2025_05)"}`,
        "Regel BeregnAlderspensjon2011 → FastsettTrygdetid: 40 år",
        "Regel BeregnGrunnpensjon: 124028 × 0.90 × 40/40 = 111625",
        "Regel BeregnTilleggspensjon: SPT 5.42, poengår 40",
        "Regel BeregnPensjonstillegg: ikke innvilget (TP > særtillegg)",
        id === "feil" ? "FEIL: Mangler uttaksgrad for periode 2016-01-01" : "Beregning fullført OK",
    ].join("\n");

    if (id === "feil") {
        return {
            request: mockRequestData,
            response: [],
            metadata: {
                className,
                status: "error",
                info: "no.nav.pensjon.regler.exception.RegelmotorValideringException: Mangler uttaksgrad for periode 2016-01-01\n\tat no.nav.pensjon.regler.alderspensjon.Revurdering.valider(Revurdering.kt:142)",
                debugLog,
            },
        };
    }
    return {
        request: mockRequestData,
        response: mockResponseData,
        metadata: {className, status: "ok", info: "", bruktSats: sats || "SATS_2025_05", debugLog},
    };
};
