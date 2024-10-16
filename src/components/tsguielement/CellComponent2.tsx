import {Button, Popover, Table, Tooltip} from "@navikt/ds-react";
import {CellElement, NodeElement, PopoverType} from "../../api/domain/types/guimodelx.ts";
import React, {useRef, useState} from "react";
import {JsonParser} from "./JsonParser.tsx";
import {popoverType_DESCRIPTION, popoverType_FORMEL} from "./CellComponent.tsx";

export interface CellComponent2Props {
    cell: CellElement;
}

const generatePopoverTables = (tables: NodeElement[]): React.ReactNode[] => {
    const result: React.ReactNode[] = [];
    let table: React.ReactNode;
    tables && tables.map((data, k) => {
        console.log("data", data);
        table = <div key={k}>
            <JsonParser data={data}></JsonParser>
        </div>
        result.push(table)
    })
    return result;
}

export const CellComponent2 = (props: CellComponent2Props) => {

    const buttonPopoverRef = useRef(null);
    const buttonTooltipRef = useRef(null);
    const [open, setOpen] = useState(false);
    let currentCell;
    let data;

    const getPopoverColorClass = (item: CellElement) => {
        if (item.popoverType === popoverType_DESCRIPTION) {
            return { 'backgroundColor': 'blue' };
        }
        else if (item.popoverType === popoverType_FORMEL) {
            return { 'color': 'orange', 'backgroundColor': 'grey' };
        }
        else if (item.popoverType === PopoverType.FAKTUM) {
            return { 'color': 'white', 'backgroundColor': 'grey' };
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
                <>
                    <Button
                        className={'question-mark-button'}
                        ref={buttonTooltipRef}
                        onClick={() => setOpen(!open)}
                        size="xsmall">
                        {'?'}
                    </Button>
                    <Popover
                        className={"tooltip"}
                        open={open}
                        onClose={() => setOpen(false)}
                        anchorEl={buttonTooltipRef.current}
                        arrow={true} placement={"top"}
                        offset={32}>
                        <Popover.Content>
                            {item.tooltip}
                        </Popover.Content>
                    </Popover>
                </>
            );
        } else {
            return null;
        }
    }

    const createCell = (cell: CellElement) => {
        const tooltip = createTooltip(cell);
        const popOver = createPopover(cell);
        if (cell.popoverType !== PopoverType.NONE) {
            data =  <Button
                        ref={buttonPopoverRef}
                        onClick={() => setOpen(!open)}
                        size="xsmall"
                        style={getPopoverColorClass(cell)}>
                {cell.data}
            </Button>;
        } else {
            data = cell.data;
        }

        return { tooltip, data, popOver };
    }

    if (!props.cell) {
        return null;
    }

    if (props.cell.header) {
        const { tooltip, data, popOver } = createCell(props.cell);
        currentCell = <Table.HeaderCell>
            {data}
            {tooltip}
            {popOver}
        </Table.HeaderCell>
    } else {
        const { tooltip, data, popOver } = createCell(props.cell);
        currentCell = <Table.DataCell>
            {data}
            {tooltip}
            {popOver}
        </Table.DataCell>
    }

    return currentCell;
};