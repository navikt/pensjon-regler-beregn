import React, { useState } from "react";
import './CSS/ARCNODETree.css'

export function ARCNODETree(props) {
    let [tree] = useState(props.arcnodetree);
    const [isActive, setActive] = useState(false); //use for expand all levels at one time.
    function checkStyle(node) {
        if (node['used'])
            return { 'backgroundColor': 'transparent' };
        else
            return { 'color': 'red', 'backgroundColor': 'transparent' };
    }

    function generateArcnodeTreeNode(node, i) {
        if (i == 1) {
            return (
                <ul className="arcnodeTree-container">
                    <li>
                        <span className={isActive ? "caret" : "caret caret-down"} style={checkStyle(node)}
                            onClick={(e) => toggleClass()}>
                            {node.hasOwnProperty('name') ? node['name'] : 'no name'}
                        </span>
                        {generateArcnodeTreeNode(node, i + 1)}
                    </li>
                </ul>)
        } else if (node.hasOwnProperty('children') && node['children'].length > 1) {
            let treenode = []
            node['children'][1].map((subNode) => {
                if (subNode['children'][1].length == 0) {
                    treenode.push(
                        // <ul className={isActive ? "nested activex" : "nested"}>
                        <li>
                            {subNode.hasOwnProperty('name') ? subNode['name'] : 'no name'}
                        </li>
                        // </ul>
                    )
                }
                else if (i < 3) {
                    treenode.push(
                        <li>
                            <span className={isActive ? "caret" : "caret caret-down"} style={checkStyle(subNode)}
                                onClick={(event) => toggleClass()}>
                                {subNode.hasOwnProperty('name') ? subNode['name'] : 'no name'}
                            </span>
                            {generateArcnodeTreeNode(subNode, i + 1)}
                        </li>
                    )
                }

                else {
                    treenode.push(
                        // <ul className={isActive ? "nested activex" : "nested"}>
                        <li>
                            <span className={isActive ? "caret caret-down" : "caret"} style={checkStyle(subNode)}
                                onClick={(event) => toggleClass()}>
                                {subNode.hasOwnProperty('name') ? subNode['name'] : 'no name'}
                            </span>
                            {generateArcnodeTreeNode(subNode, i + 1)}
                        </li>
                        // </ul>
                    )
                }
            })

            if (i < 4) {
                return (
                    <ul className={isActive ? "nested" : "nested activex"}>
                        {treenode}
                    </ul>
                )
            }
            else {
                return (
                    <ul className={isActive ? "nested activex" : "nested"}>
                        {treenode}
                    </ul>
                )
            }

        }

    }

    const toggleClass = () => {
        var toggler = document.getElementsByClassName("caret");
        var i;

        for (i = 0; i < toggler.length; i++) {
            toggler[i].addEventListener("click", function () {
                this.parentElement.querySelector(".nested").classList.toggle("activex");
                this.classList.toggle("caret-down");
            });
        }


    };

    return (
        <>

            {generateArcnodeTreeNode(tree, 1)}
        </>
    )
}