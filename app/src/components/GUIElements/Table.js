import React, {useEffect, useState} from "react";
import {JsonParser} from "./JsonParser";

export function Table(props){
    let [table] = useState(props.table)

    function log(){
        console.log("Inside table")
    }

    return (
        <div>

            {log()}
            I'm a table: {table['name']}



            //repeat several tables
            tables.map((data,key) =>(
                //call just one table.

            ))

            //just one table.
            <h2>{table['name']}</h2>
            <Table size="medium" >
                <Table.Header>
                    <Table.Row>
                        {table['cells'].map((item,index)=> (
                            item[index][0]['header']? (
                                <Table.HeaderCell scope="col">{item[index][0]['data']}</Table.HeaderCell>
                            ):('')


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

                    {table['cells'].map((item, index) => (
                        <Table.Row /*key={fnr}*/ >
                            {console.log("Table body row : " + item[index])}
                            item[index].map((data,key) => (
                                data[key]['header']? (
                                    <Table.HeaderCell scope="col">{data[key]['data']}</Table.HeaderCell>
                            ):(<Table.DataCell>{data[key]['data']}</Table.DataCell>)
                                data[key]['popover']? (
                                    <JsonParser data = { data[key]}></JsonParser>
                            ):('')
                            ))
                        </Table.Row>
                        ))
                    }

                </Table.Body>
            </Table>
        </div>


    )
}