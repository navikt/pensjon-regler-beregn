import {hookstate, useHookstate} from "@hookstate/core";
import environments from "../components/constants/Environments.ts";

const initalState = hookstate({
    sats: "",
    environment: environments[0],
    consoleLog: "",
    debugLog: "",
})

export const useGlobalState = () => {
    const state = useHookstate(initalState)

    return {
        getSats: () => state.sats.value,
        setSats: (s: string) => { state.sats.set(s) },
        getEnvironment: () => state.environment.value,
        setEnvironment: (e: string) => { state.environment.set(e) },
        getConsoleLog: () => state.consoleLog.value,
        setConsoleLog: (c:string) => { state.consoleLog.set(c) },
        getDebugLog: () => state.debugLog.value,
        setDebugLog: (d: string) => { state.debugLog.set(d) }
    }
}