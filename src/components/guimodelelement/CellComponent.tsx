import {Button, HelpText, Popover, Table} from "@navikt/ds-react";
import {CellElement, NodeElement, PopoverType} from "../../api/domain/types";
import React, {useRef, useState} from "react";
import {JsonParser} from "./JsonParser.tsx";

export interface CellComponentProps {
    cell: CellElement;
}

const generatePopoverTables = (tables: NodeElement[]): React.ReactNode[] => {
    const result: React.ReactNode[] = [];
    let table: React.ReactNode;
    tables && tables.map((data, k) => {
        table = <div key={k}>
            <JsonParser data={data}></JsonParser>
        </div>
        result.push(table)
    })
    return result;
}

export const CellComponent = (props: CellComponentProps) => {

    const buttonPopoverRef = useRef(null);
    const [open, setOpen] = useState(false);
    let currentCell;
    let data;

    const getPopoverColorClass = (item: CellElement) => {
        if (item.popoverType === PopoverType.DESCRIPTION) {
            return {'backgroundColor': 'blue'};
        } else if (item.popoverType === PopoverType.FORMEL) {
            return {'color': 'orange', 'backgroundColor': 'grey'};
        } else if (item.popoverType === PopoverType.FAKTUM) {
            return {'color': 'white', 'backgroundColor': 'grey'};
        }
    }

    const createPopover = (item: CellElement) => {
        if (item.popoverType === PopoverType.NONE || !Array.isArray(item.popoverContent)) {
            return null;
        }
        const popoverDetail: React.ReactNode[] = generatePopoverTables(item.popoverContent);
        return (
            <Popover anchorEl={buttonPopoverRef.current}
                     open={open}
                     onClose={() => setOpen(false)}
                     arrow={true}
                     placement="left"
                     offset={32}
                     strategy={"absolute"}>
                <Popover.Content className={"Popoverscroll"}>
                    {popoverDetail}
                </Popover.Content>
            </Popover>
        );
    }

    const createTooltip = (item: CellElement) => {
        if (item && item.tooltip) {
            return (
                <HelpText title={item.tooltip}>
                    {item.tooltip}
                </HelpText>
            );
        } else {
            return null;
        }
    }

    const createCell = (cell: CellElement) => {
        const tooltip = createTooltip(cell);
        const popOver = createPopover(cell);
        if (cell.popoverType !== PopoverType.NONE) {
            data = <Button
                ref={buttonPopoverRef}
                onClick={() => setOpen(!open)}
                size="xsmall"
                style={getPopoverColorClass(cell)}>
                {cell.data}
            </Button>;
        } else {
            data = cell.data;
        }

        return {tooltip, data, popOver};
    }

    if (!props.cell) {
        return null;
    }

    if (props.cell.header) {
        const {tooltip, data, popOver} = createCell(props.cell);
        currentCell = <Table.HeaderCell align={"left"}>
            { tooltip ?
                <span style={{ display: 'flex', alignItems: 'center' }}>
                {data} {tooltip} {popOver}
                </span>
                :
                <div>
                    {data} {popOver}
                </div>
            }
        </Table.HeaderCell>
    } else {
        const {tooltip, data, popOver} = createCell(props.cell);
        currentCell = <Table.DataCell align={"left"}>
            {data}
            {tooltip}
            {popOver}
        </Table.DataCell>
    }

    return currentCell;
};