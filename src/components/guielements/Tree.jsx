import React, {useState} from "react";
import {JsonParser} from './JsonParser';
import {Heading} from "@navikt/ds-react";
import './CSS/Tree.css'

export function Tree(props) {
    let [tree] = useState(props.tree);
    let index = props.index;

    function checkStyle(value) {
        if (value)
            return { 'backgroundColor': 'transparent' };
        else
            return { 'color': 'red', 'backgroundColor': 'transparent' };
    }

    function generateTreeNode(node, t, i, tabsName) {
        if (i == 1) { //rootNode
            //left treeview panel
            return (
                <div>
                    <button size="xsmall" id={'treeNode' + index + i} key={index + i}
                        onClick={(e) => click(e, ('treeNode' + index + i), (tabsName + 'treeTabs' + index + i), index)}
                        style={checkStyle(node['used'])} className={'tree-rootBtn'}>
                        {Object.hasOwn(node,'name') ? node['name'] : 'no name'}
                    </button>
                    {generateTreeNode(node, t, i + 1, tabsName)}
                </div>
            )
        } else if (Object.hasOwn(node,'children') && node['children'].length > 1) {
            //left treeview panel
            let treenode = []
            node['children'].map((subNode, key) => {
                treenode.push(
                    <li key={index + i + key}>
                        <div>
                            <button id={'treeNode' + index + i + key}
                                onClick={(e) => click(e, ('treeNode' + index + i + key), (tabsName + 'treeTabs' + index + i + key), index)}
                                style={checkStyle(subNode['used'])} className='tree-subNodeBtn'>
                                {Object.hasOwn(subNode,'name') ? subNode['name'] : 'no name'}
                            </button>
                        </div>
                        {generateTreeNode(subNode, t, parseInt("" + i + key + (i + 1).toString()), tabsName)}
                    </li>
                )
            })

            return (
                <ul className='tree'>
                    {treenode}
                </ul>
            )

        }
    }

    function generateTreeContent(node, t, i, tabsName) {
        if (i == 1) {
            //  right panel = tablist, show tablists to left node
            t.push(<div key={index + i} id={tabsName + 'treeTabs' + index + i} style={{ display: "block" }} className={'tree-tabs'}>
                <JsonParser
                    data={node['data']}></JsonParser></div>);
            generateTreeContent(node, t, i + 1, tabsName)
        } else if (Object.hasOwn(node,'children') && node['children'].length != 0) {
            //  right panel = tablist, show tablists to left node
            node['children'].map((subNode, key) => {
                t.push(<div key={index + i + key} id={tabsName + 'treeTabs' + index + i + key} className={'tree-tabs'}>
                    <JsonParser
                        data={subNode['data']}></JsonParser></div>);
                generateTreeContent(subNode, t, parseInt("" + i + key + (i + 1).toString()), tabsName)
            })
        }
        return t
    }

    function click(evt, nodeId, id, index) { //index indicates current root node by using five ramdom characters.
        var x = document.getElementById(id);
        var btn = document.getElementById(nodeId);
        var treeTabs = document.getElementsByClassName("tree-tabs");
        var i;
        var active = 0;

        //set all button unselected.
        var treeSubNodes = document.getElementsByClassName("tree-subNodeBtn");
        for (i = 0; i < treeSubNodes.length; i++) { //keep previous selected node and current selected node active if they are not belongs to same parent(same index)
            if (treeSubNodes[i].id.toString().includes(index)) {
                treeSubNodes[i].style.borderLeft = "5px solid #f1f1f1";
                treeSubNodes[i].style.fontWeight = "normal";
            }
        }
        var treeRootNodes = document.getElementsByClassName("tree-rootBtn");
        for (i = 0; i < treeRootNodes.length; i++) { //keep previous selected node and current selected node active if they are not belongs to same parent(same index)
            //if btn under this same root node == root node includes current index.
            if (treeRootNodes[i].id.toString().includes(index)) {
                treeRootNodes[i].style.borderLeft = "5px solid #f1f1f1";
                treeRootNodes[i].style.fontWeight = "normal";
            }
        }
        //set button selected
        btn.style.borderLeft = "5px solid blueviolet";
        btn.style.fontWeight = "bold";

        //active tab related to this button
        for (i = 0; i < treeTabs.length; i++) { //Note - keep previous tab and current tab active if they are not belongs to same parent(same index)
            if (treeTabs[i].id.toString().includes(index)) { //keep all the tree tabs under one parent(same index) deactive.
                treeTabs[i].style.display = "none";
            } else if (treeTabs[i].style.display == "block" && active < 2) { //keep the previous tree tab active when not belong to same index
                active++;
            } else treeTabs[i].style.display = "none"; //keep other rest tree tabs deactive.
        }
        x.style.display = "block";
    }

    return (
        <div className='tree-container'>
            <div className="tree-nodes-container">
                <Heading spacing size="xsmall"
                    level="6"> &ensp; Beregningstre</Heading>
                {generateTreeNode(tree, [], 1, Object.hasOwn(tree,'name') ? tree['name'] : 'noname', index)}
            </div>
            <div className='tree-content-container'>
                {generateTreeContent(tree, [], 1, Object.hasOwn(tree,'name') ? tree['name'] : 'noname', index)}
            </div>
        </div>
    )
}