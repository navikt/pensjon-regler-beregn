import React, {useState} from "react";
import {TableElement} from "../../api/domain/types/guimodel.ts";
import {Heading, Table} from "@navikt/ds-react";
import {CellComponent} from "./CellComponent.tsx";

export interface TableProps {
    table: TableElement;
}

export function TableComponent(props: TableProps): React.ReactNode {
    const [table] = useState<TableElement>(props.table);

    const GenerateRows = (table: TableElement) => {
        return (
            <div className="w-full flex flex-col gap-4">
                <Table size={"small"}>
                    <Table.Body>
                        {table.cells.map((row, rowIndex) => {
                            return (
                                <Table.Row key={rowIndex}>
                                    {row.map((cell, index) => {
                                        return (
                                            <CellComponent cell={cell} key={index}/>
                                        )
                                    })}
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
        )
    }

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
            {GenerateRows(table)}
        </div>
    )
}