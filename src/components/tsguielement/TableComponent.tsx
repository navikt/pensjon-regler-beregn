import React, {ReactNode, useState} from "react";
import {Heading, Table, Tooltip} from '@navikt/ds-react';
import './CSS/EnTable.css';
import {CellComponent} from "./CellComponent";
import {QuestionmarkIcon} from "@navikt/aksel-icons";

import {CellElement, Orientation, TableElement} from "../../api/domain/types/guimodelx.ts";

export interface EnTableProps {
    table: TableElement;
}

export function EnTable(props: EnTableProps): ReactNode {
    const [table] = useState<TableElement>(props.table);

    function createTooltip(item: CellElement): ReactNode | null {
        if (item && item.tooltip) {
            return (
                <Tooltip content={item.tooltip} placement="top">
                    <QuestionmarkIcon className={"questionmark-icon-border"} fontSize="1.5rem" />
                </Tooltip>
            );
        } else {
            return null;
        }
    }

    function horizontalHeader(items: CellElement[]): ReactNode | null {
        if (!items || items.length === 0) {
            return null;
        }

        return items.map((item, index) => {
            if (item.header) {
                const tooltip = createTooltip(item);
                return (
                    <Table.HeaderCell key={item.data + index} scope="col">
                        <span className={"center-content"}>{item.data} {tooltip}</span>
                    </Table.HeaderCell>
                );
            }
            return null;
        });
    }

    function verticalHeader(items: CellElement[]): ReactNode | null {
        if (!items || items.length === 0) {
            return null;
        }

        return items.map((item, index) => {
            if (item.header) {
                const tooltip = createTooltip(item);
                return (
                    <Table.HeaderCell key={item.data + index} scope="row">
                        <span className={"center-content"}>{item.data} {tooltip}</span>
                    </Table.HeaderCell>
                );
            }
            return null;
        });
    }

    function showRow(item: CellElement[], isVertical = false, index: number): ReactNode[] {
        return item.map((subitem, j) => (
            <CellComponent key={`cell-${index}-${j}`} index={index} element={subitem} j={j} isVertical={isVertical} />
        ));
    }

    const GenerateTableRows: React.FC<{ name: string | undefined }> = ({ name }) => {
        if (name && name.includes('Ingen') && table.cells.length === 0) { //TODO rendre det som finnes, trenger ikke noe sjekk på Ingen etc
            return null;
        } else {
            return (
                <div className="w-full flex flex-col gap-4">
                    <Table size="small">
                        <Table.Header>
                            <Table.Row>
                                {table.orientation === Orientation.VERTICAL && table.cells[0] && (
                                    horizontalHeader(table.cells[0])
                                )}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {table.orientation === 'HORIZONTAL' && table.cells.slice(1).map((item, index) => (
                                <Table.Row key={`horizontal-row-${index}`}>
                                    {showRow(item, false, index)}
                                </Table.Row>
                            ))}
                            {table.orientation === 'VERTICAL' && table.cells.map((item, index) => (
                                <Table.Row key={`vertical-row-${index}`}>

                                    {showRow(item, true, index)}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            );
        }
    };

    return (
        <div>
            <Heading
                spacing
                className={"tableHeading"}
                size={"medium"}
                style={{
                    borderBottom: table.name ? "2px solid grey" : "",
                    borderTop: table.name ? "2px solid grey" : "",
                    backgroundColor: table.name ? "#f1f1f1" : "",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
                level="6"
            >
                &ensp; {table.name || ''}
            </Heading>
            <GenerateTableRows name={table.name} />
        </div>
    );
}