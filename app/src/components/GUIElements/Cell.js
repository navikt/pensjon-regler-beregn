import {Button, Popover, Table} from '@navikt/ds-react';
import React, {useRef, useState} from "react";
import {JsonParser} from "./JsonParser";
import './CSS/Button.css'
import {renderToString} from "react-dom/server";

export const popoverType_None = "NONE"
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
                className={"information-popover-content"}
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
        let detail = generateTables(subitem['popoverContent'][1])
        // console.log("detail" ,detail)
        return <Popover open={open} onClose={() => setOpen(false)}
                        anchorEl={buttonPopoverRef.current}
                        placement="bottom" modifiers={modifiers}
                        arrow={true} offset={32}>
            <Popover.Content className={"scroll"}>
                {detail}
            </Popover.Content>
        </Popover>;
    }

    function getDetailView() {
        let detail = generateTables(subitem['popoverContent'][1])
        // console.log("detail" ,renderToString(detail))
        // let text = '<div>'+'{{$detail}}'+'</div>'
        document.getElementById("datailView").innerHTML =  renderToString(detail)
        // detailView.style.
        return <div open={open} onClose={() => setOpen(false)}>
        </div>;
    }

    function createCell() {
        let tooltip = <></>
        if (subitem['tooltip'] != undefined ) {
            dataBtn = subitem['data']
            tooltip = getTooltip()
        }
        let popOver = <></>
        if (subitem['popoverType'] != popoverType_None) {
            // dataBtn = <Button onClick={() => setOpen(!open)} size="xsmall">
            dataBtn = <Button ref={buttonPopoverRef}  onClick={() => setOpen(!open)} size="xsmall">
                {subitem['data']}</Button>
            popOver = getPopOver()
            // popOver = getDetailView()
        } else {
            dataBtn = subitem['data']
        }
        return {tooltip, popOver};
    }

    if (subitem['header']) {
        let {tooltip, popOver} = createCell();
        cellInTable = <Table.HeaderCell key={j} scope="col">
            {dataBtn}
            {tooltip}
            {popOver}
        </Table.HeaderCell>
    } else {
        let {tooltip, popOver} = createCell();
        cellInTable = <Table.DataCell key={j}>
            {dataBtn}
            {tooltip}
            {popOver}
        </Table.DataCell>;
    }
    return cellInTable
}