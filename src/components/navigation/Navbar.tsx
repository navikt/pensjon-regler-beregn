import { InternalHeader, Spacer } from "@navikt/ds-react";
import { ReactNode } from "react";
import SatserDropdown from "./SatserDropdown";
import EnvironmentDropdown from "./EnvironmentDropdown";
import DebugLogModal from "../DebugLogModal";

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = (): ReactNode => {

    return (
        <InternalHeader style={{ position: `fixed`, width: `100%` }}>
            <InternalHeader.Title as="h1">Beregn pensjon</InternalHeader.Title>
            <Spacer />
            <EnvironmentDropdown />
            <SatserDropdown />
            <Spacer />
            <DebugLogModal />
            <InternalHeader.Button onClick={() => { window.open("/doc/index.html", '_blank') }}>Bruksanvisning</InternalHeader.Button>
        </InternalHeader>
    );
}

export default Navbar