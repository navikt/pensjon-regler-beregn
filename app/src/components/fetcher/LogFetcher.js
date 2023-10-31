import React, {useEffect, useState} from "react";
import {fetchByLogId} from "../api/LogFetcherClient";
import GUIModelFetcher from "./GUIModelFetcher";

export default function LogFetcher(props) {
    const [logID, setLogID] = useState(props.id);
    const logUrl = 'https://pensjon-regler-logviewer-api.dev-fss.nais.io/api/log/';
    const [logResponse, setLogResponse] = useState({});
    const [metaData, setMetadata] = useState({});
    const [body, setBody] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchLogId = async () => {
            if (logID !== "") {
                const response = await fetchByLogId(logUrl, logID);
                if (response.ok) {
                    const log = await response.json();
                    if (log?.metadata === undefined) {
                        throw new Error("Retry connecting");
                    }
                    setLogResponse({...logResponse, ...log});
                } else {
                    console.log("error =>", response.errorMessage);
                }
            }
        }
        fetchLogId().catch((error) => {
            console.log(error)
        });

    }, [props.id]);

    useEffect(() => {
        const newMetadata = logResponse?.metadata ? JSON.parse(logResponse?.metadata) : {};
        setMetadata(newMetadata);
        setBody(logResponse?.xml);
        setName(newMetadata?.className);
    }, [logResponse]);


    return (
        <div>
            {logResponse && "ok" }
        </div>
    )
}