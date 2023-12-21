import React from "react";
import { GuiModel } from "../api/domain/GuiModel";
import { LogResponse } from "../api/domain/LogResponse";

type GuiModelContextProviderProps = {
    children: React.ReactNode

}

type DomainModelContext = {
    guiModel: GuiModel,
    setGuiModel: React.Dispatch<React.SetStateAction<GuiModel | undefined>>
    logResponse?: LogResponse
    setLogResponse?: React.Dispatch<React.SetStateAction<LogResponse | undefined>>
    debugLog?: string
    setDebugLog?: React.Dispatch<React.SetStateAction<string | undefined>>
    consoleLog?: string
    setConsoleLog?: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const DomainModelContext = React.createContext<DomainModelContext | null>(null);

export default function GuiModelContextProvider({ children }: GuiModelContextProviderProps) {
    const [guiModel, setGuiModel] = React.useState<GuiModel>()
    const [logResponse, setLogResponse] = React.useState<LogResponse>()
    const [debugLog, setDebugLog] = React.useState<string>()
    const [consoleLog, setConsoleLog] = React.useState<string>()

    return (
        <DomainModelContext.Provider value={{
            guiModel: guiModel!,
            setGuiModel,
            consoleLog,
            setConsoleLog,
            setLogResponse,
            logResponse,
            debugLog,
            setDebugLog
        }}>
            {children}
        </DomainModelContext.Provider>
    )
}

export function useDomainModelContext() {
    const context = React.useContext(DomainModelContext)
    if (!context) {
        throw new Error('useDomainModel must be used within a GuiModelContextProvider')
    }
    return context
}