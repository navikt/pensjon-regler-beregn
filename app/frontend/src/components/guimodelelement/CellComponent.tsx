import {Button, HelpText, Popover, Table} from "@navikt/ds-react";
import {CalculatorIcon, InformationSquareIcon} from "@navikt/aksel-icons";
import {CellElement, PopoverType} from "@pensjon/domain";
import {useState} from "react";
import {JsonParser} from "./JsonParser.tsx";
import {hasPopoverContent} from "../../util/cells.ts";

export interface CellComponentProps {
    cell: CellElement;
    scope: "col" | "row";
    // Settes for formelceller som skal ekspanderes inline i tabellen i stedet for i popover.
    inlineExpanded?: boolean;
    onToggleInline?: () => void;
}

const POPOVER_STYLE: Record<PopoverType, { color: "accent" | "warning" | "neutral"; icon?: React.ReactNode; label: string }> = {
    [PopoverType.NONE]: {color: "neutral", label: ""},
    [PopoverType.DESCRIPTION]: {color: "accent", icon: <InformationSquareIcon aria-hidden/>, label: "Vis beskrivelse"},
    [PopoverType.FORMEL]: {color: "warning", icon: <CalculatorIcon aria-hidden/>, label: "Vis formel"},
    [PopoverType.FAKTUM]: {color: "neutral", icon: <InformationSquareIcon aria-hidden/>, label: "Vis faktum"},
};

type CellContentProps = Pick<CellComponentProps, "cell" | "inlineExpanded" | "onToggleInline">;

const CellContent = ({cell, inlineExpanded, onToggleInline}: CellContentProps) => {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    if (!hasPopoverContent(cell)) {
        return (
            <span className="gui-cell">
                {cell.data}
                {cell.tooltip && <HelpText title={cell.tooltip}>{cell.tooltip}</HelpText>}
            </span>
        );
    }

    const style = POPOVER_STYLE[cell.popoverType] ?? POPOVER_STYLE[PopoverType.FAKTUM];

    if (onToggleInline) {
        return (
            <span className="gui-cell">
                <Button size="xsmall" variant={inlineExpanded ? "primary" : "secondary"} data-color={style.color}
                        icon={style.icon} iconPosition="right"
                        aria-expanded={!!inlineExpanded}
                        aria-label={`${cell.data} – ${inlineExpanded ? "skjul formel" : style.label.toLowerCase()}`}
                        onClick={onToggleInline}>
                    {cell.data}
                </Button>
                {cell.tooltip && <HelpText title={cell.tooltip}>{cell.tooltip}</HelpText>}
            </span>
        );
    }

    return (
        <span className="gui-cell">
            <Button ref={setAnchor} size="xsmall" variant="secondary" data-color={style.color}
                    icon={style.icon} iconPosition="right"
                    aria-expanded={open} aria-label={`${cell.data} – ${style.label.toLowerCase()}`}
                    onClick={() => setOpen((value) => !value)}>
                {cell.data}
            </Button>
            {cell.tooltip && <HelpText title={cell.tooltip}>{cell.tooltip}</HelpText>}
            <Popover anchorEl={anchor} open={open} onClose={() => setOpen(false)} placement="bottom-start">
                <Popover.Content className="gui-popover">
                    <JsonParser data={cell.popoverContent}/>
                </Popover.Content>
            </Popover>
        </span>
    );
};

export const CellComponent = ({cell, scope, inlineExpanded, onToggleInline}: CellComponentProps) => {
    if (!cell) return <Table.DataCell/>;
    const content = <CellContent cell={cell} inlineExpanded={inlineExpanded} onToggleInline={onToggleInline}/>;
    if (cell.header) {
        return <Table.HeaderCell scope={scope} textSize="small">{content}</Table.HeaderCell>;
    }
    return <Table.DataCell textSize="small">{content}</Table.DataCell>;
};
