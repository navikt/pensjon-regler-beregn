import {querySatstabeller} from "../../api/service/Queries.ts";
import {Button, Dropdown} from "@navikt/ds-react";
import {useGlobalState} from "../../store/index.ts";
import environments from "../constants/Environments.ts";

const SatserDropdown: React.FC = () => {

    const initialEnv = import.meta.env.VITE_PENSJON_ACCESS === "prod" ? environments[1] : environments[1];

    const state = useGlobalState()
    const {data, isError, isLoading, isSuccess} = querySatstabeller(state.getEnvironment() || initialEnv)

    if (isError) {
        throw new Error(`Klarte ikke å hente satser fra miljø ${state.getEnvironment()}`)
    }

    function handleChangedSats(element: React.MouseEvent): void {
        if (element.currentTarget.textContent === "Sats fra miljø") {
            state.setSats("")
            return
        }
        const nySats = element.currentTarget.textContent || ""
        state.setSats(nySats)
    }

    return (
        !!isSuccess &&
        <div className="vcenternavbar">
            <Dropdown onSelect={handleChangedSats}>
                <Button variant="primary-neutral" as={Dropdown.Toggle}
                        loading={isLoading}> {state.getSats() ? `Valgt sats: ${state.getSats()}` : `Valgt sats: Sats fra miljø`} </Button>
                <Dropdown.Menu>
                    <Dropdown.Menu.GroupedList>
                        <Dropdown.Menu.GroupedList.Heading>
                            Tilgjengelige satser
                        </Dropdown.Menu.GroupedList.Heading>
                        <Dropdown.Menu.GroupedList.Item
                            key={"satsframiljo"}>{"Sats fra miljø"}</Dropdown.Menu.GroupedList.Item>
                        {data?.map((entry: string) =>
                            <Dropdown.Menu.GroupedList.Item key={entry}>
                                {entry}
                            </Dropdown.Menu.GroupedList.Item>
                        )}
                    </Dropdown.Menu.GroupedList>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default SatserDropdown