import { ReactNode } from "react";
import { queryLogResponseById } from "../api/service/Queries";
import { currentEnvironment, currentSats } from "../signal/Signals";
import DetailView from "./DetailView";
import { Loader } from "@navikt/ds-react";
import ConsoleLog from "./ConsoleLog";

interface MainProps {
    id: string
}

const Main: React.FC<MainProps> = ({ id }): ReactNode => {



    const { data, isError, isLoading, isSuccess } = queryLogResponseById(id)

    if (isError) {
        throw new Error(`Klarte ikke å hente logg fra miljø ${currentEnvironment.value}`)
    }

    if (isLoading) {
        return <Loader size="3xlarge" title="Laster ..." className="loader" />
    }

    if (isSuccess) {
        const metaData = JSON.parse(data?.metadata || "{}")
        document.title = metaData?.saksId && !metaData?.saksId.includes("Det finnes ingen tilgjengelige") ? `SaksID ${metaData?.saksId} - Beregn pensjon` : `Beregn pensjon`
    }

    return (
        isSuccess &&
        <>
            <DetailView logResponse={data} environment={currentEnvironment.value} sats={currentSats.value} />
            <ConsoleLog />
        </>
    )
}

export default Main