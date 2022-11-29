import {Button, Popover, Table} from '@navikt/ds-react';
import React, {useRef, useState} from "react";
import {JsonParser} from "./JsonParser";
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
        enTable = <div key={k}>
            <JsonParser data={data}></JsonParser>
        </div>
        t.push(enTable)
    })

    return t;
}

export function Cell(props) {
    let element = useState(props.element)
    let j = props.j
    let subitem = element[0]
    let cellInTable;
    let dataBtn
    const buttonPopoverRef = useRef(null);
    const buttonTooltipRef = useRef(null);
    const [open, setOpen] = useState(false);
    if (subitem['header']) {
        let tooltip=<></>
        if (subitem['tooltip'] != undefined) {
            dataBtn = subitem['data']
            tooltip = <><Button
                className='question-mark-button'
                ref={buttonTooltipRef}
                onClick={() => setOpen(!open)} size="xsmall">
                {'?'}
            </Button>
            <Popover
                className={"information-popover-content"}
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={buttonTooltipRef.current}
                arrow={true} placement="auto" offset={32}>
                <Popover.Content>
                    {subitem['tooltip']}
                </Popover.Content>
            </Popover></>
        }
        let popOver=<></>
        if (subitem['popoverType'] != popoverType_None) {
            dataBtn = <Button ref={buttonPopoverRef}
                              onClick={() => setOpen(!open)} size="xsmall">
                {subitem['data']}</Button>
            popOver = <Popover open={open} onClose={() => setOpen(false)}
                               anchorEl={buttonPopoverRef.current}
                               arrow={true} placement="auto" offset={32}>
                <Popover.Content className={"scroll"}>
                    {generateTables(subitem['popoverContent'][1])}
                </Popover.Content>
            </Popover>
        }else {
            dataBtn = subitem['data']
        }
        cellInTable = <Table.HeaderCell key={j} scope="col">
            {dataBtn}
            {tooltip}
            {popOver}
        </Table.HeaderCell>
    } else {
        let tooltip=<></>
        if (subitem['tooltip'] != undefined) {
            dataBtn = subitem['data']
            tooltip = <><Button
                className='question-mark-button'
                ref={buttonTooltipRef}
                onClick={() => setOpen(!open)} size="xsmall">
                {'?'}
            </Button>
            <Popover
                className={"information-popover-content"}
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={buttonTooltipRef.current}
                arrow={true} placement="auto" offset={32}>
                <Popover.Content>
                    {subitem['tooltip']}
                </Popover.Content>
            </Popover></>
        }
        let popOver=<></>
        if (subitem['popoverType'] != popoverType_None) {
            dataBtn = <Button ref={buttonPopoverRef}
                              onClick={() => setOpen(!open)} size="xsmall">
                {subitem['data']}</Button>
            popOver = <Popover open={open} onClose={() => setOpen(false)}
                               anchorEl={buttonPopoverRef.current}
                               arrow={true} placement="auto" offset={32}>
                <Popover.Content className={"scroll"}>
                    {generateTables(subitem['popoverContent'][1])}
                </Popover.Content>
            </Popover>
        }
        else {
            dataBtn = subitem['data']
        }
        cellInTable = <Table.DataCell key={j}>
            {dataBtn}
            {tooltip}
            {popOver}
        </Table.DataCell>;
    }
    return cellInTable
}