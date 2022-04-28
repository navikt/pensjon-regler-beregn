import React, {useRef, useState} from "react";
import {JsonParser} from "./JsonParser";
import {Button, Heading, Popover, Table} from '@navikt/ds-react';
import data from "bootstrap/js/src/dom/data";

export function EnTable(props) {
    let [table] = useState(props.table)

    function log() {
        console.log("Inside table", table)
    }

    function horizontalHeader(item, index) {
        if (item[index] == null)
            return (null)
        else if (item[index].hasOwnProperty('header'))
            return <Table.HeaderCell scope="col">{item[index][0]['data']}</Table.HeaderCell>
    }

    function showRow(item) {
        //console.log("one row data" , item, index)
        let row = []
        if (Array.isArray(item[1])) {
            //console.log("item[index]" , item[index])
            item[1].map((subitem, j) => {
                let popOver;
//console.log("Item inside cell" , subitem, j)
                if (subitem['popover']) {
                    const buttonRef = useRef(null);
                    const [open, setOpen] = useState(false);
                    if (subitem['header']) {
                        popOver = <Table.HeaderCell scope="col"><Button ref={buttonRef} onClick={() => setOpen(true)}
                                                                        size="xsmall">
                            {subitem['data']}</Button>
                            <Popover open={open} onClose={() => setOpen(false)} anchorEl={buttonRef.current}
                                     arrow={true} placement="auto" offset={32}>
                                <Popover.Content><JsonParser
                                    data={subitem['popoverContent']}></JsonParser></Popover.Content>
                            </Popover></Table.HeaderCell>;
                        row.push(popOver)
                    } else {
                        popOver = <Table.DataCell><Button ref={buttonRef}
                                                          onClick={() => setOpen(true)} size="xsmall">
                            {subitem['data']}</Button><Popover open={open} onClose={() => setOpen(false)}
                                                               anchorEl={buttonRef.current}
                                                               arrow={true} placement="auto" offset={32}>
                            <Popover.Content><JsonParser
                                data={subitem['popoverContent']}></JsonParser></Popover.Content>
                        </Popover></Table.DataCell>;
                        row.push(popOver)
                        // let modal = <Table.DataCell><Button ref={buttonRef} onClick={() => setOpen(true)} size="xsmall">
                        //     {subitem['data']}</Button>
                        //     <Modal open={open} onClose={() => setOpen(false)}>
                        //         <Modal.Content>
                        //             <JsonParser
                        //                 data={subitem['popoverContent']}></JsonParser>
                        //         </Modal.Content>
                        //     </Modal>
                        // </Table.DataCell>
                        // row.push(modal)
                    }
                } else {
                    if (subitem['header']) {
                        row.push(<Table.HeaderCell scope="col">{subitem['data']}</Table.HeaderCell>)
                    } else {
                        row.push(<Table.DataCell>{subitem['data']}</Table.DataCell>)
                    }
                }
            })
        }
        //console.log(row)
        return row
    }


    const Checkname = ({name}) => {
        //console.log(table)
        if (name != null && name.includes('ingen')) {
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
                            <Table.Row>
                                {showRow(item, index)}
                            </Table.Row>
                            // <CheckExpandableRow rowContent ={item} >
                            // </CheckExpandableRow>
                        ))
                        }
                    </Table.Body>
                </Table>
            </div>
    }

    const CheckExpandableRow = ({rowContent}) => {
        let expandable = false
        let expandableitem = []
        if (Array.isArray(rowContent[1])) {
            rowContent[1].map((subitem, j) => { //check every cell of this row, show expandable if one cell have popOver.
                if (subitem['popover']) {
                    expandable = true
                    expandableitem = subitem
                }
            })
        }

        if (expandable) {
            return <Table.ExpandableRow content={<JsonParser data={expandableitem['popoverContent']}></JsonParser>}>
                {showRow(rowContent)}
            </Table.ExpandableRow>
        } else {
            return <Table.Row><Table.DataCell></Table.DataCell> {showRow(rowContent)} </Table.Row>
        }
    }

    return (
        <div>
            {/*{log()}*/}

            <Heading size="xsmall" level="6"> &ensp;
            </Heading>
            <Heading spacing size="xsmall"
                     level="6"> &ensp; {table.hasOwnProperty('name') ? table['name'] : ''}</Heading>
            <Checkname name={table['name']}>

            </Checkname>
        </div>
    )
}