import React, {useState} from "react";
import {JsonParser} from './JsonParser';
import {Button, Heading} from "@navikt/ds-react";
import './CSS/Tree.css'


export function Tree(props) {


    let [tree] = useState(props.tree);
    let index = props.index;
    // const [value, setValue] = useState(tree.hasOwnProperty('name') ? tree['name'] : 'noname' + index + 1)
    {
        console.log("Inside tree", tree)
    }

    function checkStyle(value) {
        if (value)
            return {'background-color': 'transparent'};
        else
            return { 'color':'red'};
    }

    function generateTreeNode(node, t, i, tabsName) {
        {
            console.log("generate node:", node)
        }
        if (i==1) { //rootNode

            //left treeview panel
            return (
                <div>
                    {/*<ul >*/}
                    {/*    <li>*/}

                            <Button size="xsmall" id={'treeNode' + index + i} onClick={(e) => click(e, (tabsName+ 'treeTabs' + index + i), index)}
                                    style={checkStyle(node['used'])} className={'tree-rootBtn'}>
                                {node.hasOwnProperty('name') ? node['name'] : 'no name' }
                            </Button>
                            {/*{console.log("rootnode", node['nodes'])}*/}
                            {generateTreeNode(node, t, i + 1)}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </div>
            )
            // })
        } else if (node.hasOwnProperty('nodes') && node['nodes'].length > 1) {

            //left treeview panel
            let treenode = []
            node['nodes'][1].map((subNode, key) => {
                treenode.push(
                    <li>
                        <div>
                        <button id={'treeNode' + index + i + key} onClick={(e) => click(e, (tabsName+'treeTabs' + index + i + key), index)}
                                style={checkStyle(subNode['used'])} className='tree-subNodeBtn'>
                            {subNode.hasOwnProperty('name') ? subNode['name'] : 'no name' }
                        </button></div>
                        {generateTreeNode(subNode, t, i + 1)}
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
        if (i==1) {
            //  right panel = tablist, show tablists to left node
            t.push(<div id={tabsName+'treeTabs' + index + i} style={{display: "block"}} className={'tree-tabs'}><JsonParser
                data={node['data']}></JsonParser></div>);
            generateTreeContent(node, t, i + 1)
        } else if (node.hasOwnProperty('nodes') && node['nodes'][1].length != 0) {
            //  right panel = tablist, show tablists to left node
            node['nodes'][1].map((subNode, key) => {
                t.push(<div id={tabsName+'treeTabs' + index + i + key} className={'tree-tabs'}><JsonParser
                    data={subNode['data']}></JsonParser></div>);
                generateTreeContent(subNode, t, i + 1)
            })
        }
        return t
    }

    function click(evt, id, index) {
        var x = document.getElementById(id);
        var treeTabs = document.getElementsByClassName("tree-tabs");
        var i;
        var active = 0;
        for (i = 0; i < treeTabs.length; i++) { //sometime has to keep two active tabs if they are not belongs to same parent(same index)
            if(treeTabs[i].id.toString().includes(index)) { //keep all the tree tabs under one parent(same index) deactive.
                treeTabs[i].style.display = "none";
            }
            else if(treeTabs[i].style.display == "block" && active <1) { //keep the previous tree tab active when not belong to same index
                active++;
            }
            else treeTabs[i].style.display = "none"; //keep other rest tree tabs deactive.
        }
        x.style.display = "block";
    }

    return (
        <div className='tree-container'>
            <div className="tree-nodes-container">
                <Heading spacing size="xsmall"
                         level="6"> &ensp; {tree.hasOwnProperty('name') ? tree['name'] : 'no name'}</Heading>
                {generateTreeNode(tree, [], 1, tree.hasOwnProperty('name') ? tree['name'] : 'noname', index)}
            </div>
            <div className='tree-content-container'>
                {generateTreeContent(tree, [], 1, tree.hasOwnProperty('name') ? tree['name'] : 'noname', index)}
            </div>
        </div>
    )
}