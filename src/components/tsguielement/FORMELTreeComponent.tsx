import React, { useState } from "react";
import './CSS/FormelTree.css';
import {FormelNode} from "../../api/domain/types/guimodel.ts";

export interface FORMELTreeProps {
    formeltree: FormelNode;
}

export function FORMELTreeComponent(props: FORMELTreeProps): React.ReactElement {
    const [tree] = useState<FormelNode>(props.formeltree);

    function getFormelDetail(node: FormelNode): React.ReactNode {
        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th rowSpan={2} style={{ backgroundColor: "lightsalmon" }}>{node.name}</th>
                        <td style={{ backgroundColor: "lightgrey" }}>{node.notasjon}</td>
                    </tr>
                    <tr>
                        <td style={{ backgroundColor: "lightgrey" }}>{node.innhold} = {node.result}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    function generateTreeNode(node: Node, i: number): React.ReactNode {
        if (i === 1) { // rootNode
            return (
                <>
                    {getFormelDetail(node)}
                    {generateTreeNode(node, i + 1)}
                </>
            );
        } else if (node.children && node.children.length > 0) {
            const treenode = node.children.map((subNode, index) => (
                <li key={index}>
                    {getFormelDetail(subNode)}
                    {generateTreeNode(subNode, i + 1)}
                </li>
            ));

            return <ul>{treenode}</ul>;
        }
        return null;
    }

    return (
        <div className='formeltree-container'>
            <div className="formeltree-nodes-container">
                {generateTreeNode(tree, 1)}
            </div>
        </div>
    );
}