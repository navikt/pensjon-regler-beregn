import {hookstate, useHookstate} from "@hookstate/core";
import environments from "../components/constants/Environments.ts";

const initalState = hookstate({
    sats: "",
    environment: environments[3],
    file: "",
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
        getFile: () => state.file.value,
        setFile: (f: string) => { state.file.set(f) },
        getConsoleLog: () => state.consoleLog.value,
        setConsoleLog: (c:string) => { state.consoleLog.set(c) },
        getDebugLog: () => state.debugLog.value,
        setDebugLog: (d: string) => { state.debugLog.set(d) }
    }
}