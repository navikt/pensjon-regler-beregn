import { Dropdown, Button } from "@navikt/ds-react"
import environments from "../constants/Environments.ts";
import {currentEnvironment} from "../../signal/Signals.ts";


const EnvironmentDropdown: React.FC = () => {

    const data = environments

    function handleChangedEnvironment(event: React.MouseEvent): void {
        currentEnvironment.value = event.currentTarget.textContent || ""
    }

    return (
        !!data &&
        <div className="vcenternavbar">
            <Dropdown onSelect={handleChangedEnvironment}>
                <Button variant="primary-neutral" as={Dropdown.Toggle}>{currentEnvironment.value ? `Valgt miljø: ${currentEnvironment.value}` : `Velg miljø`}</Button>
                <Dropdown.Menu>
                    <Dropdown.Menu.GroupedList>
                        <Dropdown.Menu.GroupedList.Heading>
                            Tilgjengelige miljøer
                        </Dropdown.Menu.GroupedList.Heading>
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

export default EnvironmentDropdown