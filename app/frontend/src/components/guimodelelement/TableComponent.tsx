import React, {useState} from "react";
import {Heading, Table} from "@navikt/ds-react";
import {Orientation, TableElement} from "@pensjon/domain";
import {CellComponent} from "./CellComponent.tsx";
import {JsonParser} from "./JsonParser.tsx";
import {isInlineFormel} from "../../util/cells.ts";

export interface TableProps {
    table: TableElement;
}

const hasText = (data?: string) => !!data && data.trim() !== "" && data.trim() !== "-";

export function TableComponent({table}: TableProps): React.ReactNode {
    // Nøkler «rad:kolonne» for formler som er ekspandert inline; flere kan være åpne samtidig.
    const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
    const rows = table.cells ?? [];
    const name = table.name?.trim();

    // pensjon-regler sender tomme tabeller med navn som «Ingen Merknader»; vis dem som én dempet linje.
    if (rows.length === 0) {
        return <p className="gui-table-empty">{name || "Ingen data"}</p>;
    }

    // HORIZONTAL: første rad er kolonneoverskrifter. VERTICAL: første celle i hver rad er nøkkel.
    const hasHeaderRow = table.orientation === Orientation.HORIZONTAL
        && rows.length > 1
        && rows[0].every((cell) => cell?.header);
    const headerRow = hasHeaderRow ? rows[0] : undefined;
    const bodyRows = hasHeaderRow ? rows.slice(1) : rows;

    // pensjon-regler legger summer som en siste rad uten verdi i første kolonne (f.eks. «Pensjon Under Utbetaling»).
    const lastRow = bodyRows[bodyRows.length - 1];
    const hasSumRow = hasHeaderRow && bodyRows.length > 1
        && !hasText(lastRow[0]?.data) && lastRow.slice(1).some((cell) => hasText(cell?.data));

    const toggle = (key: string) => setExpanded((previous) => {
        const next = new Set(previous);
        if (next.has(key)) next.delete(key); else next.add(key);
        return next;
    });

    const columnCount = Math.max(...rows.map((row) => row.length));

    return (
        <div className="gui-table">
            {name && <Heading size="xsmall" level="3" className="gui-table-title">{name}</Heading>}
            <div className="gui-table-scroll">
                <Table size="small" zebraStripes data-orientation={table.orientation}>
                    {headerRow && (
                        <Table.Header>
                            <Table.Row>
                                {headerRow.map((cell, index) => <CellComponent key={index} cell={cell} scope="col"/>)}
                            </Table.Row>
                        </Table.Header>
                    )}
                    <Table.Body>
                        {bodyRows.map((row, rowIndex) => {
                            const openFormler = row
                                .map((cell, index) => ({cell, index, key: `${rowIndex}:${index}`}))
                                .filter(({cell, key}) => isInlineFormel(cell) && expanded.has(key));
                            const isSumRow = hasSumRow && rowIndex === bodyRows.length - 1;
                            return (
                                <React.Fragment key={rowIndex}>
                                    <Table.Row className={isSumRow ? "gui-sum-row" : undefined}>
                                        {row.map((cell, index) => {
                                            const key = `${rowIndex}:${index}`;
                                            return isInlineFormel(cell)
                                                ? <CellComponent key={index} cell={cell} scope="row"
                                                                 inlineExpanded={expanded.has(key)}
                                                                 onToggleInline={() => toggle(key)}/>
                                                : <CellComponent key={index} cell={cell} scope="row"/>;
                                        })}
                                    </Table.Row>
                                    {openFormler.map(({cell, key, index}) => (
                                        <Table.Row key={key} className="gui-formel-row">
                                            <Table.DataCell colSpan={columnCount}>
                                                <div className="gui-formel-inline">
                                                    <span className="gui-formel-inline-label">
                                                        {[index > 0 ? row[0]?.data : undefined, headerRow?.[index]?.data]
                                                            .map((part) => part?.trim()).filter(Boolean).join(" · ") || "Formel"}
                                                        {" = "}{cell.data}
                                                    </span>
                                                    <JsonParser data={cell.popoverContent}/>
                                                </div>
                                            </Table.DataCell>
                                        </Table.Row>
                                    ))}
                                </React.Fragment>
                            );
                        })}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}
