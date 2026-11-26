import {BodyLong, Box, Button, Heading, HStack, Link, TextField, VStack} from "@navikt/ds-react";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {isMockMode} from "../../api/service/mockData.ts";

const Landing: React.FC = () => {
    const navigate = useNavigate();
    const [logId, setLogId] = useState("");

    const open = (event: React.FormEvent) => {
        event.preventDefault();
        if (logId.trim()) navigate(`/${encodeURIComponent(logId.trim())}`);
    };

    return (
        <VStack align="center" padding="space-48">
            <Box padding="space-32" borderRadius="12" borderWidth="1" borderColor="neutral-subtle" background="raised" maxWidth="36rem" width="100%">
                <VStack gap="space-16">
                    <Heading size="medium" level="2">Åpne en beregning</Heading>
                    <BodyLong>
                        Beregn pensjon åpnes vanligvis fra pensjon-regler-logviewer ved å trykke «Åpne i beregn» på et logginnslag.
                        Du kan også lime inn en logg-ID her.
                    </BodyLong>
                    <form onSubmit={open}>
                        <HStack gap="space-8" align="end" wrap={false}>
                            <TextField label="Logg-ID" value={logId} onChange={(e) => setLogId(e.target.value)}
                                       autoComplete="off" className="landing-input"/>
                            <Button type="submit" icon={<ArrowRightIcon aria-hidden/>} iconPosition="right">Åpne</Button>
                        </HStack>
                    </form>
                    {isMockMode && (
                        <BodyLong size="small" textColor="subtle">
                            Mock-modus, ekte GuiModel: <Link href="/trygdetid">trygdetid</Link> og <Link href="/revurdering">revurdering</Link> (med beregningstre). Syntetisk: <Link href="/1234">1234</Link> og <Link href="/feil">feil</Link>.
                        </BodyLong>
                    )}
                </VStack>
            </Box>
        </VStack>
    );
};

export default Landing;
