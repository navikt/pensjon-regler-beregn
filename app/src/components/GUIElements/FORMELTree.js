import React, {useState} from "react";
import {Button, Heading} from "@navikt/ds-react";
import './CSS/FormelTree.css'

export function FORMELTree(props) {
    let [tree] = useState(props.formeltree);


    function generateTreeNode(node,i) {

        function getFormelDetail(n) {
            return (
                <div >
                    <table >
                        <tr>
                            <th rowSpan={2} style={{backgroundColor:"lightsalmon"}}>{n['name']}</th>
                            <td style={{backgroundColor:"lightgrey"}}>{n['notasjon']}</td>
                        </tr>
                        <tr>
                            <td style={{backgroundColor:"lightgrey"}}>{n['innhold']}</td>
                        </tr>
                    </table>
                </div>

            )
        }

        if (i == 1) { //rootNode
            //left treeview panel
            return (
                <>
                    {getFormelDetail(node)}
                    {generateTreeNode(node,i+1)}
                </>
            )
        } else if (node.hasOwnProperty('children') && node['children'].length > 1) {
            //left treeview panel
            let treenode = []
            node['children'][1].map((subNode) => {
                treenode.push(
                    <li >
                        {getFormelDetail(subNode)}
                        {generateTreeNode(subNode,  i+1)}
                    </li>
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
        <div className='formeltree-container'>
            <div className="formeltree-nodes-container">
                <Heading spacing size="small"
                         level="5" style={{}}> &ensp; Formel format:
                    <table className={'formeltree-subNodeBtn'}>
                    <tr>
                        <th rowSpan={2} style={{backgroundColor:"lightsalmon"}}>foreldre navn   &ensp; </th>
                        <td style={{backgroundColor:"lightgrey"}}>notasjon</td>
                    </tr>
                    <tr>
                        <td style={{backgroundColor:"lightgrey"}}>innhold</td>
                    </tr>
                </table> </Heading>


                {generateTreeNode(tree,  1)}
            </div>
        </div>
    )
}