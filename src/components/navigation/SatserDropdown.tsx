import { querySatstabeller } from "../../api/service/Queries";
import { Button, Dropdown } from "@navikt/ds-react";
import { currentEnvironment, currentSats } from "../../signal/Signals";

const SatserDropdown: React.FC = () => {

    const { data, isError, isLoading, isSuccess } = querySatstabeller()

    if (isError) {
        throw new Error(`Klarte ikke å hente satser fra miljø ${currentEnvironment.value}`)
    }

    function handleChangedSats(element: React.MouseEvent): void {
        if (element.currentTarget.textContent === "Sats fra miljø") {
            currentSats.value = ""
            return
        }
        currentSats.value = element.currentTarget.textContent || ""
    }

    return (
        !!isSuccess &&
        <div className="vcenternavbar">
            <Dropdown onSelect={handleChangedSats}>
                <Button variant="primary-neutral" as={Dropdown.Toggle} loading={isLoading}> {currentSats.value ? `Valgt sats: ${currentSats.value}` : `Valgt sats: Sats fra miljø`} </Button>
                <Dropdown.Menu>
                    <Dropdown.Menu.GroupedList>
                        <Dropdown.Menu.GroupedList.Heading>
                            Tilgjengelige satser
                        </Dropdown.Menu.GroupedList.Heading>
                        <Dropdown.Menu.GroupedList.Item key={"satsframiljo"}>{"Sats fra miljø"}</Dropdown.Menu.GroupedList.Item>
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