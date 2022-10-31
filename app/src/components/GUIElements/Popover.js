import { Button, Popover, Table } from '@navikt/ds-react';
import React, { useRef, useState } from "react";
import { JsonParser } from "./JsonParser";
import './CSS/Button.css'

export const popoverType_None = "NONE"
const popoverType_INFO = "INFO"
const popoverType_DESCRIPTION = "DESCRIPTION"
const popoverTyoe_FORMEL = "FORMEL"
const popoverType_FAKTUM = "FAKTUM"

function generateTables(tables) {
    let t = []
    let enTable
    tables.map((data, k) => {
        enTable =
            <div key={k}>
                <JsonParser data={data}></JsonParser>
            </div>
        t.push(enTable)
    })

    return t;
}

export function GuiPopover(props) {
    let element = useState(props.element)
    let j = props.j
    let subitem = element[0]
    let popOver;
    if (subitem['popoverType'] == popoverType_DESCRIPTION) {
        const buttonRef = useRef(null);
        const [open, setOpen] = useState(false);
        if (subitem['header']) {
            popOver = <Table.HeaderCell key={j} scope="col"><Button ref={buttonRef} onClick={() => setOpen(!open)}
                size="xsmall">
                {subitem['data']}</Button>
                <Popover open={open} onClose={() => setOpen(false)} anchorEl={buttonRef.current}
                    arrow={true} placement="auto" offset={32}>
                    <Popover.Content className="scroll">
                        {generateTables(subitem['popoverContent'][1])}
                    </Popover.Content>
                </Popover></Table.HeaderCell>;
        } else {
            popOver = <Table.DataCell key={j}><Button ref={buttonRef}
                onClick={() => setOpen(!open)} size="xsmall">
                {subitem['data']}</Button><Popover open={open} onClose={() => setOpen(false)}
                    anchorEl={buttonRef.current}
                    arrow={true} placement="auto" offset={32}>

                    <Popover.Content className={"scroll"} >
                        {generateTables(subitem['popoverContent'][1])}
                    </Popover.Content>
                </Popover></Table.DataCell>;
        }
    } else if (subitem['popoverType'] == popoverType_INFO) {
        const buttonRef = useRef(null);
        const [open, setOpen] = useState(false);
        popOver =
            <Table.HeaderCell key={j}>
                {subitem['data']}
                <Button
                    className='question-mark-button'
                    ref={buttonRef}
                    onClick={() => setOpen(!open)} size="xsmall">
                    {'?'}
                </Button>
                <Popover
                    className={"information-popover-content"}
                    open={open}
                    onClose={() => setOpen(false)}
                    anchorEl={buttonRef.current}
                    arrow={true} placement="auto" offset={32}>
                    <Popover.Content>
                        {subitem['popoverInfo']}
                    </Popover.Content>
                </Popover>
            </Table.HeaderCell>;
    } else if(subitem['popoverType'] == popoverTyoe_FORMEL) {


    } else if(subitem['popoverType'] == popoverType_FAKTUM) {

    }
    return popOver
}