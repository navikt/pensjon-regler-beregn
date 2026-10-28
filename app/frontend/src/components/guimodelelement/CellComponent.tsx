import {Button, HelpText, Popover, Table} from "@navikt/ds-react";
import {CellElement, NodeElement, PopoverType} from "@pensjon/domain";
import React, {useState} from "react";
import {JsonParser} from "./JsonParser.tsx";

export interface CellComponentProps {
    cell: CellElement;
}

const generatePopoverTables = (tables: NodeElement[]): React.ReactNode[] =>
    (tables ?? []).map((data, k) =>
        <div key={k}>
            <JsonParser data={data}></JsonParser>
        </div>
    )

export const CellComponent = (props: CellComponentProps) => {

    const [popoverAnchor, setPopoverAnchor] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

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
            <Popover anchorEl={popoverAnchor}
                     open={open}
                     onClose={() => setOpen(false)}
                     arrow={true}
                     placement="left"
                     offset={32}
                     strategy={"absolute"}>
                <Popover.Content className={"Popoverscroll"}>
                    <>{popoverDetail}</>
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
        const data = cell.popoverType !== PopoverType.NONE
            ? <Button
                ref={setPopoverAnchor}
                onClick={() => setOpen(!open)}
                size="xsmall"
                style={getPopoverColorClass(cell)}>
                {cell.data}
            </Button>
            : cell.data;

        return {tooltip, data, popOver};
    }

    if (!props.cell) {
        return null;
    }

    if (props.cell.header) {
        const {tooltip, data, popOver} = createCell(props.cell);
        return <Table.HeaderCell align={"left"}>
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
    }

    const {tooltip, data, popOver} = createCell(props.cell);
    return <Table.DataCell align={"left"}>
        {data}
        {tooltip}
        {popOver}
    </Table.DataCell>
};