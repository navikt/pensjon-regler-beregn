import {querySatstabeller} from "../../api/service/Queries";
import {Button, Dropdown} from "@navikt/ds-react";
import {useGlobalState} from "../../store";

const SatserDropdown: React.FC = () => {

    const state = useGlobalState()
    const {data, isError, isLoading, isSuccess} = querySatstabeller()

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