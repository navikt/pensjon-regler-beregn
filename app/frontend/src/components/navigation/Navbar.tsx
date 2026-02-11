import { InternalHeader, Spacer } from "@navikt/ds-react";
import { ReactNode } from "react";
import SatserDropdown from "./SatserDropdown.tsx";
import EnvironmentDropdown from "./EnvironmentDropdown.tsx";
import DebugLogModal from "../ui-elements/DebugLogModal.tsx";

const Navbar: React.FC = (): ReactNode => {

    const title = import.meta.env.VITE_PENSJON_ACCESS === "prod" ? "Beregn pensjon (PROD)" : "Beregn pensjon (Q0/Q1/Q2/Q5)";

    return (
        <InternalHeader style={{ position: `fixed`, width: `100%` }}>
            <InternalHeader.Title as="h1">{title}</InternalHeader.Title>
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