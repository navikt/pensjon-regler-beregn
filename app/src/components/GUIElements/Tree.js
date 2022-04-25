import React, {useEffect, useState} from "react";
import {JsonParser} from './JsonParser';
import {Button, Heading} from "@navikt/ds-react";
import './CSS/Tree.css'


export function Tree(props){



    let[tree] = useState(props.tree);
    {console.log("Inside tree", tree)}

    function generateTreeNode (node, t) {
        {console.log("generate node:", node)}
        if(node.hasOwnProperty('rootNode')) {

            // node['rootNode']['data']['data'][1].map((tablists,key) =>{
                //left treeview panel
                return ( <div className="tree-nodes-container">
                    <div >
                        <ul>
                            <li>
                                <div  >
                                    <span  >
                                         <Button  size="xsmall">
                                                rootNode
                                        </Button>
                                    </span>
                                </div>
                                {generateTreeNode(node['rootNode'], t)}
                            </li>
                        </ul>
                     </div>
                    </div>
                )
                // })
        }
        else if(node.hasOwnProperty('nodes') && node['nodes'].length>1) {

                //left treeview panel
                let treenode = []
                node['nodes'][1].map((tablists,key) =>{
                    treenode.push(
                        <li>
                            <div  >
                                    <span >
                                         <Button size="xsmall">
                                                node
                                        </Button>
                                    </span>
                            </div>
                            {generateTreeNode(node['nodes'], t)}
                        </li>
                    )
            })

                return (
                  <ul>

                      {treenode}
                  </ul>
                )

        }
        // if(Array.isArray(node['nodes']))
        //     t.push(generateTreeNode(node['nodes'][1][0]))  /**cursive to loop nodes */
        // return t
    }

    function generateTreeContent(node, t) {
        if(node.hasOwnProperty('rootNode')) {
            //  right panel = tablist, show tablists to left node
            t.push( <JsonParser data = {node['rootNode']['data']}></JsonParser> );
            generateTreeContent(node['rootNode'], t)
        }
        else if(node.hasOwnProperty('nodes')) {
            //  right panel = tablist, show tablists to left node
            t.push(<JsonParser data = {node['nodes'][1][0]['data']}></JsonParser>);
            generateTreeContent(node['nodes'], t)

        }
        // if(Array.isArray(node['nodes']))
        //     t.push(generateTreeContent(node['nodes'][1][0]))  /**cursive to loop nodes */
        return t
    }

    return(
        <div>
            <Heading spacing size="xsmall" level="6"> &ensp; {tree.hasOwnProperty('title')?tree['title']:''}</Heading>
            <div className='sidetab-container'>

                { generateTreeNode(tree, []) }
                <div className='tree-content-container'>
                { generateTreeContent(tree, []) }
                </div>
                </div>
        </div>
    )
}