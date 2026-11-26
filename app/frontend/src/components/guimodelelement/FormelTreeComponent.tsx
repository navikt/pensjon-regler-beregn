import React from "react";
import {FormelNodeElement} from "@pensjon/domain";

export interface FORMELTreeProps {
    formeltree: FormelNodeElement;
}

const Formel = ({node}: { node: FormelNodeElement }) => (
    <div className="formel">
        <div className="formel-card">
            <div className="formel-name">{node.name}</div>
            {node.notasjon && <code className="formel-notasjon">{node.notasjon}</code>}
            {(node.innhold || node.result) && (
                <div className="formel-calc">
                    {node.innhold && <span>{node.innhold}</span>}
                    {node.result && <><span className="formel-eq" aria-hidden> = </span><strong>{node.result}</strong></>}
                </div>
            )}
        </div>
        {node.children?.length > 0 && (
            <ul className="formel-children">
                {node.children.map((child, index) => <li key={index}><Formel node={child as FormelNodeElement}/></li>)}
            </ul>
        )}
    </div>
);

export function FormelTreeComponent({formeltree}: FORMELTreeProps): React.ReactElement {
    return <div className="formel-tree"><Formel node={formeltree}/></div>;
}
