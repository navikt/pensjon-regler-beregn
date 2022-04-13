import React, {useEffect, useState} from "react";
import {JsonParser} from "./JsonParser";
import {Table} from '@navikt/ds-react';
import {Heading} from '@navikt/ds-react';
import data from "bootstrap/js/src/dom/data";

export function EnTable(props){
    let [table] = useState(props.table)

    function log(){
        console.log("Inside table", table)
    }

    function horizontalHeader(item, index) {
        if(item[index]==null)
            return
        else if(item[index].hasOwnProperty('header'))
            return <Table.HeaderCell scope="col">{item[index][0]['data']}</Table.HeaderCell>
    }

    function showRow(item, index) {
        //console.log("one row data" , item, index)
        var row = []
        if(Array.isArray(item[1])){
            //console.log("item[index]" , item[index])
            item[1].map((subitem,j) => {
                console.log("Item inside cell" , subitem, j)
                // if (subitem[j] != null) {
                    if (subitem['header']) {
                        row.push(<Table.HeaderCell scope="col">{subitem['data']}</Table.HeaderCell>)
                    } else {
                        row.push(<Table.DataCell>{subitem['data']}</Table.DataCell>)
                    }
                    if (subitem['popover']) {
                        //row.push(<JsonParser data = { subitem[j]}></JsonParser>)
                    }
                // }
            })
        }
        //console.log(row)
        return row
    }
    //
    // function showPopOver(item, index) {
    //     if(item[index]==null)
    //         return
    //     else {
    //         item[index][1].map((subitem,j) => {
    //             if (subitem[j] == null)
    //                 return
    //             else if (subitem[j]['popover']) {
    //                 return <JsonParser data = { subitem[j]}></JsonParser>
    //             }
    //         })
    //     }
    // }

    const Checkname = ({ name }) => {
        console.log({ name })
        if(name!=null && name.includes('ingen')) {
            return (null);
        }
        else
            return <div className="w-full flex flex-col gap-4">
                <Table size="small" >
                    <Table.Header>
                        <Table.Row>
                            {table['cells'].map((item,index)=> (
                                horizontalHeader(item, index)
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {table['cells'][1].map((item, index) => (
                            <Table.Row /*key={fnr}*/ >
                                {showRow(item,index)}
                                {/*{showPopOver(item, index)}*/}
                            </Table.Row>
                        ))
                        }
                    </Table.Body>
                </Table>
            </div>
    }

    return (
        <div>
            {/*{log()}*/}
            <Heading size="xsmall" level="6"> &ensp;
            </Heading>
            <Heading spacing size="xsmall" level="6">{table.hasOwnProperty('name')?table['name']:''}</Heading>
            <Checkname name = {table['name']}>

            </Checkname>
        </div>
    )
}