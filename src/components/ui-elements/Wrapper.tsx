import { useParams } from "react-router-dom";
import Main from "./Main.tsx";
import { useEffect, useState } from "react";

const Wrapper: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [logId, setLogId] = useState<string>(id || "")

    useEffect(() => {
        setLogId(id || "")
    }, [id])

    return (
        <>
            {!!logId &&
                <Main id={logId} />
            }
        </>
    )
}

export default Wrapper