import React, {useEffect} from "react";
import {defaultSats} from "../Navigation/SatsDropdown";
import {CHOOSE_ENVIRONMENT, LOCAL_ENVIRONMENT} from "../../App2";

export default function GUIModelFetcher({ body, clazzName, environment, satsTabell, fileName, isGuiModelFetched }) {

    useEffect(async () => {
        const [href] = await handleParams(body, clazzName, environment, satsTabell);
        const response = await GUIModelFetcher(href, body);
        if (response.ok) {
            const guiModel = await response.json();

        } else {
            console.log("error =>", response.errorMessage);
        }

    }, [environment, satsTabell]);

    return (
        <div>
            {{ clazzName }}
        </div>
    );


    async function handleParams (body, clazzName, environment, satsTabell) {
        let endpoint = '';
        let href = '';
        if (body === 'undefined' || body == null) {
            throw new Error('Null content, running stopped');
            return;
        }
        if (clazzName === 'undefined' || clazzName == null) {
            throw new Error('Missing className from content, running stopped');
            return;
        }
        if (clazzName.toString().includes("Request")) {
            endpoint = "beregn";
        } else if (clazzName.toString().includes('Response')) {
            endpoint = "convertResponse";
        }
        if (!environment || environment === CHOOSE_ENVIRONMENT) {
            href = 'https://pensjon-regler-q2.dev.adeo.no/api/' + endpoint + '?className=' + className
        } else if (environment === LOCAL_ENVIRONMENT) {
            href = 'http://localhost:8080/api/' + endpoint + '?className=' + className;
        } else {
            href = 'https://' + environment + '.dev.adeo.no/api/' + endpoint + '?className=' + className
        }

        if (!satsTabell || satsTabell === defaultSats) {
            satsTabell = defaultSats
        } else {
            href = href + "&sats=" + satsTabell
        }
        return [href]
    }

}