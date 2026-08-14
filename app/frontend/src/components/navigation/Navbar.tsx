import { InternalHeader, Spacer } from "@navikt/ds-react";
import { ReactNode, useEffect, useRef } from "react";
import SatserDropdown from "./SatserDropdown.tsx";
import EnvironmentDropdown from "./EnvironmentDropdown.tsx";
import DebugLogModal from "../ui-elements/DebugLogModal.tsx";

const Navbar: React.FC = (): ReactNode => {

    const title = import.meta.env.VITE_PENSJON_ACCESS === "prod" ? "Beregn pensjon (PROD)" : "Beregn pensjon (Q0/Q1/Q2/Q5)";
    const headerRef = useRef<HTMLElement>(null);

    // The header is position:fixed (taken out of document flow) and can wrap to
    // multiple lines on narrow screens, so its height isn't constant. Content below
    // it (see .detailcontainer) reads this to know how far down it needs to start.
    useEffect(() => {
        const element = headerRef.current;
        if (!element) return;

        const updateHeight = () => {
            document.documentElement.style.setProperty("--navbar-height", `${element.offsetHeight}px`);
        };

        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <InternalHeader ref={headerRef} style={{ position: `fixed`, width: `100%`, zIndex: 100 }}>
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