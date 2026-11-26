import {Button, CopyButton, Detail, Heading, HStack, Loader, Tag, ToggleGroup, Tooltip, VStack} from "@navikt/ds-react";
import {ArrowsCirclepathIcon} from "@navikt/aksel-icons";
import {LogResponse, LogResponseMetadata} from "@pensjon/domain";
import {environmentLabel, shortClassName} from "../../util/environments.ts";

export type ViewMode = "split" | "request" | "response";
export type BeregnStatus = "running" | "ok" | "failed" | "error";

interface ContextBarProps {
    logId: string;
    log?: LogResponse;
    metadata: Partial<LogResponseMetadata>;
    environment: string;
    status: BeregnStatus;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    onRerun: () => void;
}

// Vis bare datodelen i ISO-format (YYYY-MM-DD), som i tabellene fra pensjon-regler.
const formatVirk = (virk?: string) => virk?.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? virk;

const StatusTag = ({status}: { status: BeregnStatus }) => {
    switch (status) {
        case "running":
            return <Tag size="small" variant="moderate" data-color="info"><Loader size="xsmall" title="Beregner"/>&nbsp;Beregner …</Tag>;
        case "failed":
            return <Tag size="small" variant="moderate" data-color="danger">Beregning feilet</Tag>;
        case "error":
            return <Tag size="small" variant="moderate" data-color="danger">Ingen kontakt</Tag>;
        default:
            return <Tag size="small" variant="moderate" data-color="success">Beregnet</Tag>;
    }
};

const MetaItem = ({label, value, copy}: { label: string; value?: string; copy?: boolean }) => (
    <div className="context-meta-item">
        <dt>{label}</dt>
        <dd>
            <span className={copy ? "mono" : undefined}>{value || "–"}</span>
            {copy && value && <CopyButton size="xsmall" copyText={value} title={`Kopier ${label}`}/>}
        </dd>
    </div>
);

const ContextBar: React.FC<ContextBarProps> = ({
    logId, log, metadata, environment, status, viewMode, onViewModeChange, onRerun
}) => {
    const className = shortClassName(metadata.className);
    const originalEnv = log?.environment;
    const envChanged = !!originalEnv && originalEnv !== environment;

    return (
        <section className="context-bar" aria-label="Om beregningen">
            <HStack justify="space-between" align="start" gap="space-16" wrap={false}>
                <VStack gap="space-8" className="context-main">
                    <HStack gap="space-8" align="center" wrap>
                        <StatusTag status={status}/>
                        <Tag size="small" variant="outline" data-color="neutral">{environmentLabel(environment)}</Tag>
                        {envChanged && (
                            <Detail textColor="subtle">Logget i {environmentLabel(originalEnv)}</Detail>
                        )}
                        <Detail textColor="subtle">Logg-ID <span className="mono">{logId}</span></Detail>
                    </HStack>
                    <Heading size="medium" level="2" className="context-title" title={metadata.className}>
                        {className || "Ukjent beregning"}
                    </Heading>
                </VStack>
                <HStack gap="space-8" align="center" wrap={false}>
                    <Tooltip content="Kjør beregningen på nytt">
                        <Button size="small" variant="tertiary" data-color="neutral" onClick={onRerun}
                                disabled={status === "running"} icon={<ArrowsCirclepathIcon aria-hidden/>}>
                            Kjør på nytt
                        </Button>
                    </Tooltip>
                    <ToggleGroup size="small" value={viewMode} onChange={(value) => onViewModeChange(value as ViewMode)}
                                 aria-label="Visning">
                        <ToggleGroup.Item value="split" label="Delt"/>
                        <ToggleGroup.Item value="request" label="Grunnlag"/>
                        <ToggleGroup.Item value="response" label="Resultat"/>
                    </ToggleGroup>
                </HStack>
            </HStack>
            <dl className="context-meta">
                <MetaItem label="Tjeneste" value={metadata.endpoint?.replace(/^\/api\//, "")}/>
                <MetaItem label="Sak ID" value={metadata.saksId} copy/>
                <MetaItem label="PEN person ID" value={metadata.penPersonId} copy/>
                <MetaItem label="Virk" value={formatVirk(metadata.virk)}/>
            </dl>
        </section>
    );
};

export default ContextBar;
