import { InternalHeader, Spacer } from "@navikt/ds-react";
import { ReactNode } from "react";
import SatserDropdown from "./SatserDropdown";
import EnvironmentDropdown from "./EnvironmentDropdown";
import DebugLogModal from "../DebugLogModal";
import Openfile from "./Openfile";

interface NavbarProps { }

const Navbar: React.FC<NavbarProps> = (): ReactNode => {

    return (
        <InternalHeader style={{ position: `fixed`, width: `100%` }}>
            <InternalHeader.Title as="h1">Beregn pensjon</InternalHeader.Title>
            <Spacer />
            <EnvironmentDropdown />
            <SatserDropdown />
            <Spacer />
            <Openfile />
            <DebugLogModal />
            <InternalHeader.User name="Bruksanvisning" />
        </InternalHeader>
    );
}

export default Navbar