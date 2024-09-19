import { Button, Popover, Table } from '@navikt/ds-react';
import React, { useRef, useState } from "react";
import {JsonParser} from "./../../tsguielement/JsonParser.tsx";
import './CSS/Button.css'

export const popoverType_None = "NONE"
export const popoverType_DESCRIPTION = "DESCRIPTION"
export const popoverType_FORMEL = "FORMEL"
export const popoverType_FAKTUM = "FAKTUM"

function generateTables(tables) {
    let t = []
    let enTable
    tables && tables.map((data, k) => {
        enTable = <div key={k}>
            <JsonParser data={data}></JsonParser>
        </div>
        t.push(enTable)
    })

    return t;
}

export function Cell(props) {
    let element = useState(props.element);
    let j = props.j
    let subitem = element[0]
    let cellInTable;
    let dataBtn
    const buttonPopoverRef = useRef(null);
    const buttonTooltipRef = useRef(null);
    const [open, setOpen] = useState(false);

    const modifiers = {
        preventOverflow: {
            enabled: false,
        },
        flip: {
            enabled: false,
        },
    };

    function getTooltip() {
        return <><Button
            className='question-mark-button'
            ref={buttonTooltipRef}
            onClick={() => setOpen(!open)} size="xsmall">
            {'?'}
        </Button>
            <Popover
                className={"tooltip"}
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={buttonTooltipRef.current}
                arrow={true} placement="auto" offset={32}>
                <Popover.Content>
                    {subitem['tooltip']}
                </Popover.Content>
            </Popover></>;
    }

    function getPopOver() {
        let detail = generateTables(subitem['popoverContent'])
        return <Popover open={open} onClose={() => setOpen(false)}
            anchorEl={buttonPopoverRef.current}
            placement="left" modifiers={modifiers}
            arrow={true} strategy={"absolute"} >
            <Popover.Content className={"Popoverscroll"}>
                {detail}
            </Popover.Content>
        </Popover>;
    }

    function createCell() {
        let tooltip = <></>
        if (subitem['tooltip']) {
            dataBtn = subitem['data']
            tooltip = getTooltip()
        }
        let popOver = <></>
        if (subitem['popoverType'] !== popoverType_None) {
            dataBtn = <Button ref={buttonPopoverRef} onClick={() => setOpen(!open)} size="xsmall" style={popOverColor(subitem['popoverType'])} >
                {subitem['data']}</Button>
                popOver = getPopOver()
        } else {
            dataBtn = subitem['data']
        }
        return { tooltip, dataBtn, popOver };
    }

    function popOverColor(value) {
        if (value === popoverType_DESCRIPTION)
            return { 'backgroundColor': 'blue' };
        else if (value === popoverType_FORMEL)
            return { 'color': 'orange', 'backgroundColor': 'grey' };
        else if (value === popoverType_FAKTUM)
            return { 'color': 'white', 'backgroundColor': 'grey' };
    }

    if (Object.hasOwn(subitem, "header") && subitem['header'] === true) {
        let { tooltip, dataBtn, popOver } = createCell();
        console.log("header is true in cell", subitem)
        cellInTable = <Table.HeaderCell key={j} scope="col">
            {dataBtn}
            {tooltip}
            {popOver}
        </Table.HeaderCell>
    } else {
        let { tooltip, dataBtn, popOver } = createCell();
        cellInTable = <Table.DataCell key={j}>
            {dataBtn}
            {tooltip}
            {popOver}
        </Table.DataCell>;
    }
    return cellInTable
}