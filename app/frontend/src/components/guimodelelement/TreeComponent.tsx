import React, {useState} from "react";
import {BodyShort, Button, Detail, Heading, HStack} from "@navikt/ds-react";
import {ChevronDownIcon, ChevronRightIcon, ExpandIcon, ShrinkIcon} from "@navikt/aksel-icons";
import {BeregningNodeElement, DataElement, ElementType, FormelNodeElement, NodeElement} from "@pensjon/domain";
import {JsonParser} from "./JsonParser.tsx";
import {FormelTreeComponent} from "./FormelTreeComponent.tsx";

export interface TreeProps {
    tree: NodeElement | BeregningNodeElement;
}

type TreeNode = NodeElement | BeregningNodeElement;

const ROOT = "0";

const childrenOf = (node: TreeNode) => (node.children ?? []) as TreeNode[];

const collectPaths = (node: TreeNode, path: string, acc: string[] = []) => {
    if (childrenOf(node).length) acc.push(path);
    childrenOf(node).forEach((child, index) => collectPaths(child, `${path}.${index}`, acc));
    return acc;
};

const resolvePath = (root: TreeNode, path: string): TreeNode[] => {
    const trail = [root];
    path.split(".").slice(1).forEach((index) => {
        const next = childrenOf(trail[trail.length - 1])[Number(index)];
        if (next) trail.push(next);
    });
    return trail;
};

interface NodeRowProps {
    node: TreeNode;
    path: string;
    depth: number;
    selected: string;
    expanded: Set<string>;
    onSelect: (path: string) => void;
    onToggle: (path: string) => void;
}

const NodeRow = ({node, path, depth, selected, expanded, onSelect, onToggle}: NodeRowProps) => {
    const kids = childrenOf(node);
    const isOpen = expanded.has(path);
    return (
        <li role="treeitem" aria-expanded={kids.length ? isOpen : undefined} aria-selected={selected === path}>
            <div className="tree-row" data-selected={selected === path || undefined} data-used={node.used}
                 style={{paddingLeft: `calc(${depth} * var(--ax-space-16) + var(--ax-space-4))`}}>
                {kids.length > 0
                    ? (
                        <button type="button" className="tree-toggle" onClick={() => onToggle(path)}
                                aria-label={isOpen ? `Lukk ${node.name}` : `Åpne ${node.name}`}>
                            {isOpen ? <ChevronDownIcon aria-hidden/> : <ChevronRightIcon aria-hidden/>}
                        </button>
                    )
                    : <span className="tree-toggle-spacer"/>}
                <button type="button" className="tree-label" onClick={() => onSelect(path)} title={node.name}>
                    {node.name || "Uten navn"}
                </button>
                {!node.used && <span className="tree-unused">ikke brukt</span>}
            </div>
            {kids.length > 0 && isOpen && (
                <ul role="group">
                    {kids.map((child, index) => (
                        <NodeRow key={index} node={child} path={`${path}.${index}`} depth={depth + 1}
                                 selected={selected} expanded={expanded} onSelect={onSelect} onToggle={onToggle}/>
                    ))}
                </ul>
            )}
        </li>
    );
};

const NodeDetails = ({node}: { node: TreeNode }) => {
    if (node.type === ElementType.FORMELNODE) return <FormelTreeComponent formeltree={node as FormelNodeElement}/>;
    // data kan være ett element (typisk en TABLIST) eller en liste
    const data = (node as BeregningNodeElement).data as DataElement | DataElement[] | undefined;
    const hasData = Array.isArray(data) ? data.length > 0 : !!data;
    if (hasData) return <JsonParser data={data}/>;
    return <BodyShort textColor="subtle" size="small">Ingen detaljer for denne noden.</BodyShort>;
};

export const TreeComponent = ({tree}: TreeProps): React.ReactElement => {
    const [selected, setSelected] = useState(ROOT);
    const [expanded, setExpanded] = useState<Set<string>>(() => new Set(collectPaths(tree, ROOT)));

    const toggle = (path: string) => setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(path)) next.delete(path);
        else next.add(path);
        return next;
    });

    const allPaths = collectPaths(tree, ROOT);
    const allOpen = allPaths.every((path) => expanded.has(path));
    const trail = resolvePath(tree, selected);
    const current = trail[trail.length - 1];

    return (
        <div className="calc-tree">
            <nav className="calc-tree-nav" aria-label={`Beregningstre ${tree.name ?? ""}`}>
                <HStack justify="space-between" align="center" className="calc-tree-nav-header">
                    <Detail weight="semibold" uppercase>Beregningstre</Detail>
                    <Button size="xsmall" variant="tertiary" data-color="neutral"
                            icon={allOpen ? <ShrinkIcon aria-hidden/> : <ExpandIcon aria-hidden/>}
                            onClick={() => setExpanded(allOpen ? new Set([ROOT]) : new Set(allPaths))}>
                        {allOpen ? "Lukk alle" : "Åpne alle"}
                    </Button>
                </HStack>
                <ul role="tree" className="calc-tree-list">
                    <NodeRow node={tree} path={ROOT} depth={0} selected={selected} expanded={expanded}
                             onSelect={setSelected} onToggle={toggle}/>
                </ul>
            </nav>
            <div className="calc-tree-content">
                {trail.length > 1 && (
                    <Detail textColor="subtle" className="calc-tree-trail">
                        {trail.slice(0, -1).map((node) => node.name).join(" › ")}
                    </Detail>
                )}
                <HStack gap="space-8" align="center" className="calc-tree-title">
                    <Heading size="small" level="3">{current.name || "Uten navn"}</Heading>
                    {!current.used && <span className="tree-unused">ikke brukt</span>}
                </HStack>
                <NodeDetails key={selected} node={current}/>
            </div>
        </div>
    );
};
