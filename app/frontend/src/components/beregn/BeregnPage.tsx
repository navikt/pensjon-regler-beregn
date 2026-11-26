import {Alert, BodyShort, Button, Heading, Skeleton, VStack} from "@navikt/ds-react";
import {GuiModelMetadata, LogResponseMetadata} from "@pensjon/domain";
import {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import {useGuiModel, useLogResponseById} from "../../api/service/Queries.ts";
import {useGlobalState} from "../../store/index.ts";
import {environmentLabel, shortClassName} from "../../util/environments.ts";
import ContextBar, {ViewMode} from "./ContextBar.tsx";
import SplitView from "./SplitView.tsx";

const VIEW_KEY = "beregn-view";

const readViewMode = (): ViewMode => {
    const stored = localStorage.getItem(VIEW_KEY);
    return stored === "request" || stored === "response" ? stored : "split";
};

const parseJson = <T, >(value: string | undefined, fallback: T): T => {
    try {
        return value ? JSON.parse(value) as T : fallback;
    } catch {
        return fallback;
    }
};

const BeregnPage: React.FC = () => {
    const {id = ""} = useParams<{ id: string }>();
    const state = useGlobalState();
    const {setEnvironment, setDebugLog} = state;
    const environment = state.getEnvironment();
    const sats = state.getSats();
    const [viewMode, setViewModeState] = useState<ViewMode>(readViewMode);

    const setViewMode = (mode: ViewMode) => {
        localStorage.setItem(VIEW_KEY, mode);
        setViewModeState(mode);
    };

    const log = useLogResponseById(id);
    const metadata = useMemo(() => parseJson<Partial<LogResponseMetadata>>(log.data?.metadata, {}), [log.data]);
    const body = useMemo(() => parseJson<unknown>(log.data?.json, {}), [log.data]);

    useEffect(() => {
        if (log.data?.environment) setEnvironment(log.data.environment);
    }, [log.data, setEnvironment]);

    useEffect(() => {
        if (!log.data) return;
        const harSak = metadata.saksId && !metadata.saksId.includes("Det finnes ingen tilgjengelige");
        document.title = harSak ? `SaksID ${metadata.saksId} - Beregn pensjon` : "Beregn pensjon";
    }, [log.data, metadata]);

    const gui = useGuiModel(id, body, metadata.className, environment, sats);

    useEffect(() => {
        setDebugLog(gui.data?.metadata?.debugLog ?? "");
    }, [gui.data, setDebugLog]);

    useEffect(() => () => setDebugLog(""), [setDebugLog]);

    if (log.isError) {
        return (
            <VStack padding="space-32" gap="space-16" maxWidth="40rem" className="page-message">
                <Alert variant="error">
                    <Heading size="small" level="2" spacing>Fant ikke logginnslaget</Heading>
                    <BodyShort spacing>Klarte ikke å hente logg-ID <code>{id}</code>. Innslag slettes etter 90 dager.</BodyShort>
                    <Button size="small" variant="secondary" onClick={() => log.refetch()}>Prøv igjen</Button>
                </Alert>
            </VStack>
        );
    }

    if (log.data && !metadata.className) {
        return (
            <VStack padding="space-32" maxWidth="40rem" className="page-message">
                <Alert variant="warning">
                    <Heading size="small" level="2" spacing>Kan ikke beregne dette innslaget</Heading>
                    <BodyShort>Logg-ID <code>{id}</code> mangler <code>className</code> i metadata.</BodyShort>
                </Alert>
            </VStack>
        );
    }

    const guiMetadata: GuiModelMetadata | undefined = gui.data?.metadata;
    const harTekniskFeil = guiMetadata?.status === "error";
    const responseError = harTekniskFeil
        ? {
            title: `${shortClassName(metadata.className) || "Beregningen"} feilet i ${environmentLabel(environment)}`,
            details: guiMetadata?.info || "Ukjent teknisk feil",
        }
        : undefined;

    return (
        <div className="beregn-page">
            {log.isPending
                ? <div className="context-bar"><Skeleton variant="text" width="40%" height="3rem"/></div>
                : <ContextBar logId={id}
                              log={log.data}
                              metadata={metadata}
                              environment={environment}
                              status={gui.isError ? "error" : harTekniskFeil ? "failed" : gui.isFetching || gui.isPending ? "running" : "ok"}
                              viewMode={viewMode}
                              onViewModeChange={setViewMode}
                              onRerun={() => gui.refetch()}/>}
            {gui.isError && !gui.data
                ? (
                    <VStack padding="space-24" maxWidth="48rem">
                        <Alert variant="error">
                            <Heading size="small" level="2" spacing>Klarte ikke å beregne i {environmentLabel(environment)}</Heading>
                            <BodyShort spacing>Tjenesten svarte ikke. Prøv igjen, eller velg et annet miljø i menyen øverst.</BodyShort>
                            <Button size="small" variant="secondary" onClick={() => gui.refetch()}>Prøv igjen</Button>
                        </Alert>
                    </VStack>
                )
                : <SplitView request={gui.data?.request}
                             response={gui.data?.response}
                             responseError={responseError}
                             sats={guiMetadata?.bruktSats ?? sats}
                             loading={log.isPending || gui.isPending}
                             refreshing={gui.isFetching && !gui.isPending}
                             viewMode={viewMode}/>}
        </div>
    );
};

export default BeregnPage;
