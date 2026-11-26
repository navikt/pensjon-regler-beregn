import {Alert, BodyShort, Detail, Heading, HStack, Loader, ReadMore, Skeleton, VStack} from "@navikt/ds-react";
import {Group, Panel, Separator} from "react-resizable-panels";
import {DataElement} from "@pensjon/domain";
import {JsonParser} from "../guimodelelement/JsonParser.tsx";
import {ViewMode} from "./ContextBar.tsx";

export interface ResponseError {
    title: string;
    details: string;
}

interface SplitViewProps {
    request?: DataElement[];
    response?: DataElement[];
    responseError?: ResponseError;
    sats: string;
    loading: boolean;
    refreshing: boolean;
    viewMode: ViewMode;
}

interface PaneProps {
    title: string;
    subtitle?: string;
    loading: boolean;
    refreshing: boolean;
    children: React.ReactNode;
}

const PaneSkeleton = () => (
    <VStack gap="space-12">
        <Skeleton variant="rounded" height="2.5rem" width="60%"/>
        <Skeleton variant="rounded" height="12rem"/>
        <Skeleton variant="rounded" height="8rem"/>
    </VStack>
);

const Pane: React.FC<PaneProps> = ({title, subtitle, loading, refreshing, children}) => (
    <section className="pane" aria-label={title} aria-busy={loading || refreshing}>
        <HStack className="pane-header" justify="space-between" align="center" gap="space-8" wrap={false}>
            <HStack gap="space-8" align="baseline">
                <Heading size="xsmall" level="2">{title}</Heading>
                {subtitle && <Detail textColor="subtle">{subtitle}</Detail>}
            </HStack>
            {refreshing && <Loader size="small" title="Oppdaterer"/>}
        </HStack>
        <div className="pane-body" data-refreshing={refreshing || undefined}>
            {loading ? <PaneSkeleton/> : children}
        </div>
    </section>
);

const EmptyPane = ({text}: { text: string }) => (
    <BodyShort textColor="subtle" className="pane-empty">{text}</BodyShort>
);

const SplitView: React.FC<SplitViewProps> = ({request, response, responseError, sats, loading, refreshing, viewMode}) => {
    const requestPane = (
        <Pane title="Grunnlag" loading={loading} refreshing={refreshing}>
            {request?.length ? <JsonParser data={request}/> : <EmptyPane text="Ingen grunnlag å vise."/>}
        </Pane>
    );

    const responsePane = (
        <Pane title="Resultat" subtitle={sats ? `Sats ${sats}` : "Sats fra miljø"} loading={loading} refreshing={refreshing}>
            {responseError && (
                <Alert variant="error" size="small" className="response-error">
                    <BodyShort weight="semibold" spacing>{responseError.title}</BodyShort>
                    <ReadMore header="Vis teknisk feilmelding" size="small">
                        <pre className="response-error-details">{responseError.details}</pre>
                    </ReadMore>
                </Alert>
            )}
            {response?.length
                ? <JsonParser data={response}/>
                : !responseError && <EmptyPane text="Ingen resultat å vise."/>}
        </Pane>
    );

    if (viewMode === "request") return <div className="split-single">{requestPane}</div>;
    if (viewMode === "response") return <div className="split-single">{responsePane}</div>;

    return (
        <Group orientation="horizontal" className="split-group">
            <Panel defaultSize="50%" minSize="20%">{requestPane}</Panel>
            <Separator className="split-separator" aria-label="Endre bredde på panelene"/>
            <Panel defaultSize="50%" minSize="20%">{responsePane}</Panel>
        </Group>
    );
};

export default SplitView;
