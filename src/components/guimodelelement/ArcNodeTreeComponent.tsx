import React, { useState } from "react";
import './css/ArcNodeTree.css';
import { ArcNodeElement } from "../../api/domain/types";

export interface ArcNodeTreeProps {
    arcnodetree: ArcNodeElement;
}

export function ArcNodeTreeComponent(props: ArcNodeTreeProps): React.ReactElement {
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