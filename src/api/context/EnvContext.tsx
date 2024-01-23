import React, {useState} from "react";
import environments from "../../components/constants/Environments.ts";

export interface EnvContextType {
    env: string
    setEnv: (env: string) => void
}

export const EnvContext = React.createContext<EnvContextType | null>(null)


// @ts-ignore
const EnvContextProvider = ({ children }) => {
    const [env, setEnv] = useState<string>(environments[3])

    return (
        <EnvContext.Provider value={{ env, setEnv }}>
            {children}
        </EnvContext.Provider>
    )
}

export default EnvContextProvider
