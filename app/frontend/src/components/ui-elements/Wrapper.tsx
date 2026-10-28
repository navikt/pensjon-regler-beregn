import { useParams } from "react-router-dom";
import Main from "./Main.tsx";

const Wrapper: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const logId = id || ""

    return (
        <>
            {!!logId &&
                <Main id={logId} />
            }
        </>
    )
}

export default Wrapper