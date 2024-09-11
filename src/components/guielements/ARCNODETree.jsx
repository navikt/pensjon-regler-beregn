import React, {useState} from "react";
import './CSS/ARCNODETree.css'

export function ARCNODETree(props) {
    let [tree] = useState(props.arcnodetree);

    function checkStyle(node) {
        if (Object.hasOwn(node, 'used') && node['used'] === true)
            return {'color': 'green', 'backgroundColor': 'transparent'};
        else
            return {'color': 'red', 'backgroundColor': 'transparent'};
    }

    function generateArcnodeTreeNode(node) {
        if (Object.hasOwn(node,'children')) {
            let treenode = []
            node['children'].map((subNode) => {
                    treenode.push(
                        // <ul className={isActive ? "nested activex" : "nested"}>
                        <li style={checkStyle(subNode)}>
                            {Object.hasOwn(subNode, 'name') ? subNode['name'] : 'no name'}
                            {generateArcnodeTreeNode(subNode)}
                        </li>
                        // </ul>
                    )

            })
            return (
                <ul>
                    {treenode}
                </ul>
            )
        }

    }

    return (
        <>
            <ul className="arcnodeTree-container">
                <li>
                        <span style={checkStyle(tree)}>
                            {Object.hasOwn(tree,'name') ? tree['name'] : 'no name'}
                        </span>
                    {generateArcnodeTreeNode(tree)}
                </li>
            </ul>
        </>
    )
}