import React, {useState} from "react";
import {Heading, Table} from '@navikt/ds-react';
import './CSS/EnTable.css'
import {Cell} from "./Cell";

export function EnTable(props) {
    let [table] = useState(props.table)

    function horizontalHeader(item, index) {
        if (item[index] == null) {
            return null;
        } else if (Object.hasOwn(item[index], 'header') && item[index]['header'] === true) {
            return <Table.HeaderCell key={index} scope="col">{item[index]['data']}</Table.HeaderCell>;
        }
    }

    function verticalHeader(item, index) {
        if (item == null) {
            return null;
        } else if (Object.hasOwn(item, 'header') && item['header'] === true) {
            return <Table.HeaderCell key={index} scope="row">{item['data']}</Table.HeaderCell>;
        }
    }

    function showRow(item, isVertical = false, index) {
        let row = [];
        if (Array.isArray(item)) {
            item.map((subitem, j) => {
                row.push(<Cell key={`cell-${index}-${j}`} index={index} element={subitem} j={j}
                               isVertical={isVertical}/>);
            });
        }
        return row;
    }

    const Checkname = ({name}) => {
        if (name != null && name.includes('Ingen')) {
            return null;
        } else
            return <div className="w-full flex flex-col gap-4">
                <Table size="small">
                    <Table.Header>
                        <Table.Row>
                            {table['orientation'] === 'HORIZONTAL' && table['cells'][0].map((item, index) => (
                                horizontalHeader(table['cells'][0], index)
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {table['orientation'] === 'HORIZONTAL' && table['cells'].slice(1).map((item, index) => (
                            <Table.Row key={`horizontal-row-${index}`}>
                                {showRow(item, index)}
                            </Table.Row>
                        ))}
                        {table['orientation'] === 'VERTICAL' && table['cells'].map((item, index) => (
                            <Table.Row key={`vertical-row-${index}`}>
                                {verticalHeader(item[0])}
                                {showRow(item.slice(1), true)}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
    }

    return (
        <div>
            <Heading size="xsmall" level="6"> &ensp;
            </Heading>
            <Heading spacing className={"tableHeading"} size={"medium"}
                     style={{
                         borderBottom: Object.hasOwn(table, 'name') ? "2px solid grey" : "",
                         borderTop: Object.hasOwn(table, 'name') ? "2px solid grey" : "",
                         backgroundColor: Object.hasOwn(table, 'name') ? "#f1f1f1" : "",
                         display: 'flex',
                         flexDirection: 'column',
                         alignItems: 'center'
                     }}
                     level="6"> &ensp; {Object.hasOwn(table, 'name') ? table['name'] : ''}</Heading>
            <Checkname name={table['name']} className={"tableBody"}>

            </Checkname>
        </div>
    )
}
