import {ActionMenu, HStack, InternalHeader, Spacer, Tooltip} from "@navikt/ds-react";
import {BookIcon, ChevronDownIcon, MonitorIcon, MoonIcon, SunIcon, TerminalIcon} from "@navikt/aksel-icons";
import React, {useState} from "react";
import {useMatch} from "react-router-dom";
import {ThemePreference, useTheme} from "../../theme/useTheme.ts";
import {useGlobalState} from "../../store/index.ts";
import {useSatstabeller} from "../../api/service/Queries.ts";
import environments from "../constants/Environments.ts";
import {environmentLabel} from "../../util/environments.ts";
import RegelLoggModal from "./RegelLoggModal.tsx";

const ThemeMenu = () => {
    const {preference, resolved, setPreference} = useTheme();
    const Icon = preference === "system" ? MonitorIcon : resolved === "dark" ? MoonIcon : SunIcon;
    const {menuProps, select} = useClosingMenu((value: string) => setPreference(value as ThemePreference));

    return (
        <ActionMenu {...menuProps}>
            <ActionMenu.Trigger>
                <InternalHeader.Button aria-label="Velg fargetema">
                    <Icon fontSize="1.5rem" aria-hidden/>
                </InternalHeader.Button>
            </ActionMenu.Trigger>
            <ActionMenu.Content>
                <ActionMenu.RadioGroup label="Fargetema" value={preference} onValueChange={select}>
                    <ActionMenu.RadioItem value="system">
                        <HStack gap="space-8" align="center"><MonitorIcon aria-hidden/> Følg system</HStack>
                    </ActionMenu.RadioItem>
                    <ActionMenu.RadioItem value="light">
                        <HStack gap="space-8" align="center"><SunIcon aria-hidden/> Lyst</HStack>
                    </ActionMenu.RadioItem>
                    <ActionMenu.RadioItem value="dark">
                        <HStack gap="space-8" align="center"><MoonIcon aria-hidden/> Mørkt</HStack>
                    </ActionMenu.RadioItem>
                </ActionMenu.RadioGroup>
            </ActionMenu.Content>
        </ActionMenu>
    );
};

// Sprer props (inkl. ref, onClick og aria-*) videre, slik at ActionMenu.Trigger kan styre knappen.
const MenuTrigger = ({label, value, ...rest}: { label: string; value: string } & React.ComponentPropsWithRef<"button">) => (
    <InternalHeader.Button {...rest} className="header-select">
        <span className="header-select-label">{label}</span>
        <span className="header-select-value">{value}</span>
        <ChevronDownIcon aria-hidden fontSize="1.25rem"/>
    </InternalHeader.Button>
);

// ActionMenu.RadioItem lukker ikke menyen ved valg, så den må lukkes eksplisitt.
const useClosingMenu = <T, >(onSelect: (value: T) => void) => {
    const [open, setOpen] = useState(false);
    const select = (value: T) => {
        onSelect(value);
        setOpen(false);
    };
    return {menuProps: {open, onOpenChange: setOpen}, select};
};

const EnvironmentMenu = () => {
    const {getEnvironment, setEnvironment} = useGlobalState();
    const {menuProps, select} = useClosingMenu(setEnvironment);
    return (
        <ActionMenu {...menuProps}>
            <ActionMenu.Trigger>
                <MenuTrigger label="Miljø" value={environmentLabel(getEnvironment())}/>
            </ActionMenu.Trigger>
            <ActionMenu.Content>
                <ActionMenu.RadioGroup label="Kjør beregningen i" value={getEnvironment()} onValueChange={select}>
                    {environments.map((env) => (
                        <ActionMenu.RadioItem key={env} value={env}>
                            <HStack gap="space-12" justify="space-between" wrap={false} width="100%">
                                <span>{environmentLabel(env)}</span>
                                <span className="menu-hint">{env}</span>
                            </HStack>
                        </ActionMenu.RadioItem>
                    ))}
                </ActionMenu.RadioGroup>
            </ActionMenu.Content>
        </ActionMenu>
    );
};

const SatsMenu = () => {
    const {getEnvironment, getSats, setSats} = useGlobalState();
    const {data, isLoading, isError} = useSatstabeller(getEnvironment());
    const {menuProps, select} = useClosingMenu(setSats);

    return (
        <ActionMenu {...menuProps}>
            <ActionMenu.Trigger>
                <MenuTrigger label="Sats" value={getSats() || "Fra miljø"}/>
            </ActionMenu.Trigger>
            <ActionMenu.Content>
                <ActionMenu.RadioGroup label="Satstabell" value={getSats()} onValueChange={select}>
                    <ActionMenu.RadioItem value="">Sats fra miljø</ActionMenu.RadioItem>
                    {data?.map((sats) => <ActionMenu.RadioItem key={sats} value={sats}>{sats}</ActionMenu.RadioItem>)}
                </ActionMenu.RadioGroup>
                {isLoading && <ActionMenu.Item disabled>Henter satser …</ActionMenu.Item>}
                {isError && <ActionMenu.Item disabled>Klarte ikke å hente satser fra {environmentLabel(getEnvironment())}</ActionMenu.Item>}
            </ActionMenu.Content>
        </ActionMenu>
    );
};

const AppHeader: React.FC = () => {
    const onBeregning = !!useMatch("/:id");
    const {getDebugLog} = useGlobalState();
    const [loggOpen, setLoggOpen] = useState(false);
    const debugLog = getDebugLog();
    const prod = import.meta.env.VITE_PENSJON_ACCESS === "prod";

    return (
        <>
        <InternalHeader className="app-header">
            <InternalHeader.Title as="h1">Beregn pensjon{prod ? " (PROD)" : ""}</InternalHeader.Title>
            <Spacer/>
            {onBeregning && (
                <>
                    <EnvironmentMenu/>
                    <SatsMenu/>
                    <Tooltip content={debugLog ? "Vis regel-loggen fra pensjon-regler" : "Ingen regel-logg for denne beregningen"}>
                        <InternalHeader.Button onClick={() => setLoggOpen(true)} disabled={!debugLog}
                                               className="header-action" aria-disabled={!debugLog}>
                            <TerminalIcon fontSize="1.25rem" aria-hidden/>
                            Regel-logg
                        </InternalHeader.Button>
                    </Tooltip>
                </>
            )}
            <Tooltip content="Bruksanvisning (ny fane)">
                <InternalHeader.Button as="a" href="/doc/index.html" target="_blank" rel="noreferrer" aria-label="Bruksanvisning">
                    <BookIcon fontSize="1.5rem" aria-hidden/>
                </InternalHeader.Button>
            </Tooltip>
            <ThemeMenu/>
        </InternalHeader>
        {/* Utenfor InternalHeader, som alltid har mørkt tema */}
        <RegelLoggModal open={loggOpen} onClose={() => setLoggOpen(false)} log={debugLog}/>
        </>
    );
};

export default AppHeader;
