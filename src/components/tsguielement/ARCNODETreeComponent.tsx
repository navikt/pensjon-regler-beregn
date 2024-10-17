import React, { useState } from "react";
import './CSS/ARCNODETree.css';
import { ArcNodeElement } from "../../api/domain/types/guimodel.ts";

export interface ARCNODETreeProps {
    arcnodetree: ArcNodeElement;
}

export function ARCNODETreeComponent(props: ARCNODETreeProps): React.ReactElement {
    const [tree] = useState<ArcNodeElement>(props.arcnodetree);

    function checkStyle(node: ArcNodeElement): React.CSSProperties {
        return node.used ? { color: 'green', backgroundColor: 'transparent' } : { color: 'red', backgroundColor: 'transparent' };
    }

    function generateArcnodeTreeNode(node: ArcNodeElement): React.ReactNode {
        if (node.children) {
            return (
                <ul>
                    {node.children.map((subNode, index) => (
                        <li style={checkStyle(subNode)} key={index}>
                            {subNode.name || 'no name'}
                            {generateArcnodeTreeNode(subNode)}
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    }

    return (
        <ul className="arcnodeTree-container">
            <li>
                <span style={checkStyle(tree)}>
                    {tree.name || 'no name'}
                </span>
                {generateArcnodeTreeNode(tree)}
            </li>
        </ul>
    );
}