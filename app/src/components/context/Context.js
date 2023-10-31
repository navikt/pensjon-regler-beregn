import {createContext, useState} from "react";
import {defaultSats} from "../header/SatserDropDown";

export const Context = createContext();
export const ContextProvider = ({ children }) => {
    const [satsTabell, setSatsTabell] = useState(defaultSats)
    const [environment, setEnvironment] = useState("");

    const [logId, setLogId] = useState(0);
    const [logResponse, setLogResponse] = useState({});
    const [metaData, setMetaData] = useState({});
    const [body, setBody] = useState("");
    const [clazzName, setClazzName] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    return (
        <Context.Provider value={{
            satsTabell, setSatsTabell,
            environment, setEnvironment,
            logId, setLogId,
            logResponse, setLogResponse,
            metaData, setMetaData,
            body, setBody,
            clazzName, setClazzName,
            isLoading, setIsLoading,
        }}>
            {children}
        </Context.Provider>
    );
};