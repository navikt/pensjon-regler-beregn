import {ReactNode} from "react";
import {queryLogResponseById} from "../api/service/Queries";
import DetailView from "./DetailView";
import {Loader} from "@navikt/ds-react";
import ConsoleLog from "./ConsoleLog";
import {useGlobalState} from "../store";


interface MainProps {
    id: string
}

const Main: React.FC<MainProps> = ({ id }): ReactNode => {

    const state = useGlobalState()
    const { data, isError, isLoading, isSuccess, isFetching } = queryLogResponseById(id)

    if (isError) {
        throw new Error(`Klarte ikke å hente logg fra miljø ${state.getEnvironment()}`)
    }

    if (isLoading) {
        return <Loader size="3xlarge" title="Laster ..." className="loader" />
    }

    if (isSuccess) {
        const metaData = JSON.parse(data?.metadata || "{}")
        state.setEnvironment(data?.environment)
        document.title = metaData?.saksId && !metaData?.saksId.includes("Det finnes ingen tilgjengelige") ? `SaksID ${metaData?.saksId} - Beregn pensjon` : `Beregn pensjon`
    }

    if (isFetching) {
        return <Loader size="3xlarge" title="Laster ..." className="loader" />
    }

    return (
        isSuccess &&
        <>
            <DetailView logResponse={data} />
            <ConsoleLog />
        </>
    )
}

export default Main