import { Dropdown, Button } from "@navikt/ds-react"
import environments from "../constants/Environments.ts";
import {useGlobalState} from "../../store/index.ts";

const EnvironmentDropdown: React.FC = () => {
  const state = useGlobalState()
  const data = environments

  // Ensure we never render with empty env (store defaults to "q2" anyway)

  function handleChangedEnvironment(event: React.MouseEvent): void {
    const nyEnvironment = event.currentTarget.textContent || ""
    state.setEnvironment(nyEnvironment)
  }

  return (
    !!data &&
    <div className="vcenternavbar">
      <Dropdown onSelect={handleChangedEnvironment}>
        <Button variant="primary-neutral" as={Dropdown.Toggle}>
          {state.getEnvironment() ? `Valgt miljø: ${state.getEnvironment()}` : `Velg miljø`}
        </Button>
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