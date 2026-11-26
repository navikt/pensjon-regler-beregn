import {CellElement, PopoverType} from "@pensjon/domain";

export const hasPopoverContent = (cell?: CellElement): boolean =>
    !!cell && cell.popoverType !== PopoverType.NONE && Array.isArray(cell.popoverContent) && cell.popoverContent.length > 0;

export const isInlineFormel = (cell?: CellElement) => hasPopoverContent(cell) && cell?.popoverType === PopoverType.FORMEL;
