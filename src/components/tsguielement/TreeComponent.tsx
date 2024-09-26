import React, { useState } from "react";
import { JsonParser } from "./JsonParser.tsx";
import { Heading } from "@navikt/ds-react";
import './CSS/Tree.css';
import { Node } from "../../api/domain/types/guimodel.ts";

export interface TreeProps {
    tree: Node;
    index: string;
}

export function TreeComponent(props: TreeProps): React.ReactElement {
    const [tree] = useState(props.tree);
    const index = props.index;

    function checkStyle(used: boolean) {
        return used ? { 'backgroundColor': 'transparent' } : { 'color': 'red', 'backgroundColor': 'transparent' };
    }

    function generateTreeNode(node: Node, t: React.ReactNode[], i: number, tabsName: string): React.ReactNode {
        if (i === 1) { // rootNode
            return (
                <div>
                    <button id={'treeNode' + index + i} key={index + i}
                            onClick={(e) => click(e, ('treeNode' + index + i), (tabsName + 'treeTabs' + index + i), index)}
                            style={checkStyle(node.used)} className={'tree-rootBtn'}>
                        {node.name ? node.name : 'no name'}
                    </button>
                    {generateTreeNode(node, t, i + 1, tabsName)}
                </div>
            );
        } else if (node.children) {
            const treenode: React.ReactNode[] = [];
            node.children.map((subNode, key) => {
                treenode.push(
                    <li key={index + i + key}>
                        <div>
                            <button id={'treeNode' + index + i + key}
                                    onClick={(e) => click(e, ('treeNode' + index + i + key), (tabsName + 'treeTabs' + index + i + key), index)}
                                    style={checkStyle(subNode.used)} className='tree-subNodeBtn'>
                                {subNode.name ? subNode.name : "no name"}
                            </button>
                        </div>
                        {generateTreeNode(subNode, t, parseInt("" + i + key + (i + 1).toString()), tabsName)}
                    </li>
                );
            });

            return (
                <ul className='tree'>
                    {treenode}
                </ul>
            );
        }
    }

    function generateTreeContent(node: Node, t: React.ReactNode[], i: number, tabsName: string): React.ReactNode[] {
        if (i === 1) {
            t.push(<div key={index + i} id={tabsName + 'treeTabs' + index + i} style={{ display: "block" }} className={'tree-tabs'}>
                <JsonParser data={node.data}></JsonParser></div>);
            generateTreeContent(node, t, i + 1, tabsName);
        } else if (Object.prototype.hasOwnProperty.call(node, 'children') && node.children.length !== 0) {
            node.children.map((subNode, key) => {
                t.push(<div key={index + i + key} id={tabsName + 'treeTabs' + index + i + key} className={'tree-tabs'}>
                    <JsonParser data={subNode.data}></JsonParser></div>);
                generateTreeContent(subNode, t, parseInt("" + i + key + (i + 1).toString()), tabsName);
            });
        }
        return t;
    }

    function click(_evt: React.MouseEvent<HTMLButtonElement>, nodeId: string, id: string, index: string) {
        const x = document.getElementById(id);
        const btn = document.getElementById(nodeId);
        const treeTabs = document.getElementsByClassName("tree-tabs");
        let i = 0;
        let active = 0;

        const treeSubNodes = document.getElementsByClassName("tree-subNodeBtn");
        for (i = 0; i < treeSubNodes.length; i++) {
            if (treeSubNodes[i].id.toString().includes(index)) {
                (treeSubNodes[i] as HTMLElement).style.borderLeft = "5px solid #f1f1f1";
                (treeSubNodes[i] as HTMLElement).style.fontWeight = "normal";
            }
        }
        const treeRootNodes = document.getElementsByClassName("tree-rootBtn");
        for (i = 0; i < treeRootNodes.length; i++) {
            if (treeRootNodes[i].id.toString().includes(index)) {
                (treeRootNodes[i] as HTMLElement).style.borderLeft = "5px solid #f1f1f1";
                (treeRootNodes[i] as HTMLElement).style.fontWeight = "normal";
            }
        }

        (btn as HTMLElement).style.borderLeft = "5px solid blueviolet";
        (btn as HTMLElement).style.fontWeight = "bold";

        for (i = 0; i < treeTabs.length; i++) {
            if (treeTabs[i].id.toString().includes(index)) {
                (treeTabs[i] as HTMLElement).style.display = "none";
            } else if ((treeTabs[i] as HTMLElement).style.display === "block" && active < 2) {
                active++;
            } else {
                (treeTabs[i] as HTMLElement).style.display = "none";
            }
        }
        (x as HTMLElement).style.display = "block";
    }

    return (
        <div className='tree-container'>
            <div className="tree-nodes-container">
                <Heading spacing size="xsmall" level="6"> &ensp; Beregningstre</Heading>
                {generateTreeNode(tree, [], 1, tree.name ? tree.name : 'noname')}
            </div>
            <div className='tree-content-container'>
                {generateTreeContent(tree, [], 1, tree.name ? tree.name : 'noname')}
            </div>
        </div>
    );
}