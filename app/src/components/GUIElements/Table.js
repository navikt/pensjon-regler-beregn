import React, { useRef, useState } from "react";
import { JsonParser } from "./JsonParser";
import { Button, Heading, Table } from '@navikt/ds-react';
import './CSS/EnTable.css'
import {GuiPopover, popoverType_None} from "./Popover";

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
                if (subitem['popoverType'] != popoverType_None) {
                    row.push(<GuiPopover element={subitem} j={j}></GuiPopover>)
                } else {
                    if (subitem['header']) {
                        row.push(<Table.HeaderCell key={j} scope="col">{subitem['data']}</Table.HeaderCell>)
                    }
                    else {
                        row.push(<Table.DataCell key={j}>{subitem['data']}</Table.DataCell>)
                    }
                }
            })
        }
        return row
    }

    const Checkname = ({ name }) => {
        if (name != null && name.includes('Ingen')) {
            return (null);
        } else
            return <div className="w-full flex flex-col gap-4">
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
            <Heading spacing size="large"
                style={{
                    borderBottom: table.hasOwnProperty('name') ? "2px solid grey" : "",
                    borderTop: table.hasOwnProperty('name') ? "2px solid grey" : "",
                    backgroundColor: table.hasOwnProperty('name') ? "#f1f1f1" : "",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
                level="6"> &ensp; {table.hasOwnProperty('name') ? table['name'] : ''}</Heading>
            <Checkname name={table['name']}>

            </Checkname>
        </div>
    )
}