import React, {useEffect, useRef, useState} from "react";
import {JsonParser} from "./JsonParser";
import {Popover, Table} from '@navikt/ds-react';
import {Heading, Button} from '@navikt/ds-react';
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

    function showRow(item) {
        //console.log("one row data" , item, index)
        var row = []
        if(Array.isArray(item[1])){
            //console.log("item[index]" , item[index])
            item[1].map((subitem,j) => {
                // let popOver;
                // let btnCell;
//console.log("Item inside cell" , subitem, j)
//                 if (subitem['popover']) {
//                     const buttonRef = useRef(null);
//                     const [open, setOpen] = useState(false);
//                     if (subitem['header']) {
//                         btnCell = <Table.HeaderCell scope="col"><Button ref={buttonRef} onClick={() => setOpen(true)} size="xsmall">
//                                 {subitem['data']}</Button></Table.HeaderCell>;
//                         row.push(btnCell)
//                         popOver = <Popover open={open} onClose={() => setOpen(false)} anchorEl={buttonRef.current}
//                                            arrow={false} placement="bottom">
//                             <Popover.Content><JsonParser data = { subitem['popoverContent']}></JsonParser></Popover.Content>
//                         </Popover>;
//                         row.push(popOver)
//                     } else {
//                         btnCell = <Table.DataCell><Button ref={buttonRef} onClick={() => setOpen(true)} size="xsmall" >
//                             {subitem['data']}</Button></Table.DataCell>;
//                         row.push(btnCell)
//                         popOver = <Popover open={open} onClose={() => setOpen(false)} anchorEl={buttonRef.current}
//                                            arrow={false} placement="bottom">
//                             <Popover.Content><JsonParser
//                                 data={subitem['popoverContent']}></JsonParser></Popover.Content>
//                         </Popover>;
//                         //row.push(<Table.DataCell>{subitem['data']}</Table.DataCell>)
//                         row.push(popOver)
//                     }
//                     //row.push(<JsonParser data = { subitem['popoverContent']}></JsonParser>)
//                 }  else {
                    if (subitem['header']) {
                        row.push(<Table.HeaderCell scope="col">{subitem['data']}</Table.HeaderCell>)
                    } else {
                        row.push(<Table.DataCell>{subitem['data']}</Table.DataCell>)
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
        //console.log(table)
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
                            //if(Array.isArray(item[1])&&item[1][0]['popover])
                            //<Table.Row /*key={fnr}*/ >
                            <CheckExpandableRow rowContent ={item}/*key={fnr}*/ >
                                {/*{showRow(item)}*/}
                                {/*{showPopOver(item, index)}*/}
                            </CheckExpandableRow>
                        ))
                        }
                    </Table.Body>
                </Table>
            </div>
    }

    const CheckExpandableRow =  ({ rowContent }) => {
        if(Array.isArray(rowContent[1])&&rowContent[1][0]['popover']) {
           return  <Table.ExpandableRow content={ <JsonParser data = { rowContent[1][0]['popoverContent']}></JsonParser>}>
                         {showRow(rowContent)}
                 </Table.ExpandableRow>
        }
        else {
            return <Table.Row>{showRow(rowContent)} </Table.Row>
        }
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