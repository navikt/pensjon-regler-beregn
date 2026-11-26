import React from "react";
import {Detail, HStack} from "@navikt/ds-react";
import {CheckmarkCircleFillIcon, CircleSlashIcon} from "@navikt/aksel-icons";
import {ArcNodeElement} from "@pensjon/domain";

export interface ArcNodeTreeProps {
    arcnodetree: ArcNodeElement;
}

const ArcNode = ({node}: { node: ArcNodeElement }) => (
    <li>
        <span className="arc-node" data-used={node.used}>
            {node.used
                ? <CheckmarkCircleFillIcon className="arc-icon" title="Brukt"/>
                : <CircleSlashIcon className="arc-icon" title="Ikke brukt"/>}
            {node.name || "Uten navn"}
        </span>
        {node.children?.length > 0 && (
            <ul>{node.children.map((child, index) => <ArcNode key={index} node={child as ArcNodeElement}/>)}</ul>
        )}
    </li>
);

export function ArcNodeTreeComponent({arcnodetree}: ArcNodeTreeProps): React.ReactElement {
    return (
        <div className="arc-tree">
            <HStack gap="space-16" className="arc-legend">
                <Detail className="arc-node" data-used="true"><CheckmarkCircleFillIcon className="arc-icon" aria-hidden/> Brukt</Detail>
                <Detail className="arc-node" data-used="false"><CircleSlashIcon className="arc-icon" aria-hidden/> Ikke brukt</Detail>
            </HStack>
            <ul className="arc-root"><ArcNode node={arcnodetree}/></ul>
        </div>
    );
}
