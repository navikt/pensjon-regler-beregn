import {hookstate, useHookstate} from "@hookstate/core";
import environments from "../components/constants/Environments.ts";

const initalState = hookstate({
    sats: "",
    environment: environments[1],
    consoleLog: "",
    debugLog: "",
})

// Setterne er definert utenfor hooken slik at de har stabil identitet og
// trygt kan brukes i dependency-arrayer i useEffect.
const setSats = (s: string) => { initalState.sats.set(s) }
const setEnvironment = (e: string) => { initalState.environment.set(e) }
const setConsoleLog = (c: string) => { initalState.consoleLog.set(c) }
const setDebugLog = (d: string) => { initalState.debugLog.set(d) }

export const useGlobalState = () => {
    const state = useHookstate(initalState)

    return {
        getSats: () => state.sats.value,
        setSats,
        getEnvironment: () => state.environment.value,
        setEnvironment,
        getConsoleLog: () => state.consoleLog.value,
        setConsoleLog,
        getDebugLog: () => state.debugLog.value,
        setDebugLog,
    }
}