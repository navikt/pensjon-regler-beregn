import React, { useState } from "react";
import { Heading, Table } from '@navikt/ds-react';
import './CSS/EnTable.css'
import { Cell } from "./Cell";

export function EnTable(props) {
    let [table] = useState(props.table)

    function horizontalHeader(item, index) {
        if (item[index] == null || undefined)
            return (null)
        else if (Object.hasOwn(item[index],'header') ) {
            return <Table.HeaderCell key={index} scope="col">{item[index]['data']}</Table.HeaderCell>
            }
    }

    function showRow(item) {
        let row = []
        if (Array.isArray(item)) {
            item.map((subitem, j) => {
                row.push(<Cell element={subitem} j={j}></Cell>)
            })
        }
        return row
    }

    const Checkname = ({ name }) => {
        if (name != null && name.includes('Ingen')) {
            return (null);
        } else
            return <div className="w-full flex flex-col gap-4"  >
                <Table size="small">
                    <Table.Header>
                        <Table.Row>
                            {table['cells'].map((item, index) => (
                                horizontalHeader(item, index)
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {table['cells'].map((item, index) => (
                            <Table.Row key={index}>
                                {showRow(item, index)}
                            </Table.Row>
                        ))
                        }
                    </Table.Body>
                </Table>
            </div>
    }

    return (
        <div>
            <Heading size="xsmall" level="6"> &ensp;
            </Heading>
            <Heading spacing className={"tableHeading"}
                style={{
                    borderBottom: Object.hasOwn(table,'name') ? "2px solid grey" : "",
                    borderTop: Object.hasOwn(table,'name') ? "2px solid grey" : "",
                    backgroundColor: Object.hasOwn(table,'name') ? "#f1f1f1" : "",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
                level="6"> &ensp; {Object.hasOwn(table,'name') ? table['name'] : ''}</Heading>
            <Checkname name={table['name']} className={"tableBody"}>

            </Checkname>
        </div>
    )
}