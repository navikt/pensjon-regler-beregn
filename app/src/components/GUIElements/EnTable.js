import React, {useEffect, useState} from "react";
import {JsonParser} from "./JsonParser";
import {Table} from '@navikt/ds-react';
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
        //console.log("Item inside row" , item, index)
        var row = []
        if(item[index]==null)
            return
        else if(index ==1 ){
            item[index].map((subitem,j) => {
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


    return (
        <div>
            {log()}
            <p>{table.hasOwnProperty('name')?table['name']:''}</p>
            <Table size="medium" >
                <Table.Header>
                    <Table.Row>
                        {table['cells'].map((item,index)=> (
                            horizontalHeader(item, index)
                            // item[index][0]['header']? (
                            //     <Table.HeaderCell scope="col">{item[index][0]['data']}</Table.HeaderCell>
                            // ):(null)


                        ))}
                        {/*<Table.HeaderCell scope="col">Navn</Table.HeaderCell>*/}
                        {/*<Table.HeaderCell scope="col">Fødseslnr.</Table.HeaderCell>*/}
                        {/*<Table.HeaderCell scope="col">Start</Table.HeaderCell>*/}

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {/*{data*/}


                    {/*    .map(*/}
                    {/*        ({ name, fnr, start }) =>*/}
                    {/*            <Table.Row key={fnr} >*/}
                    {/*                <Table.HeaderCell scope="row">{name}</Table.HeaderCell>*/}
                    {/*                <Table.DataCell>{fnr.substring(0, 6)} {fnr.substring(6)}</Table.DataCell>*/}
                    {/*                <Table.DataCell>{format(new Date(start), "dd.MM.yyyy")}</Table.DataCell>*/}
                    {/*            </Table.Row>*/}
                    {/*    )}*/}

                    {table['cells'][1].map((item, index) => (
                        //console.log("table item" , item)
                        <Table.Row /*key={fnr}*/ >
                            {showRow(item,index)}
                            {/*{showPopOver(item, index)}*/}
                            {/*{item[index][1].map((subitem,j) => (*/}

                            {/*    subitem[j]['header']? (*/}
                            {/*        <Table.HeaderCell scope="col">{subitem[j]['data']}</Table.HeaderCell>*/}
                            {/*    ):(<Table.DataCell>{subitem[j]['data']}</Table.DataCell>),*/}

                            {/*    subitem[j]['popover']? (*/}
                            {/*        <JsonParser data = { subitem[j]}></JsonParser>*/}
                            {/*    ):('')*/}
                            {/*))}*/}
                        </Table.Row>
                        ))
                    }

                </Table.Body>
            </Table>
        </div>


    )
}