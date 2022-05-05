import React, {useState} from "react";
import {JsonParser} from './JsonParser';
import {Button, Heading} from "@navikt/ds-react";
import './CSS/Tree.css'


export function Tree(props) {


    let [tree] = useState(props.tree);
    {
        console.log("Inside tree", tree)
    }

    function checkStyle(value) {
        if (value)
            return {'background-color': 'transparent'};
        else
            return {'background-color': 'red'};
    }

    function generateTreeNode(node, t, i, tabsName) {
        {
            console.log("generate node:", node)
        }
        if (i==1) { //rootNode

            // node['rootNode']['data']['data'][1].map((tablists,key) =>{
            //left treeview panel
            return (
                //  <div className="tree-nodes-container">
                <div>
                    <ul className='rootNode'>
                        <li>

                            <Button size="xsmall" id={'treeNode' + i} onClick={(e) => click(e, (tabsName+ 'treeTabs' + i))}
                                    style={checkStyle(node['used'])} className={'tree-rootBtn'}>
                                {node.hasOwnProperty('name') ? node['name'] : 'no name' }
                            </Button>
                            {/*{console.log("rootnode", node['nodes'])}*/}
                            {generateTreeNode(node, t, i + 1)}
                        </li>
                    </ul>
                </div>
                // </div>
            )
            // })
        } else if (node.hasOwnProperty('nodes') && node['nodes'].length > 1) {

            //left treeview panel
            let treenode = []
            node['nodes'][1].map((subNode, key) => {
                treenode.push(
                    <li>

                        <Button size="xsmall" id={'treeNode' + i} onClick={(e) => click(e, (tabsName+'treeTabs' + i))}
                                style={checkStyle(subNode['used'])} className='tree-subNodeBtn'>
                            {subNode.hasOwnProperty('name') ? subNode['name'] : 'no name' }
                        </Button>
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
        // if(Array.isArray(node['nodes']))
        //     t.push(generateTreeNode(node['nodes'][1][0]))  /**cursive to loop nodes */
        // return t
    }

    function generateTreeContent(node, t, i, tabsName) {
        if (i==1) {
            //  right panel = tablist, show tablists to left node
            t.push(<div id={tabsName+'treeTabs' + i} style={{display: "block"}} className={'tree-tabs'}><JsonParser
                data={node['data']}></JsonParser></div>);
            generateTreeContent(node, t, i + 1)
        } else if (node.hasOwnProperty('nodes') && node['nodes'][1].length != 0) {
            //  right panel = tablist, show tablists to left node
            node['nodes'][1].map((subNode, key) => {
                t.push(<div id={tabsName+'treeTabs' + i} className={'tree-tabs'}><JsonParser
                    data={subNode['data']}></JsonParser></div>);
                generateTreeContent(subNode, t, i + 1)
            })

            // t.push(<div id={'treeTabs' + i} className={'tree-tabs'}><JsonParser
            //     data={node['nodes'][1][0]['data']}></JsonParser></div>);
            // generateTreeContent(node['nodes'], t, i + 1)

        }
        // if(Array.isArray(node['nodes']))
        //     t.push(generateTreeContent(node['nodes'][1][0]))  /**cursive to loop nodes */
        return t
    }

    function click(evt, id) {
        var x = document.getElementById(id);
        var treeTabs = document.getElementsByClassName("tree-tabs");
        var i;
        for (i = 0; i < treeTabs.length; i++) {
            treeTabs[i].style.display = "none";
        }
        x.style.display = "block";
    }

    return (

        <div className='tree-container'>
            <div className="tree-nodes-container">
                <Heading spacing size="xsmall"
                         level="6"> &ensp; {tree.hasOwnProperty('name') ? tree['name'] : 'no name'}</Heading>
                {generateTreeNode(tree, [], 1, tree.hasOwnProperty('name') ? tree['name'] : 'noname')}
            </div>
            <div className='tree-content-container'>
                {generateTreeContent(tree, [], 1, tree.hasOwnProperty('name') ? tree['name'] : 'noname')}
            </div>
        </div>

    )
}