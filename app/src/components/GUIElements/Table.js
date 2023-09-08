import React, {useState} from "react";
import {Heading, Table} from '@navikt/ds-react';
import './CSS/EnTable.css'
import {Cell} from "./Cell";

export function EnTable(props) {
    let [table] = useState(props.table)

    function horizontalHeader(item, index) {
        if (item[index] == null)
            return (null)
        else if (item[index].hasOwnProperty('header'))
            return <Table.HeaderCell key={index} scope="col">{item[index][0]['data']}</Table.HeaderCell>
    }

    function showRow(item) {
        let row = []
        if (Array.isArray(item[1])) {
            item[1].map((subitem, j) => {
                row.push(<Cell element={subitem} j={j}></Cell>)
            })
        }
        return row
    }

    const Checkname = ({name}) => {
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
                        {table['cells'][1].map((item, index) => (
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
                         borderBottom: table.hasOwnProperty('name') ? "2px solid grey" : "",
                         borderTop: table.hasOwnProperty('name') ? "2px solid grey" : "",
                         backgroundColor: table.hasOwnProperty('name') ? "#f1f1f1" : "",
                         display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center'
                     }}
                     level="6"> &ensp; {table.hasOwnProperty('name') ? table['name'] : ''}</Heading>
            <Checkname name={table['name']} className={"tableBody"}>

            </Checkname>
        </div>
    )
}