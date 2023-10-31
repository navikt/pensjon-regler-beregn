import React, {useContext, useEffect, useState} from "react";
import {Select} from "@navikt/ds-react/esm/form";
import {fetchSatser} from "../api/SatsFetcherClient";
import {Context} from "../context/Context";

export const defaultSats = "Sats fra miljø"
export default function SatserDropDown(props) {
    const [tabeller, setTabeller] = useState([[], []])
    const { setSatsTabell } = useContext(Context);


    useEffect(() => {
        let errorText = "Leser satsTabeller list feilet, sjekk nais status: ";
        const dropDownData = async () => {
            console.log("dropDownData");
            const response = await fetchSatser();
            if (response.ok) {
                const satser = await response.json();
                setTabeller(satser);
            } else {
                console.log("error =>", errorText + response.errorMessage);
            }
        }
        dropDownData().catch((error) => {
            console.log(errorText + error);
        });
    }, []);


    const changeSats = (e) => {
        const nySats = e.target.value;
        setSatsTabell(nySats);
        console.log("satsTabell => ", satsTabell);
    };


    return (
        <Select
            id="satsTabellerSelect"
            size="small"
            label="Kjør med annen sats"
            onChange={changeSats}
            hideLabel
        >
            <option value={defaultSats}>{defaultSats}</option>
            {tabeller[1].map((data, key) => {
                return (
                    <option
                        value={data}
                        key={key}>
                        {data}
                    </option>
                )
            })}
        </Select>
    )
}