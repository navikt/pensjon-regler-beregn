import React, {useEffect, useState} from "react";
import {JsonParser} from './JsonParser';
import {Button, Heading} from "@navikt/ds-react";
import './CSS/Tree.css'


export function Tree(props){



    let[tree] = useState(props.tree);
    {console.log("Inside tree", tree)}

    function generateTreeNode (node, t) {
        if(node.hasOwnProperty('rootNode')) {
            node['rootNode']['data']['data'][1].map((tablists,key) =>{
                //left treeview panel
                return ( <div className="tree-nodes-container">
                    <div class="treeview js-treeview">
                        <ul>
                            <li>
                                <div className="treeview__level" data-level="A">
                                    <span className="level-title">
                                         <Button>
                                                rootNode
                                        </Button>
                                    </span>
                                </div>
                                <generateTreeNode data = {node['rootNode']}></generateTreeNode>
                            </li>
                        </ul>
                     </div>
                    </div> )

                }
            )
        }
        else if(node.hasOwnProperty('nodes')) {
            node['nodes'][1][0]['data']['data'][1].map((tablists,key) =>{
                //left treeview panel
                return (
                  <ul>
                      <li>
                          <div className="treeview__level" data-level="A">
                                    <span className="level-title">
                                         <Button>
                                                node
                                        </Button>
                                    </span>
                          </div>
                          <generateTreeNode data = {node['nodes'][1][0]}></generateTreeNode>
                      </li>
                  </ul>

                )})

        }
        // if(Array.isArray(node['nodes']))
        //     t.push(generateTreeNode(node['nodes'][1][0]))  /**cursive to loop nodes */
        // return t
    }

    function generateTreeContent(node, t) {
        if(node.hasOwnProperty('rootNode')) {

            //  right panel = tablist, show tablists to left node
            t.push(<div className='tree-content-container'><JsonParser data = {node['rootNode']['data']}></JsonParser></div>);
        }
        else if(node.hasOwnProperty('nodes')) {

            //  right panel = tablist, show tablists to left node
            t.push(<div className='tree-content-container'><JsonParser data = {node['nodes'][1][0]['data']}></JsonParser></div>);

        }
        if(Array.isArray(node['nodes']))
            t.push(generateTreeContent(node['nodes'][1][0]))  /**cursive to loop nodes */
        return t
    }

    return(
        <div>
            <Heading spacing size="xsmall" level="6"> &ensp; {tree.hasOwnProperty('title')?tree['title']:''}</Heading>
            <div className='sidetab-container'>

                { generateTreeNode(tree, []) }

                { generateTreeContent(tree, []) }
                </div>
        </div>
    )
}